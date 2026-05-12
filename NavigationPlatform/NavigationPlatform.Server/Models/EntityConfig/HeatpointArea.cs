using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NavigationPlatform.Server.Models.EntityConfig
{
    internal class HeatpointAreaConfig : IEntityTypeConfiguration<HeatpointArea>
    {
        public void Configure(EntityTypeBuilder<HeatpointArea> builder)
        {
            builder.HasKey(b => b.Id);

            builder.HasOne(x => x.Floor)
                .WithMany(f => f.HeatpointAreas)
                .HasForeignKey(x => x.FloorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}