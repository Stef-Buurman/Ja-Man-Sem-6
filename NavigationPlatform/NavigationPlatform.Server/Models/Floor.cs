using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.Models.EntityConfig;

namespace NavigationPlatform.Server.Models
{
    [EntityTypeConfiguration(typeof(FloorConfig))]
    public class Floor
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string FileName { get; set; }
        public List<GraphNode> GraphNodes { get; set; } = new List<GraphNode>();
        public List<HeatpointArea> HeatpointAreas { get; set; } = new List<HeatpointArea>();
    }
}
