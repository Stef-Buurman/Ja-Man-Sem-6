using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NavigationPlatform.Server.Models.EntityConfig
{
    internal class GraphEdgeConfig : IEntityTypeConfiguration<GraphEdge>
    {
        public void Configure(EntityTypeBuilder<GraphEdge> builder)
        {
            builder.HasKey(b => b.Id);

            builder.HasOne(b => b.FromNode)
                   .WithMany(c => c.OutgoingEdges)
                   .HasForeignKey(b => b.FromNodeId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(b => b.ToNode)
                   .WithMany(c => c.IncomingEdges)
                   .HasForeignKey(b => b.ToNodeId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}