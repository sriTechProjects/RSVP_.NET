import React from "react";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import EventInfoTags from "../EventInfoTags";

const UserEventDetails = ({ event, onClose, imageUrl, onClick }) => {
  const eventtime = `${event.starttime} - ${event.endtime}`;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ac]">
      <div className="relative bg-white rounded-lg shadow-lg w-[60%] max-w-[90%] h-[75%] overflow-y-auto">
        <div
          className="absolute top-8 right-8 text-xl cursor-pointer p-2 bg-white rounded-full"
          onClick={onClose}
        >
          <RiCloseLargeLine />
        </div>

        <div className="w-full h-48 border">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="px-10">
          {/* header */}
          <span className="flex justify-between">
            <h1 className="text-4xl font-semibold text-[#333]">{event.name}</h1>
            {/* <span className="p-2 text-base border border-gray-700 rounded-md">Hackthon</span> */}
          </span>

          {/* info tags */}
          <div className="mt-5 flex items-center gap-x-3">
            <EventInfoTags Icon={FaMapMarkerAlt} title={event.venue} />
            <EventInfoTags Icon={FaCalendar} title={event.date} />
            <EventInfoTags Icon={FiClock} title={eventtime} />
            <EventInfoTags Icon={BiCategory} title={event.category} />
            <EventInfoTags
              Icon={RiMoneyRupeeCircleFill}
              title={event.isPaid ? `Rs. ${event.amount}` : "Free"}
            />
          </div>

          {/* description box */}
          <div className="mt-6 flex flex-col gap-y-1">
            <h3 className="text-lg font-semibold text-[#333]">Description</h3>
            <p className="text-sm text-gray-600 text-justify">
              {event.description}
            </p>
          </div>

          {/* description box */}
          <div className="mt-6 flex flex-col gap-y-2">
            <h3 className="text-lg font-semibold text-[#333]">Eligibility</h3>
            <div className="flex gap-x-2">
              {event.eligibility.split(",").map((eleg, index) => (
                <span
                  key={index}
                  className="text-center py-1 px-5 rounded-md text-sm border border-gray-200 text-[#0897FF]"
                >
                  {eleg}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClick} 
           className="absolute bottom-8 left-10 bg-[#333] text-white px-4 py-2 rounded-md mt-2 mr-2 hover:bg-[#464646] transition duration-200 text-md cursor-pointer">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEventDetails;
