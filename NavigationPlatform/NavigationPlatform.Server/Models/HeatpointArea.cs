using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.Models.EntityConfig;

namespace NavigationPlatform.Server.Models
{
    [EntityTypeConfiguration(typeof(HeatpointAreaConfig))]
    public class HeatpointArea
    {
        public Guid Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int Value { get; set; }
        public int SoundLevel { get; set; }
        public Guid? FloorId { get; set; } = null!; 
        public Floor? Floor { get; set; } = null!;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Color => Value switch
        {
            <= 3 => "green",
            <= 10 => "yellow",
            _ => "red"
        };
    }
}