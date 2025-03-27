using Microsoft.AspNetCore.Mvc;
using EventRSVPApp.Server.Data;
using EventRSVPApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;


namespace EventRSVPApp.Server.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser == null || existingUser.PasswordHash != user.PasswordHash)
                return Unauthorized("Invalid email or password.");

            return Ok(new { message = "Login successful!", user = existingUser });
        }
    }
        
}
