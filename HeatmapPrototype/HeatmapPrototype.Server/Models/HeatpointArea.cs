namespace HeatmapAPI.Models
{
    public class HeatpointArea
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int Value { get; set; }
        public int SoundLevel { get; set; }
        public int Level { get; set; }
        public string Color => Value switch
        {
            <= 3 => "green",
            <= 10 => "yellow",
            _ => "red"
        };
    }
}