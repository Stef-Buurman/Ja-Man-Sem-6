using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.Enums;
using NavigationPlatform.Server.Models.EntityConfig;

namespace NavigationPlatform.Server.Models
{
    [EntityTypeConfiguration(typeof(GraphNodeConfig))]
    public class GraphNode
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int Floor { get; set; }
        public NodeType Type { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public string? RoomId { get; set; }
        public string? Label { get; set; }
        public List<GraphEdge> IncomingEdges { get; set; } = new List<GraphEdge>();
        public List<GraphEdge> OutgoingEdges { get; set; } = new List<GraphEdge>();
    }
}
