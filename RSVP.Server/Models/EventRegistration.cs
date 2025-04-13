using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class EventRegistration
{
    public int EventRegId { get; set; }

    public int? EventId { get; set; }

    public string? StudentId { get; set; }

    public string? TransactionId { get; set; }

    public byte[]? PaymentScreenshot { get; set; }

    public virtual Attendance? Attendance { get; set; }

    public virtual Event? Event { get; set; }

    public virtual Student? Student { get; set; }
}
