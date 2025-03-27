using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int EventId { get; set; }

    public int UserId { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? BookedAt { get; set; }

    public virtual EventTable Event { get; set; } = null!;

    public virtual UserCredential User { get; set; } = null!;
}
