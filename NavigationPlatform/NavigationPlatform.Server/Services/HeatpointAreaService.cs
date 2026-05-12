using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.DB;
using NavigationPlatform.Server.Hubs;
using NavigationPlatform.Server.Models;
namespace NavigationPlatform.Server.Services
{
    public class HeatpointAreaService
    {
        private readonly NavigationPlatformContext _context;
        private readonly IHubContext<HeatmapHub> _hubContext;
        private string hubMethodName = "ReceiveAreaUpdate";

        public HeatpointAreaService(NavigationPlatformContext context, IHubContext<HeatmapHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public List<HeatpointArea> GetHeatpointAreas()
        {
            return _context.HeatpointAreas.AsNoTracking().Include(a => a.Floor).ToList();
        }

        public async Task AddHeatpointArea(HeatpointAreaDto area)
        {
            var heatpointArea = new HeatpointArea
            {
                Id = area.Id,
                X = area.X,
                Y = area.Y,
                Value = area.Value,
                SoundLevel = area.SoundLevel,
                Level = area.Level,
                FloorId = _context.Floors.FirstOrDefault(f => f.Number == area.Floor)?.Id,
                Width = area.Width,
                Height = area.Height
            };

            _context.HeatpointAreas.Add(heatpointArea);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync(hubMethodName, "Heatpoint area added");
        }

        public async Task UpdateHeatpointArea(int id, HeatpointAreaDto area)
        {
            var existingArea = _context.HeatpointAreas.FirstOrDefault(a => a.Id == id);
            if (existingArea == null)
            {
                throw new Exception($"Heatpoint area with ID {id} not found.");
            }
            existingArea.X = area.X;
            existingArea.Y = area.Y;
            existingArea.Value = area.Value;
            existingArea.SoundLevel = area.SoundLevel;
            existingArea.Level = area.Level;
            existingArea.FloorId = _context.Floors.FirstOrDefault(f => f.Number == area.Floor)?.Id;
            existingArea.Width = area.Width;
            existingArea.Height = area.Height;

            _context.HeatpointAreas.Update(existingArea);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync(hubMethodName, "Heatpoint area updated");
        }

        public async Task UpdateRangeHeatpointArea(List<HeatpointAreaDto> areas)
        {
            foreach (var a in areas)
            {
                if (!_context.HeatpointAreas.Any(existing => existing.Id == a.Id))
                {
                    throw new Exception($"Area with ID {a.Id} does not exist.");
                }
            }
            foreach (var area in areas)
            {
                await UpdateHeatpointArea(area.Id, area);
            }
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync(hubMethodName, "Heatpoint areas updated");
        }

        public async Task DeleteHeatpointArea(int id)
        {
            var area = await _context.HeatpointAreas.FindAsync(id);
            if (area == null)
            {
                throw new Exception($"Area with ID {id} does not exist.");
            }

            _context.HeatpointAreas.Remove(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync(hubMethodName, "Heatpoint area deleted");
    }}
}