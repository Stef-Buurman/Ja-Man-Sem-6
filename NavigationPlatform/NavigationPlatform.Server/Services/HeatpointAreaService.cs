using System.Text.Json;
using System.Text.Json.Serialization;
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
        private static readonly JsonSerializerOptions _jsonSerializerOptions = CreateJsonSerializerOptions();

        private static JsonSerializerOptions CreateJsonSerializerOptions()
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            options.Converters.Add(new JsonStringEnumConverter());
            return options;
        }

        public HeatpointAreaService(NavigationPlatformContext context, IHubContext<HeatmapHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public List<HeatpointArea> GetHeatpointAreas()
        {
            return _context.HeatpointAreas.AsNoTracking().Include(a => a.Floor).ToList();
        }

        public List<HeatpointAreaDto> GetHeatpointAreasJson()
        {
            return _context.HeatpointAreas.AsNoTracking().Include(a => a.Floor).ToList().Select(a => new HeatpointAreaDto
            {
                Id = a.Id,
                X = a.X,
                Y = a.Y,
                Value = a.Value,
                SoundLevel = a.SoundLevel,
                Floor = a.Floor?.Number ?? 0,
                Width = a.Width,
                Height = a.Height
            }).ToList();
        }

        public async Task ImportHeatpointAreas()
        {
            const string filePath = "Data/HeatpointAreas.json";

            if (!File.Exists(filePath))
                return;

            var json = await File.ReadAllTextAsync(filePath);

            var heatpointAreas = JsonSerializer.Deserialize<List<HeatpointAreaDto>>(
                json,
                _jsonSerializerOptions
            );

            if (heatpointAreas is null || heatpointAreas.Count == 0)
                return;

            var floors = await _context.Floors
                .ToDictionaryAsync(f => f.Number, f => f.Id);

            var existingAreas = await _context.HeatpointAreas.ToListAsync();

            foreach (var area in heatpointAreas)
            {
                floors.TryGetValue(area.Floor, out var floorId);

                var existingHeatpoint = FindExistingHeatpointArea(
                    existingAreas,
                    area,
                    floorId
                );

                if (existingHeatpoint is not null)
                {
                    UpdateHeatpointArea(existingHeatpoint, area, floorId);
                    continue;
                }

                _context.HeatpointAreas.Add(new HeatpointArea
                {
                    Id = area.Id == Guid.Empty ? Guid.NewGuid() : area.Id,
                    X = area.X,
                    Y = area.Y,
                    Value = area.Value,
                    SoundLevel = area.SoundLevel,
                    FloorId = floorId,
                    Width = area.Width,
                    Height = area.Height
                });
            }

            await _context.SaveChangesAsync();
        }

        private static HeatpointArea? FindExistingHeatpointArea(
            List<HeatpointArea> existingAreas,
            HeatpointAreaDto area,
            Guid? floorId)
        {
            if (area.Id != Guid.Empty)
            {
                var byId = existingAreas.FirstOrDefault(h => h.Id == area.Id);

                if (byId is not null)
                    return byId;
            }

            return existingAreas.FirstOrDefault(h =>
                h.X == area.X &&
                h.Y == area.Y &&
                h.FloorId == floorId &&
                h.Width == area.Width &&
                h.Height == area.Height
            );
        }

        private static void UpdateHeatpointArea(
            HeatpointArea existingHeatpoint,
            HeatpointAreaDto area,
            Guid? floorId)
        {
            existingHeatpoint.X = area.X;
            existingHeatpoint.Y = area.Y;
            existingHeatpoint.Value = area.Value;
            existingHeatpoint.SoundLevel = area.SoundLevel;
            existingHeatpoint.FloorId = floorId;
            existingHeatpoint.Width = area.Width;
            existingHeatpoint.Height = area.Height;
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
                FloorId = _context.Floors.FirstOrDefault(f => f.Number == area.Floor)?.Id,
                Width = area.Width,
                Height = area.Height
            };

            _context.HeatpointAreas.Add(heatpointArea);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync(hubMethodName, "Heatpoint area added");
        }

        public async Task UpdateHeatpointArea(Guid id, HeatpointAreaDto area)
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

        public async Task DeleteHeatpointArea(Guid id)
        {
            var area = await _context.HeatpointAreas.FindAsync(id);
            if (area == null)
            {
                throw new Exception($"Area with ID {id} does not exist.");
            }

            _context.HeatpointAreas.Remove(area);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync(hubMethodName, "Heatpoint area deleted");
        }
    }
}