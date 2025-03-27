using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class EventTable
{
    public int EventId { get; set; }

    public string EventTitle { get; set; } = null!;

    public string? EventDescription { get; set; }

    public DateOnly EventDate { get; set; }

    public string EventVenue { get; set; } = null!;

    public int Capacity { get; set; }

    public int OrgId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Organization Org { get; set; } = null!;
}
