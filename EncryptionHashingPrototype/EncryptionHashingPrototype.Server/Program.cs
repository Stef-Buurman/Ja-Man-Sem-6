using EncryptionHashingPrototype.Server.Services;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);


var rsa = RSA.Create(2048);

// Export keys
string privateKey = rsa.ExportRSAPrivateKeyPem();
string publicKey = rsa.ExportSubjectPublicKeyInfoPem();

// Save them (or store securely)
File.WriteAllText("private.pem", privateKey);
File.WriteAllText("public.pem", publicKey);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<EncryptionService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
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
