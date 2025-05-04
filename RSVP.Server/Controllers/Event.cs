using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVP.Server.Models;
using RSVP.Server.DTOs;
using RSVP.Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSVP.Server.Controllers
{
    [Route("event")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly RsvpDbContext _context;

        public EventController(RsvpDbContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetAllEvents()
        {
            var events = await _context.Events
                .Include(e => e.Org)
                .Select(e => new EventDTO
                {
                    EventId = e.EventId,
                    EventName = e.EventName,
                    EventDate = e.EventDate,
                    EventDescription = e.EventDescription,
                    EventStartTime = e.EventStartTime,
                    EventEndTime = e.EventEndTime,
                    EventVenue = e.EventVenue,
                    EventStatus = e.EventStatus,
                    EventMode = e.EventMode,
                    EventNoOfSeats = e.EventNoOfSeats,
                    EventEligibility = e.EventEligibility,
                    EventPaid = e.EventPaid,
                    EventAmount = e.EventAmount,
                    EventQr = e.EventQr,
                    EventCategory = e.EventCategory,
                    OrganisationName = e.Org!.OrgName
                })
                .ToListAsync();

            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetEventById(int id)
        {
            var eventItem = await _context.Events
                .Include(e => e.EventRegistrations)
                    .ThenInclude(er => er.Attendance)
                .FirstOrDefaultAsync(e => e.EventId == id);

            if (eventItem == null)
            {
                return NotFound();
            }

            // Calculate registration and attendance counts
            int totalRegistrations = eventItem.EventRegistrations.Count;
            int totalAttendees = eventItem.EventRegistrations
                .Count(reg => reg.Attendance != null && reg.Attendance.Status == "Present");

            // Build response with extra info
            var eventDetails = new
            {
                eventItem.EventId,
                eventItem.OrgId,
                eventItem.EventName,
                eventItem.EventDate,
                eventItem.EventDescription,
                eventItem.EventStartTime,
                eventItem.EventEndTime,
                eventItem.EventVenue,
                eventItem.EventStatus,
                eventItem.EventMode,
                eventItem.EventNoOfSeats,
                eventItem.EventEligibility,
                eventItem.EventPaid,
                eventItem.EventAmount,
                eventItem.EventCategory,
                TotalRegistrations = totalRegistrations,
                TotalAttendees = totalAttendees
            };

            return Ok(eventDetails);
        }


    }

}
