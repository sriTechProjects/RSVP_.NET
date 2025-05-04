using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Club
{
    public int ClubId { get; set; }

    public string? ClubName { get; set; }

    public string? ClubDepartment { get; set; }

    public string? ClubEmail { get; set; }

    public string? ClubContact { get; set; }

    public DateTime? ClubCreatedAt { get; set; }

    public DateTime? ClubUpdatedAt { get; set; }

    public virtual ICollection<Organisation> Organisations { get; set; } = new List<Organisation>();
}
