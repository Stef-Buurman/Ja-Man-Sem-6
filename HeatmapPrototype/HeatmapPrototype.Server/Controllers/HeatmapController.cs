using Microsoft.AspNetCore.Mvc;
using HeatmapAPI.Data;
using HeatmapAPI.Models;
using Microsoft.AspNetCore.SignalR;
using HeatmapAPI.Hubs;

namespace HeatmapAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeatmapController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<HeatmapHub> _hubContext;

        public HeatmapController(AppDbContext context, IHubContext<HeatmapHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // POST: api/heatmap
        [HttpPost]
        public async Task<IActionResult> AddPoint([FromBody] HeatPoint point)
        {
            _context.HeatPoints.Add(point);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceivePoint", "New point added");
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
                .Select(g =>
                {
                    int count = g.Count();

                    string level = count switch
                    {
                        <= 3 => "green",
                        <= 10 => "yellow",
                        _ => "red"
                    };

                    return new
                    {
                        x = (g.Key.X * gridSize) + gridSize / 2,
                        y = (g.Key.Y * gridSize) + gridSize / 2,
                        value = count,
                        level = level
                    };
                })
                .ToList();

            return Ok(data);
        }

        [HttpGet("areas")]
        public IActionResult GetHeatpointAreas()
        {
            var data = _context.HeatpointAreas.ToList();
            return Ok(data);
        }

        [HttpPost("areas")]
        public async Task<IActionResult> AddHeatpointArea([FromBody] HeatpointArea area)
        {
            _context.HeatpointAreas.Add(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint area updated");
            return Ok();
        }

        [HttpPut("areas/{id}")]
        public async Task<IActionResult> UpdateHeatpointArea(int id, [FromBody] HeatpointArea area)
        {
            Console.WriteLine($"Updating area {id} with value {area.Value}, sound level {area.SoundLevel}, level {area.Level}");
            if (id != area.Id || !_context.HeatpointAreas.Any(a => a.Id == id))
            {
                return BadRequest();
            }

            _context.HeatpointAreas.Update(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint area updated");
            return Ok();
        }

        [HttpPut("areas")]
        public async Task<IActionResult> UpdateRangeHeatpointArea([FromBody] List<HeatpointArea> area)
        {
            foreach (var a in area)
            {
                Console.WriteLine($"Updating area {a.Id} with value {a.Value}, sound level {a.SoundLevel}, level {a.Level}");
                if (!_context.HeatpointAreas.Any(existing => existing.Id == a.Id))
                {
                    return BadRequest($"Area with ID {a.Id} does not exist.");
                }
            }

            _context.HeatpointAreas.UpdateRange(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint areas updated");
            return Ok();
        }
    }
}