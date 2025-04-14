using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVP.Server.Models;
using RSVP.Server.Services;
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
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Check in Organisation table
            var org = await _context.Organisations
                .FirstOrDefaultAsync(o => o.OrgEmail == request.Email);

            if (org != null)
            {
                if (org.OrgPassword != request.Password)
                {
                    return Unauthorized("Invalid email or password.");
                }

                return Ok(new
                {
                    Message = "Login successful",
                    Role = "organisation",
                    OrganisationId = org.OrgId,
                    Name = org.OrgName,
                    Department = org.OrgDepartment,
                    Email = org.OrgEmail,
                    Contact = org.OrgContact,
                    Events = org.OrgNoOfEvents,
                    ClubId = org.ClubId
                });
            }

            // Check in Student table
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.Email == request.Email);

            if (student != null)
            {
                if (student.Password != request.Password)
                {
                    return Unauthorized("Invalid email or password.");
                }

                return Ok(new
                {
                    Message = "Login successful",
                    Role = "student",
                    StudentId = student.Prn,
                    Name = student.Name,
                    Email = student.Email,
                    Contact = student.Contact,
                    Department = student.Department,
                    College = student.Div
                });
            }

            return Unauthorized("Invalid email or password.");
        }

        [HttpPost("register/student")]
        public async Task<IActionResult> RegisterStudent([FromBody] Student student)
        {
            if (string.IsNullOrWhiteSpace(student.Email) || string.IsNullOrWhiteSpace(student.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var existingStudent = await _context.Students
                .FirstOrDefaultAsync(s => s.Email == student.Email);

            if (existingStudent != null)
            {
                return Conflict("A student with this email already exists.");
            }

            // Optional: hash the password here
            // student.Password = HashPassword(student.Password);

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Student registered successfully." });
        }


        [HttpPost("register/organisation")]
        public async Task<IActionResult> RegisterOrganisation([FromBody] Organisation org)
        {
            if (string.IsNullOrWhiteSpace(org.OrgEmail) || string.IsNullOrWhiteSpace(org.OrgPassword))
            {
                return BadRequest("Email and password are required.");
            }

            var existingOrg = await _context.Organisations
                .FirstOrDefaultAsync(o => o.OrgEmail == org.OrgEmail);

            if (existingOrg != null)
            {
                return Conflict("An organisation with this email already exists.");
            }

            // Optional: hash the password here
            // org.OrgPassword = HashPassword(org.OrgPassword);

            _context.Organisations.Add(org);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Organisation registered successfully." });
        }
        [HttpPost("emailTest")]
        public async Task<IActionResult> emailTest([FromBody] string email, [FromServices] EmailService emailService)
        {
            if (email==null)
            {
                return BadRequest("Email is required.");
            }
            string body = "<h3>Reset Your Password</h3><p>Click here to reset your password.</p>";

            await emailService.SendEmailAsync(email, "Reset Password", body);

            return Ok("Password reset email sent.");
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
