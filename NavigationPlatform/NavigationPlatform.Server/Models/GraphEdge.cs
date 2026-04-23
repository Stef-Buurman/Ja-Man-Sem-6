using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.Models.EntityConfig;

namespace NavigationPlatform.Server.Models
{
    [EntityTypeConfiguration(typeof(GraphEdgeConfig))]
    public class GraphEdge
    {
        public Guid Id { get; set; }
        public Guid FromNodeId { get; set; }
        public Guid ToNodeId { get; set; }
        public double? Weight { get; set; }
        public GraphNode FromNode { get; set; }
        public GraphNode ToNode { get; set; }
    }
}
