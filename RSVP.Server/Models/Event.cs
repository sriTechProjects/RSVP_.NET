using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Event
{
    public int EventId { get; set; }

    public int? OrgId { get; set; }

    public string? EventName { get; set; }

    public DateOnly? EventDate { get; set; }

    public string? EventDescription { get; set; }

    public TimeOnly? EventStartTime { get; set; }

    public TimeOnly? EventEndTime { get; set; }

    public string? EventVenue { get; set; }

    public string? EventStatus { get; set; }

    public string? EventMode { get; set; }

    public int? EventNoOfSeats { get; set; }

    public string? EventEligibility { get; set; }

    public string? EventPaid { get; set; }

    public decimal? EventAmount { get; set; }

    public byte[]? EventQr { get; set; }

    public string? EventCategory { get; set; }

    public virtual ICollection<EventRegistration> EventRegistrations { get; set; } = new List<EventRegistration>();

    public virtual Organisation? Org { get; set; }
}
