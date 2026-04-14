using Microsoft.AspNetCore.Mvc;
using EncryptionHashingPrototype.Server.Models;
using EncryptionHashingPrototype.Server.Services;
using Microsoft.AspNetCore.Authorization;

namespace EncryptionHashingPrototype.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EncryptionController : ControllerBase
    {
        private readonly EncryptionService _encryptionService;

        public EncryptionController(EncryptionService encryptionService)
        {
            _encryptionService = encryptionService;
        }

        // [Authorize]
        [HttpPost("encrypt")]
        public ActionResult<ApiResponse> EncryptData([FromBody] EncryptDecryptRequest request)
        {
            try
            {
                var encrypted = _encryptionService.Encrypt(request.Data, request.Key);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = encrypted,
                    Message = "Encryption successful"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Data = null,
                    Message = $"Encryption failed: {ex.Message}"
                });
            }
        }

        [HttpGet("protected-data")]
        [Authorize]
        public IActionResult GetProtectedData()
        {
            return Ok(new { data = "This is protected!" });
        }

        [Authorize]
        [HttpPost("decrypt")]
        public ActionResult<ApiResponse> DecryptData([FromBody] EncryptDecryptRequest request)
        {
            try
            {
                var decrypted = _encryptionService.Decrypt(request.Data, request.Key);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = decrypted,
                    Message = "Decryption successful"
                });
            }
            catch (Exception _)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Data = null,
                    Message = "Decryption failed. Please check your data and key."
                });
            }
        }

        [Authorize]
        [HttpPost("hash")]
        public ActionResult<ApiResponse> HashData([FromBody] HashRequest request)
        {
            try
            {
                var hash = _encryptionService.Hash(request.Data);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = hash,
                    Message = "Hash generated successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Data = null,
                    Message = $"Hashing failed: {ex.Message}"
                });
            }
        }

        public class HashRequest
        {
            public string Data { get; set; } = string.Empty;
        }

        // [Authorize]
        [HttpGet("keys")]
        public ActionResult<ApiResponse> GetKeyOptions(int amount = 5)
        {
            try
            {
                var keys = _encryptionService.GenerateKeys(amount);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = keys,
                    Message = $"Generated {keys.Count} key(s) successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Data = null,
                    Message = $"Failed to generate keys: {ex.Message}"
                });
            }
        }

        // [Authorize]
        [HttpGet("public-key")]
        public ActionResult<string> GetPublicKey()
        {
            var publicKey = System.IO.File.ReadAllText("public.pem");
            return Ok(publicKey);
        }
    }

    // Standard API response model
    public class ApiResponse
    {
        public bool Success { get; set; }
        public object? Data { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}