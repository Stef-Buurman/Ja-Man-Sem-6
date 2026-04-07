using Microsoft.EntityFrameworkCore;
using HeatmapAPI.Data;
using HeatmapAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=heatmap.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCors", policy =>
        policy.WithOrigins("https://localhost:61140") 
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ReactCors");

app.UseAuthorization();

app.MapControllers();

app.MapHub<HeatmapHub>("/api/heatmapHub");

app.Run();