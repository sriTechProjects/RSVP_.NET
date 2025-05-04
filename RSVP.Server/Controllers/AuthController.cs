using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVP.Server.Models;
using RSVP.Server.DTOs;
using RSVP.Server.Services;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Caching.Memory;

namespace RSVP.Server.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RsvpDbContext _context;
        private readonly IMemoryCache _cache;

        public AuthController(RsvpDbContext context, IMemoryCache cache)
        {
            _cache = cache;
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


        [HttpPost("register/organisation-with-club")]
        public async Task<IActionResult> RegisterWithClub([FromBody] ClubOrganisationDTO dto)
        {
            var club = dto.Club;
            var org = dto.Organisation;

            if (club == null || org == null)
            {
                return BadRequest("Club and Organisation details are required.");
            }

            // Check if organisation already exists
            var existingOrg = await _context.Organisations
                .FirstOrDefaultAsync(o => o.OrgEmail == org.OrgEmail);

            if (existingOrg != null)
            {
                return Conflict("An organisation with this email already exists.");
            }

            // Optional: Check if a club already exists (based on name or contact)
            var existingClub = await _context.Clubs
                .FirstOrDefaultAsync(c => c.ClubName == club.ClubName);

            if (existingClub != null)
            {
                return Conflict("A club with this name already exists.");
            }

            // Save club first
            _context.Clubs.Add(club);
            await _context.SaveChangesAsync();  // This will generate ClubId

            // Link the ClubId to the organisation
            org.ClubId = club.ClubId;

            // Optional: hash password before saving
            // org.OrgPassword = HashPassword(org.OrgPassword);

            _context.Organisations.Add(org);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Club and Organisation registered successfully.",
                ClubId = club.ClubId,
                OrganisationId = org.OrgId
            });
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword([FromBody] string email, [FromServices] EmailService emailService)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email is required.");

            var student = await _context.Students.FirstOrDefaultAsync(s => s.Email == email);
            var organisation = await _context.Organisations.FirstOrDefaultAsync(o => o.OrgEmail == email);

            if (student == null && organisation == null)
                return NotFound("No user found with the provided email.");

            var otp = new Random().Next(100000, 999999).ToString();

            // Store OTP in memory cache for 10 minutes
            _cache.Set(email, otp, TimeSpan.FromMinutes(10));

            string subject = "Password Reset OTP";
            string body = $"<h3>Your OTP is: <strong>{otp}</strong></h3><p>It is valid for 10 minutes.</p>";

            await emailService.SendEmailAsync(email, subject, body);

            return Ok("OTP sent to your email.");
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] OtpRequest request)
        {
            if (_cache.TryGetValue(request.Email, out string storedOtp))
            {
                if (storedOtp == request.Otp)
                {
                    // Optionally remove after verification
                    _cache.Remove(request.Email);
                    return Ok("OTP verified.");
                }

                return BadRequest("Invalid OTP.");
            }

            return BadRequest("OTP expired or not found.");
        }

        public class OtpRequest
        {
            public string Email { get; set; }
            public string Otp { get; set; }
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
