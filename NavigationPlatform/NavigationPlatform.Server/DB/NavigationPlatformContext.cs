using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.Models;

namespace NavigationPlatform.Server.DB
{
    public class NavigationPlatformContext : DbContext
    {
        public DbSet<GraphNode> GraphNodes { get; set; }
        public DbSet<GraphEdge> GraphEdges { get; set; }
        public DbSet<HeatpointArea> HeatpointAreas { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public NavigationPlatformContext(DbContextOptions<NavigationPlatformContext> options)
            : base(options)
        {
        }
    }
}