namespace NavigationPlatform.Server.Models
{
    public class Graph
    {
        public List<Floor> Floors { get; set; } = new List<Floor>();
        public List<GraphNode> Nodes { get; set; } = new List<GraphNode>();
        public List<GraphEdge> Edges { get; set; } = new List<GraphEdge>();
    }
}
