using Microsoft.AspNetCore.Mvc;
using NavigationPlatform.Server.Services;

namespace NavigationPlatform.Server.Controllers
{
    [ApiController]
    [Route("api/floor")]
    public class FloorController : ControllerBase
    {
        private readonly FloorService _floorService;

        public FloorController(FloorService floorService)
        {
            _floorService = floorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<FloorDto>>> GetFloors()
        {
            var floors = await _floorService.GetFloors();
            return Ok(floors);
        }
    }
}
