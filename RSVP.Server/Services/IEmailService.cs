using System.Threading.Tasks;

namespace RSVP.Server.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string body);
    }
}
