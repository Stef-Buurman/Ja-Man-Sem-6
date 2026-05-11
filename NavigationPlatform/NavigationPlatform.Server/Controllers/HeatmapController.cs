using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NavigationPlatform.Server.DB;
using NavigationPlatform.Server.Hubs;
using NavigationPlatform.Server.Models;

namespace HeatmapAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeatmapController : ControllerBase
    {
        private readonly NavigationPlatformContext _context;
        private readonly IHubContext<HeatmapHub> _hubContext;

        public HeatmapController(NavigationPlatformContext context, IHubContext<HeatmapHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<HeatpointArea>> GetHeatpointAreas()
        {
            var data = _context.HeatpointAreas.ToList();
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<HeatpointArea>> AddHeatpointArea([FromBody] HeatpointArea area)
        {
            _context.HeatpointAreas.Add(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint area updated");
            return Ok(area);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HeatpointArea>> UpdateHeatpointArea(int id, [FromBody] HeatpointArea area)
        {
            if (id != area.Id || !_context.HeatpointAreas.Any(a => a.Id == id))
            {
                return BadRequest();
            }

            _context.HeatpointAreas.Update(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint area updated");
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<HeatpointArea>>> UpdateRangeHeatpointArea([FromBody] List<HeatpointArea> area)
        {
            foreach (var a in area)
            {
                if (!_context.HeatpointAreas.Any(existing => existing.Id == a.Id))
                {
                    return BadRequest($"Area with ID {a.Id} does not exist.");
                }
            }

            _context.HeatpointAreas.UpdateRange(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint areas updated");
            return Ok(area);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeatpointArea(int id)
        {
            var area = await _context.HeatpointAreas.FindAsync(id);
            if (area == null)
            {
                return BadRequest($"Area with ID {id} does not exist.");
            }

            _context.HeatpointAreas.Remove(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveAreaUpdate", "Heatpoint area deleted");
            return Ok();
        }
    }
}