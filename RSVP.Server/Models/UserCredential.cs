using System;
using System.Collections.Generic;

namespace RSVP.Server.Models;

public partial class UserCredential
{
    public int UserId { get; set; }

    public string EmailId { get; set; } = null!;

    public string Password { get; set; } = null!;
}
