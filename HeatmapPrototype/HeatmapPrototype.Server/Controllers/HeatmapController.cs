using Microsoft.AspNetCore.Mvc;
using HeatmapAPI.Data;
using HeatmapAPI.Models;

namespace HeatmapAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeatmapController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HeatmapController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/heatmap
        [HttpPost]
        public async Task<IActionResult> AddPoint([FromBody] HeatPoint point)
        {
            _context.HeatPoints.Add(point);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/heatmap
        [HttpGet]
        public IActionResult GetHeatmap()
        {
            int gridSize = 25;

            var data = _context.HeatPoints
                .AsEnumerable()
                .GroupBy(p => new
                {
                    X = Math.Floor(p.X / gridSize),
                    Y = Math.Floor(p.Y / gridSize)
                })
                .Select(g => new
                {
                    x = (g.Key.X * gridSize) + gridSize / 2,
                    y = (g.Key.Y * gridSize) + gridSize / 2,
                    value = g.Count()
                })
                .ToList();

            return Ok(data);
        }
    }
}