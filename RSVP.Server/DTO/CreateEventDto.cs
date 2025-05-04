namespace RSVP.Server.DTO
{
    public class CreateEventDto
    {
        public int? OrgId { get; set; }
        public string EventName { get; set; } = string.Empty;
        public string EventCategory { get; set; } = string.Empty;
        public string EventDescription { get; set; } = string.Empty;
        public string EventVenue { get; set; } = string.Empty;
        public string EventDate { get; set; } = string.Empty; // Expect "yyyy-MM-dd"
        public string EventMode { get; set; } = string.Empty;
        public string EventStatus { get; set; } = string.Empty;
        public string EventStartTime { get; set; } = string.Empty; // Expect "HH:mm"
        public string EventEndTime { get; set; } = string.Empty;   // Expect "HH:mm"
    }

}
