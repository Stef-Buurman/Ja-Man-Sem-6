using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NavigationPlatform.Server.Models.EntityConfig
{
    internal class GraphNodeConfig : IEntityTypeConfiguration<GraphNode>
    {
        public void Configure(EntityTypeBuilder<GraphNode> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.HasIndex(x => x.Name)
                .IsUnique();

            builder.HasMany(x => x.OutgoingEdges)
                .WithOne(x => x.FromNode)
                .HasForeignKey(x => x.FromNodeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.IncomingEdges)
                .WithOne(x => x.ToNode)
                .HasForeignKey(x => x.ToNodeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}