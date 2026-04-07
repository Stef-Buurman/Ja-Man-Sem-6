using Microsoft.EntityFrameworkCore;
using HeatmapAPI.Models;

namespace HeatmapAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<HeatPoint> HeatPoints { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}