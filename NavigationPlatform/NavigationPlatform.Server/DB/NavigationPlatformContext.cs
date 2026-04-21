using Microsoft.EntityFrameworkCore;

namespace NavigationPlatform.Server.DB
{
    public class NavigationPlatformContext : DbContext
    {
        public NavigationPlatformContext(DbContextOptions<NavigationPlatformContext> options)
            : base(options)
        {
        }
    }
}