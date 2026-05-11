using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.DB;
using NavigationPlatform.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.None);
builder.Logging.AddFilter("Microsoft.EntityFrameworkCore.Database.Command", LogLevel.None);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen(options =>
{
    options.TagActionsBy(api =>
        new[] { api.GroupName ?? api.ActionDescriptor.RouteValues["controller"] }
    );

    options.CustomOperationIds(apiDesc =>
        apiDesc.ActionDescriptor.RouteValues["action"]
    );

    options.SchemaFilter<RequireAllPropertiesSchemaFilter>();
});

builder.Services.AddScoped<GraphImportService>();

var connectionString = builder.Configuration.GetConnectionString("Postgres");

builder.Services.AddDbContextFactory<NavigationPlatformContext>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddHostedService<DatabaseInitializationHostedService>();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();