namespace HeatmapAPI.Models
{
    public class HeatPoint
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}