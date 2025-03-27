using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class Organization
{
    public int OrgId { get; set; }

    public string OrgName { get; set; } = null!;

    public string OrgEmail { get; set; } = null!;

    public string OrgPhoneNo { get; set; } = null!;

    public DateOnly OrgJoining { get; set; }

    public virtual ICollection<EventTable> EventTables { get; set; } = new List<EventTable>();

    public virtual ICollection<UserTable> UserTables { get; set; } = new List<UserTable>();
}
