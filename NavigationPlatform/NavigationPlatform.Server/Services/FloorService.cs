using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.DB;

namespace NavigationPlatform.Server.Services
{
    public class FloorService
    {
        private readonly NavigationPlatformContext _context;

        public FloorService(NavigationPlatformContext context)
        {
            _context = context;
        }

        public async Task<List<FloorDto>> GetFloors()
        {
            var floors = await _context.Floors.OrderBy(f => f.Number).ToListAsync();
            return floors.Select(f => new FloorDto
            {
                Id = f.Id,
                Number = f.Number,
                FileName = f.FileName
            }).ToList();
        }
    }
}