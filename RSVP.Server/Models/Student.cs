using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Student
{
    public string Prn { get; set; } = null!;

    public string? Name { get; set; }

    public string? Department { get; set; }

    public int? Year { get; set; }

    public string? Div { get; set; }

    public string? Batch { get; set; }

    public string? Email { get; set; }

    public string? Contact { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<EventRegistration> EventRegistrations { get; set; } = new List<EventRegistration>();
}
