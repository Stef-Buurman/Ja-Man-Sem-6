using NavigationPlatform.Server.Enums;

public class GraphDto
{
    public List<GraphNodeDto> Nodes { get; set; } = new();
    public List<GraphEdgeDto> Edges { get; set; } = new();
}

public class GraphNodeDto
{
    public string Id { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public int Floor { get; set; }
    public NodeType Type { get; set; }
    public double? Width { get; set; }
    public double? Height { get; set; }
    public string? RoomId { get; set; }
    public string? Label { get; set; }
}

public class GraphEdgeDto
{
    public string From { get; set; } = null!;
    public string To { get; set; } = null!;
    public double? Weight { get; set; }
}