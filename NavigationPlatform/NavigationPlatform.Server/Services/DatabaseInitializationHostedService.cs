using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.DB;

namespace NavigationPlatform.Server.Services
{
    public class DatabaseInitializationHostedService : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<DatabaseInitializationHostedService> _logger;

        public DatabaseInitializationHostedService(
            IServiceScopeFactory scopeFactory,
            ILogger<DatabaseInitializationHostedService> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<NavigationPlatformContext>();

            try
            {
                if (!await context.Database.CanConnectAsync(cancellationToken))
                    throw new Exception("Cannot connect to database!");

                await context.Database.MigrateAsync(cancellationToken);
                var graphImportService = scope.ServiceProvider.GetRequiredService<GraphImportService>();
                await graphImportService.ImportGraphFromFileAsync("Data/Verdieping3.json");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Database initialization failed. The application may not function correctly.");
                throw;
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}