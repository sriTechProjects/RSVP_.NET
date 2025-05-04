using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVP.Server.Models;
using RSVP.Server.DTOs;
using RSVP.Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RSVP.Server.DTO;

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

        [HttpGet("by-org")]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetEventsByOrgId([FromQuery] int id)
        {
            var query = _context.Events
                .Include(e => e.Org)
                .Where(e => e.OrgId == id);

            var filteredEvents = await query
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

            return Ok(filteredEvents);
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

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] updateEventDTO dto)
        {
            var existingEvent = await _context.Events.FindAsync(id);
            if (existingEvent == null)
                return NotFound();

            // Only update the fields listed in the React form
            existingEvent.EventName = dto.EventName;
            existingEvent.EventCategory = dto.EventCategory;
            existingEvent.EventDescription = dto.EventDescription;
            existingEvent.EventVenue = dto.EventVenue;
            existingEvent.EventDate = dto.EventDate;
            existingEvent.EventMode = dto.EventMode;
            existingEvent.EventStatus = dto.EventStatus;
            existingEvent.EventStartTime = dto.EventStartTime;
            existingEvent.EventEndTime = dto.EventEndTime;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Manual validation of required fields
            if (string.IsNullOrWhiteSpace(model.EventName) || string.IsNullOrWhiteSpace(model.EventCategory) ||
                string.IsNullOrWhiteSpace(model.EventDescription) || string.IsNullOrWhiteSpace(model.EventVenue) ||
                string.IsNullOrWhiteSpace(model.EventDate) || string.IsNullOrWhiteSpace(model.EventMode) ||
                string.IsNullOrWhiteSpace(model.EventStatus) || string.IsNullOrWhiteSpace(model.EventStartTime) ||
                string.IsNullOrWhiteSpace(model.EventEndTime))
            {
                return BadRequest("All fields are required.");
            }

            // Parse Date and Time values
            if (!DateOnly.TryParse(model.EventDate, out var parsedDate))
                return BadRequest("Invalid date format.");

            if (!TimeOnly.TryParse(model.EventStartTime, out var parsedStartTime) ||
                !TimeOnly.TryParse(model.EventEndTime, out var parsedEndTime))
                return BadRequest("Invalid start or end time format.");

            var newEvent = new Event
            {
                OrgId = model.OrgId,
                EventName = model.EventName,
                EventCategory = model.EventCategory,
                EventDescription = model.EventDescription,
                EventVenue = model.EventVenue,
                EventDate = parsedDate,
                EventMode = model.EventMode,
                EventStatus = model.EventStatus,
                EventStartTime = parsedStartTime,
                EventEndTime = parsedEndTime,

                // Set these if required later
                EventPaid = "no",
                EventAmount = null,
                EventQr = null,
                EventNoOfSeats = null,
                EventEligibility = null
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event created successfully", eventDetails = newEvent });
        }


    }

}
