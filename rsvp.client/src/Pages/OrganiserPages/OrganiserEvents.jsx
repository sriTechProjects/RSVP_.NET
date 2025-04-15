import { useState } from "react";
import { IoSearch, IoAdd } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import CreateNewEventForm from "../../Components/organiser_events_components/CreateNewEventForm";
import DeleteEventModal from "../../Components/organiser_events_components/DeleteEventModal";
import EditEventDetails from "../../Components/organiser_events_components/EditEventDetails";
import EventDetailsComponent from "../../Components/organiser_events_components/EventDetailsComponent";

const ITEMS_PER_PAGE = 10;

const getStatusColor = (status) => {
  return status === "Registration Open"
    ? "bg-[#00bd401f] text-[#00D222] border border-[#00D222]"
    : "bg-[#ff00001f] text-[#FF0000] border border-[#FF0000]";
};

const initialEvents = [
    {
      id: 1,
      name: "Nirmaan 3.0",
      description:"This is a hackathon for all",
      category: "Hackathon",
      date: "20/04/2025",
      venue: "D011",
      status: "Registration Open",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 2,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 3,
      name: "OOPS in Java",
      category: "Bootcamp",
      date: "23/04/2025",
      venue: "A101",
      status: "Registration Open",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 4,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 5,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 6,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 7,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 8,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 9,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 10,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 11,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 12,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 13,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 14,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
    {
      id: 15,
      name: "Pair Programming",
      category: "Coding Contest",
      date: "10/04/2025",
      venue: "H304",
      status: "Registration Closed",
      mode: "offline",
      starttime: "16:00",
      endtime: "18:00"
    },
  ];

const OrganiserEvents = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [events, setEvents] = useState(initialEvents);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedEvents = events.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDelete = () => {
    setDeleteEvent();
    setEvents((prev) => prev.filter((p) => p.id !== deleteEventId));
    setIsDeleteModalOpen(false);
    setDeleteEventId(null);
  };

  const handleEditProduct = () => {};
  return (
    <div className="relative w-full border border-gray-200 rounded-md  bg-white mt-2">
      {/* Header */}
      <header className="py-3 px-5 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-medium text-primary-text">Events List</h3>
        <div className="flex items-center gap-x-3">
          <div className="searchbar border border-gray-200 px-3 py-2 rounded-md flex items-center gap-x-2">
            <IoSearch className="text-[#8b8b8b]" />
            <input
              type="text"
              placeholder="Search"
              className="w-40 outline-none bg-transparent text-sm"
            />
          </div>

          <button
            className="text-sm bg-[#464646] px-3 py-2 rounded-md text-white flex items-center gap-x-2 cursor-pointer"
            onClick={() => {
              setEditEvent(null);
              setIsFormOpen(true);
            }}
          >
            <IoAdd className="text-lg" />
            <p>Create Event</p>
          </button>
        </div>
      </header>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead className="bg-[#f7f7f7] text-primary-text uppercase text-sm">
          <tr>
            {[
              "#",
              "Name",
              "Category",
              "Date",
              "Venue",
              "Status",
              "Actions",
            ].map((heading, index) => (
              <th
                key={index}
                className="px-5 py-3 text-center font-medium text-sm"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {displayedEvents.map((event, index) => (
            <tr key={event.id} className="border-b border-gray-200 transition text-sm">
              <td className="py-3 px-5 text-center">
                {startIndex + index + 1}
              </td>
              <td className="py-3 px-5 text-center">{event.name}</td>
              <td className="py-3 px-5 text-center">{event.category}</td>
              <td className="py-3 px-5 text-center">{event.date}</td>
              <td className="py-3 px-5 text-center">{event.venue}</td>
              <td className="py-3 px-5 text-center">
                <p
                  className={`w-fit mx-auto rounded-full px-2 py-1 ${getStatusColor(
                    event.status
                  )}`}
                >
                  {event.status}
                </p>
              </td>
              <td className="py-2 px-5 text-center space-x-2 flex justify-center">
                {/* view */}
                <button className="relative group border border-gray-200 p-2 rounded-md" onClick={()=>setIsEventDetailOpen(true)}>
                  <FaRegEye />
                  <span className="absolute hidden group-hover:block text-xs text-white bg-gray-800 px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2 z-10">
                    View Details
                  </span>
                </button>

                {/* Edit */}
                <button
                  className="relative group border border-gray-200 p-2 rounded-md"
                  onClick={() => {
                    setEditEvent(event);
                    setIsEditFormOpen(true);
                  }}
                >
                  <CiEdit />
                  <span className="absolute hidden group-hover:block text-xs text-white bg-gray-800 px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2 z-10">
                    Edit
                  </span>
                </button>

                {/* Delete */}
                <button
                  className="relative group border border-gray-200 p-2 rounded-md"
                  onClick={() => {
                    setDeleteEvent(event);
                    setDeleteEventId(event.id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <RiDeleteBin7Line />
                  <span className="absolute hidden group-hover:block text-xs text-white bg-gray-800 px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2 z-10">
                    Delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#333333] text-white rounded-md disabled:bg-[#f9f9f9] disabled:text-[#333]"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#333333] text-white rounded-md disabled:bg-[#f9f9f9] disabled:text-[#333333]"
        >
          Next
        </button>
      </div>

      {/* Add/Edit Form */}
      {isFormOpen && (
        <CreateNewEventForm
          onClose={() => setIsFormOpen(false)}
          productToEdit={editEvent}
        />
      )}

      {isEditFormOpen && (
        <EditEventDetails
          eventDetail={editEvent}
          onClose={() => setIsEditFormOpen(false)}
          onSubmit={handleEditProduct}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteEventModal
          deleteEventDetail={deleteEvent}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}


      {
        isEventDetailOpen && (
          <EventDetailsComponent
            onClose={()=>setIsEventDetailOpen(false)}
          />
        )
      }
    </div>
  );
};

export default OrganiserEvents;
