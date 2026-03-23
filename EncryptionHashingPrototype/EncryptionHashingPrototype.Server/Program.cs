using EncryptionHashingPrototype.Server.Services;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

var key = "SUPER_SECRET_KEY_12345";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

builder.Services.AddAuthorization();

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
