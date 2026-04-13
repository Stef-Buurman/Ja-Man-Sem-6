using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly string _jwtKey = "your_super_secret_key_here_very_long";

    [HttpPost("get-jwt")]
    public ActionResult<GetJwtResponse> GetJwt()
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, "user"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds
        );

        return Ok(new GetJwtResponse{ Token = new JwtSecurityTokenHandler().WriteToken(token) });
    }

    public class GetJwtResponse
    {
        public string Token { get; set; }
    }
}