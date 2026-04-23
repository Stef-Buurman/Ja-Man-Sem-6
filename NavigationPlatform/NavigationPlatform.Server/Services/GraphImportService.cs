using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.DB;
using NavigationPlatform.Server.Models;

public class GraphImportService
{
    private readonly NavigationPlatformContext _context;

    public GraphImportService(NavigationPlatformContext context)
    {
        _context = context;
    }

    public async Task<GraphDto> GetGraphAsync(int floor)
    {
        var nodes = await _context.GraphNodes
            .Where(n => n.Floor == floor)
            .ToListAsync();

        var nodeIds = nodes.Select(n => n.Id).ToHashSet();

        var edges = await _context.GraphEdges
            .Where(e => nodeIds.Contains(e.FromNodeId) && nodeIds.Contains(e.ToNodeId))
            .ToListAsync();

        var graphDto = new GraphDto
        {
            Nodes = nodes.Select(n => new GraphNodeDto
            {
                Id = n.Name,  // DB Name -> JSON id
                X = n.X,
                Y = n.Y,
                Floor = n.Floor,
                Type = n.Type,
                Width = n.Width,
                Height = n.Height,
                RoomId = n.RoomId,
                Label = n.Label
            }).ToList(),
            Edges = edges.Select(e => new GraphEdgeDto
            {
                From = nodes.First(n => n.Id == e.FromNodeId).Name, // DB id -> JSON id
                To = nodes.First(n => n.Id == e.ToNodeId).Name,     // DB id -> JSON id
                Weight = e.Weight
            }).ToList()
        };

        return graphDto;
    }

    public async Task ImportGraphFromFileAsync(string filePath)
    {
        var json = await File.ReadAllTextAsync(filePath);
        await ImportGraphFromJsonAsync(json);
    }

    public async Task ImportGraphFromJsonAsync(string json)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        options.Converters.Add(new JsonStringEnumConverter());

        var graphDto = JsonSerializer.Deserialize<GraphDto>(json, options);

        if (graphDto is null)
            throw new InvalidOperationException("JSON could not be deserialized.");

        if (graphDto.Nodes.Count == 0)
            return;

        var duplicateNodeIds = graphDto.Nodes
            .GroupBy(n => n.Id)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

        if (duplicateNodeIds.Count > 0)
            throw new InvalidOperationException($"Duplicate node ids in JSON: {string.Join(", ", duplicateNodeIds)}");

        // Remove duplicate edges from the import itself, treating A-B same as B-A
        var importEdges = graphDto.Edges
            .GroupBy(e => GetUndirectedEdgeKey(e.From, e.To))
            .Select(g => g.First())
            .ToList();

        // Load existing nodes that match imported ids
        var importNodeNames = graphDto.Nodes
            .Select(n => n.Id)
            .Distinct()
            .ToList();

        var existingNodes = await _context.GraphNodes
            .Where(n => importNodeNames.Contains(n.Name))
            .ToListAsync();

        var nodeMap = existingNodes.ToDictionary(n => n.Name, n => n);

        // Upsert nodes
        foreach (var nodeDto in graphDto.Nodes)
        {
            if (nodeMap.TryGetValue(nodeDto.Id, out var existingNode))
            {
                existingNode.X = nodeDto.X;
                existingNode.Y = nodeDto.Y;
                existingNode.Floor = nodeDto.Floor;
                existingNode.Type = nodeDto.Type;
                existingNode.Width = nodeDto.Width;
                existingNode.Height = nodeDto.Height;
                existingNode.RoomId = nodeDto.RoomId;
                existingNode.Label = nodeDto.Label;
            }
            else
            {
                var newNode = new GraphNode
                {
                    Name = nodeDto.Id,   // JSON id -> DB Name
                    X = nodeDto.X,
                    Y = nodeDto.Y,
                    Floor = nodeDto.Floor,
                    Type = nodeDto.Type,
                    Width = nodeDto.Width,
                    Height = nodeDto.Height,
                    RoomId = nodeDto.RoomId,
                    Label = nodeDto.Label
                };

                _context.GraphNodes.Add(newNode);
                nodeMap[newNode.Name] = newNode;
            }
        }

        await _context.SaveChangesAsync();

        // Resolve imported edges to DB node ids
        var resolvedEdges = new List<(Guid FromNodeId, Guid ToNodeId, double? Weight)>();

        foreach (var edgeDto in importEdges)
        {
            if (!nodeMap.TryGetValue(edgeDto.From, out var fromNode))
                throw new InvalidOperationException($"Edge source node '{edgeDto.From}' not found.");

            if (!nodeMap.TryGetValue(edgeDto.To, out var toNode))
                throw new InvalidOperationException($"Edge target node '{edgeDto.To}' not found.");

            resolvedEdges.Add((fromNode.Id, toNode.Id, edgeDto.Weight));
        }

        // Load existing relevant edges
        var importedNodeIds = nodeMap.Values
            .Select(n => n.Id)
            .ToHashSet();

        var existingEdges = await _context.GraphEdges
            .Where(e => importedNodeIds.Contains(e.FromNodeId) && importedNodeIds.Contains(e.ToNodeId))
            .ToListAsync();

        var existingEdgeMap = existingEdges.ToDictionary(
            e => GetUndirectedEdgeKey(e.FromNodeId, e.ToNodeId),
            e => e);

        foreach (var edge in resolvedEdges)
        {
            var edgeKey = GetUndirectedEdgeKey(edge.FromNodeId, edge.ToNodeId);

            if (existingEdgeMap.TryGetValue(edgeKey, out var existingEdge))
            {
                existingEdge.Weight = edge.Weight;
            }
            else
            {
                var newEdge = new GraphEdge
                {
                    FromNodeId = edge.FromNodeId,
                    ToNodeId = edge.ToNodeId,
                    Weight = edge.Weight
                };

                _context.GraphEdges.Add(newEdge);
                existingEdgeMap[edgeKey] = newEdge;
            }
        }

        await _context.SaveChangesAsync();
    }

    public async Task UpdateGraphAsync(GraphDto graphDto)
    {
        if (graphDto is null)
            throw new InvalidOperationException("Graph payload is null.");

        var duplicateNodeIds = graphDto.Nodes
            .GroupBy(n => n.Id)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

        if (duplicateNodeIds.Count > 0)
            throw new InvalidOperationException($"Duplicate node ids in payload: {string.Join(", ", duplicateNodeIds)}");

        // Remove duplicate edges from payload, treating A-B same as B-A
        var importEdges = graphDto.Edges
            .GroupBy(e => GetUndirectedEdgeKey(e.From, e.To))
            .Select(g => g.First())
            .ToList();

        var importNodeIds = graphDto.Nodes
            .Select(n => n.Id)
            .ToHashSet();

        await using var transaction = await _context.Database.BeginTransactionAsync();

        // Load all existing nodes
        var existingNodes = await _context.GraphNodes.ToListAsync();
        var existingNodeMap = existingNodes.ToDictionary(n => n.Name, n => n);

        // 1. Update existing nodes and add new ones
        foreach (var nodeDto in graphDto.Nodes)
        {
            if (existingNodeMap.TryGetValue(nodeDto.Id, out var existingNode))
            {
                existingNode.X = nodeDto.X;
                existingNode.Y = nodeDto.Y;
                existingNode.Floor = nodeDto.Floor;
                existingNode.Type = nodeDto.Type;
                existingNode.Width = nodeDto.Width;
                existingNode.Height = nodeDto.Height;
                existingNode.RoomId = nodeDto.RoomId;
                existingNode.Label = nodeDto.Label;
            }
            else
            {
                var newNode = new GraphNode
                {
                    Name = nodeDto.Id,
                    X = nodeDto.X,
                    Y = nodeDto.Y,
                    Floor = nodeDto.Floor,
                    Type = nodeDto.Type,
                    Width = nodeDto.Width,
                    Height = nodeDto.Height,
                    RoomId = nodeDto.RoomId,
                    Label = nodeDto.Label
                };

                _context.GraphNodes.Add(newNode);
            }
        }

        await _context.SaveChangesAsync();

        // Reload nodes so new nodes have database ids
        var allNodes = await _context.GraphNodes.ToListAsync();
        var nodeMap = allNodes.ToDictionary(n => n.Name, n => n);

        // 2. Delete nodes that are no longer present in payload
        var nodesToDelete = allNodes
            .Where(n => !importNodeIds.Contains(n.Name))
            .ToList();

        if (nodesToDelete.Count > 0)
        {
            var nodeIdsToDelete = nodesToDelete
                .Select(n => n.Id)
                .ToHashSet();

            var edgesConnectedToDeletedNodes = await _context.GraphEdges
                .Where(e => nodeIdsToDelete.Contains(e.FromNodeId) || nodeIdsToDelete.Contains(e.ToNodeId))
                .ToListAsync();

            if (edgesConnectedToDeletedNodes.Count > 0)
                _context.GraphEdges.RemoveRange(edgesConnectedToDeletedNodes);

            _context.GraphNodes.RemoveRange(nodesToDelete);

            await _context.SaveChangesAsync();
        }

        // 3. Resolve payload edges to DB node ids
        var resolvedEdges = new List<(Guid FromNodeId, Guid ToNodeId, double? Weight, string Key)>();

        foreach (var edgeDto in importEdges)
        {
            if (!nodeMap.TryGetValue(edgeDto.From, out var fromNode))
                throw new InvalidOperationException($"Edge source node '{edgeDto.From}' not found.");

            if (!nodeMap.TryGetValue(edgeDto.To, out var toNode))
                throw new InvalidOperationException($"Edge target node '{edgeDto.To}' not found.");

            resolvedEdges.Add((
                fromNode.Id,
                toNode.Id,
                edgeDto.Weight,
                GetUndirectedEdgeKey(fromNode.Id, toNode.Id)
            ));
        }

        var importEdgeKeys = resolvedEdges
            .Select(e => e.Key)
            .ToHashSet();

        // 4. Load remaining existing edges
        var existingEdges = await _context.GraphEdges.ToListAsync();
        var existingEdgeMap = existingEdges.ToDictionary(
            e => GetUndirectedEdgeKey(e.FromNodeId, e.ToNodeId),
            e => e);

        // 5. Delete edges not present in payload
        var edgesToDelete = existingEdges
            .Where(e => !importEdgeKeys.Contains(GetUndirectedEdgeKey(e.FromNodeId, e.ToNodeId)))
            .ToList();

        if (edgesToDelete.Count > 0)
            _context.GraphEdges.RemoveRange(edgesToDelete);

        // 6. Update existing edges or add new ones
        foreach (var edge in resolvedEdges)
        {
            if (existingEdgeMap.TryGetValue(edge.Key, out var existingEdge))
            {
                existingEdge.Weight = edge.Weight;
            }
            else
            {
                _context.GraphEdges.Add(new GraphEdge
                {
                    FromNodeId = edge.FromNodeId,
                    ToNodeId = edge.ToNodeId,
                    Weight = edge.Weight
                });
            }
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();
    }

    private static string GetUndirectedEdgeKey(string a, string b)
    {
        return string.CompareOrdinal(a, b) < 0 ? $"{a}|{b}" : $"{b}|{a}";
    }

    private static string GetUndirectedEdgeKey(Guid a, Guid b)
    {
        var aText = a.ToString();
        var bText = b.ToString();
        return string.CompareOrdinal(aText, bText) < 0 ? $"{aText}|{bText}" : $"{bText}|{aText}";
    }
}