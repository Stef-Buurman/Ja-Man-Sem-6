using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NavigationPlatform.Server.Models.EntityConfig
{
    internal class FloorConfig : IEntityTypeConfiguration<Floor>
    {
        public void Configure(EntityTypeBuilder<Floor> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasMany(f => f.GraphNodes).WithOne(n => n.Floor).HasForeignKey(n => n.FloorId);
            builder.HasMany(f => f.HeatpointAreas).WithOne(h => h.Floor).HasForeignKey(h => h.FloorId);
        }
    }
}