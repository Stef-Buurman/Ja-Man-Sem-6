using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using NavigationPlatform.Server.Models;
using NavigationPlatform.Server.Services;

namespace NavigationPlatform.Server.Controllers
{
    [ApiController]
    [Route("api/graph")]
    public class GraphController : ControllerBase
    {
        private readonly GraphImportService _graphImportService;

        public GraphController(GraphImportService graphImportService)
        {
            _graphImportService = graphImportService;
        }

        [HttpGet("whole")]
        public async Task<ActionResult<GraphDto>> GetWholeGraph()
        {
            var graph = await _graphImportService.GetWholeGraphAsync();
            return Ok(graph);
        }

        [HttpPost]
        public async Task<IActionResult> ImportGraph([FromBody] GraphDto dto)
        {
            var json = JsonSerializer.Serialize(dto);
            await _graphImportService.ImportGraphFromJsonAsync(json);
            return Ok(new { message = "Graph imported successfully." });
        }

        [HttpGet]
        public async Task<ActionResult<GraphDto>> GetGraph([FromQuery] GetGraphFilters filters)
        {
            var graph = await _graphImportService.GetGraphAsync(filters.Floor);
            return Ok(graph);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGraph([FromBody] GraphDto dto, [FromRoute] Guid id)
        {
            await _graphImportService.UpdateGraphAsync(id, dto);
            return Ok(new { message = "Graph updated successfully." });
        }
    }
}
