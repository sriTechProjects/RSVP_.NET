using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVP.Server.Models;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RSVP.Server.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RsvpDbContext _context;

        public AuthController(RsvpDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Invalid request data.");

            var existingUser = await _context.UserCredentials.FirstOrDefaultAsync(u => u.EmailId == request.Email);
            if (existingUser == null)
                return Unauthorized("Invalid email or password.");

            // Verify the password hash
            if (request.Password != existingUser.Password)
                return Unauthorized("Invalid email or password.");

            return Ok(new { message = "Login successful!", request = existingUser });
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            using var sha256 = SHA256.Create();
            byte[] computedHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            string computedHashString = Convert.ToBase64String(computedHash);
            return computedHashString == storedHash;
        }
    }
}
