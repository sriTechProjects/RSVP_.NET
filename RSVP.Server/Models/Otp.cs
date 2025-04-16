using System;

namespace RSVP.Server.Models
{
    public class Otp
    {
        public int Id { get; set; } // Primary Key
        public string? Email { get; set; }
        public string? Code { get; set; }
        public DateTime? ExpiryTime { get; set; }
    }
}
