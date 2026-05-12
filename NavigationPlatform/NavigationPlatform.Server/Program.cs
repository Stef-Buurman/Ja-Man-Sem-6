using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using NavigationPlatform.Server.DB;
using NavigationPlatform.Server.Hubs;
using NavigationPlatform.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
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

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddScoped<GraphImportService>();
builder.Services.AddScoped<HeatpointAreaService>();
builder.Services.AddScoped<FloorService>();

var connectionString = builder.Configuration.GetConnectionString("Postgres");

builder.Services.AddDbContext<NavigationPlatformContext>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddHostedService<DatabaseInitializationHostedService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCors", policy =>
        policy.WithOrigins(
                "https://localhost:59957",
                "https://navplatform.buurmans.info")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseCors("ReactCors");

app.UseAuthorization();

app.MapControllers();
app.MapHub<HeatmapHub>("/hubs/heatmaphub");
app.MapFallbackToFile("/index.html");

app.Run();
