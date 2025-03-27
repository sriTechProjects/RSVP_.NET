using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class UserTable
{
    public int UserId { get; set; }

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public int Age { get; set; }

    public string PhoneNo { get; set; } = null!;

    public string Role { get; set; } = null!;

    public int OrganizationId { get; set; }

    public virtual Organization Organization { get; set; } = null!;
}
