using Microsoft.AspNetCore.Mvc;
using NavigationPlatform.Server.Models;
using NavigationPlatform.Server.Services;

namespace HeatmapAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeatmapController : ControllerBase
    {
        private readonly HeatpointAreaService _heatpointAreaService;

        public HeatmapController(HeatpointAreaService heatpointAreaService)
        {
            _heatpointAreaService = heatpointAreaService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<HeatpointArea>> GetHeatpointAreas() => Ok(_heatpointAreaService.GetHeatpointAreas());

        [HttpGet("Json")]
        public ActionResult<IEnumerable<HeatpointAreaDto>> GetHeatpointAreasJson() => Ok(_heatpointAreaService.GetHeatpointAreasJson());

        [HttpPost]
        public async Task<ActionResult<HeatpointArea>> AddHeatpointArea([FromBody] HeatpointAreaDto area)
        {
            try
            {
                await _heatpointAreaService.AddHeatpointArea(area);
                return Ok(area);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HeatpointArea>> UpdateHeatpointArea(Guid id, [FromBody] HeatpointAreaDto area)
        {
            try
            {
                await _heatpointAreaService.UpdateHeatpointArea(id, area);
                return Ok(area);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<HeatpointArea>>> UpdateRangeHeatpointArea([FromBody] List<HeatpointAreaDto> area)
        {
            try
            {
                await _heatpointAreaService.UpdateRangeHeatpointArea(area);
                return Ok(area);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeatpointArea(Guid id)
        {
            try
            {
                await _heatpointAreaService.DeleteHeatpointArea(id);
                return Ok($"Heatpoint area with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}