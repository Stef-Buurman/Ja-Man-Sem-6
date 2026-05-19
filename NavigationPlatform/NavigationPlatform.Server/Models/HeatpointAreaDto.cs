namespace NavigationPlatform.Server.Models
{
    public class HeatpointAreaDto
    {
        public Guid Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int Value { get; set; }
        public int SoundLevel { get; set; }
        public int Floor { get; set; }
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