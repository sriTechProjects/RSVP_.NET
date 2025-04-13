using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Attendance
{
    public int AttendanceId { get; set; }

    public int? EventRegistrationId { get; set; }

    public string? Status { get; set; }

    public virtual EventRegistration? EventRegistration { get; set; }
}
