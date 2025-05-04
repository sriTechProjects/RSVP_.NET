using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Organisation
{
    public int OrgId { get; set; }

    public string? OrgName { get; set; }

    public string? OrgDepartment { get; set; }

    public string? OrgRole { get; set; }

    public string? OrgEmail { get; set; }

    public string? OrgContact { get; set; }

    public int? OrgNoOfEvents { get; set; }

    public int? ClubId { get; set; }

    public string? OrgPassword { get; set; }

    public virtual Club? Club { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
