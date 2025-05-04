import React from "react";
import { FaCalendar } from "react-icons/fa";
const EventsCard = ({
  imageUrl,
  event,
  setOpenDetails,
  setOpenRegister,
  setSelectedEvent,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-sm overflow-hidden shrink-0">
      {/* Image with overlay */}
      <div className="relative">
        <img src={imageUrl} alt="Card" className="w-full h-24 object-cover" />

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <span className="absolute top-2 right-2 flex items-center gap-x-1 bg-white text-[#333] px-2 py-1 rounded-md text-sm font-semibold">
          <FaCalendar />
          <p>{event.date}</p>
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-y-2 ">
        <span className="flex items-center justify-between w-full">
          <h3 className="text-gray-800 text-xl font-semibold">{event.title}</h3>
          <span className="text-sm border px-2 py-1 rounded-full">
            {event.category}
          </span>
        </span>
        <p className="text-gray-600 text-sm mt-2">{event.description}</p>

        <div className="flex items-center justify-between mt-1">
          <span>
            <button
              onClick={() => {
                setOpenRegister(true);
              }}
              className="bg-[#333] text-white px-4 py-2 rounded-md mt-2 mr-2 hover:bg-[#464646] transition duration-200 text-sm cursor-pointer"
            >
              Register
            </button>

            <button
              onClick={() => {
                setSelectedEvent(event);
                setOpenDetails(true);
              }}
              className="bg-[#eee] text-[#333] font-medium px-4 py-2 rounded-md mt-2 mr-2 hover:bg-[#ccc] transition duration-200 text-sm cursor-pointer"
            >
              View Details
            </button>
          </span>

          <span className="w-fit text-md border border-[#0897FF] text-[#0897FF] bg-[#0897ff1c] px-2 py-1 rounded-sm font-semibold">
            {event.isPaid ? `Rs. ${event.amount}` : "Free"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
