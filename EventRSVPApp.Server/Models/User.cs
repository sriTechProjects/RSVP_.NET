using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace EventRSVPApp.Server.Models
{
    public enum UserRole
    {
        Admin,
        Employer,
        Manager,
        Organizer
    }

    public class User : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [Range(18, 100, ErrorMessage = "Age must be between 18 and 100")]
        public int Age { get; set; }

        public UserRole Role { get; set; }
    }
}
