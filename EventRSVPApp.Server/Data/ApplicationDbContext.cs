using Microsoft.EntityFrameworkCore;
using EventRSVPApp.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace EventRSVPApp.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
    }
}
