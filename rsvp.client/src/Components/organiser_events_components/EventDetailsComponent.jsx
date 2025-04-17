import React from "react";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import EventInfoTags from "../EventInfoTags";
import RegisteredAttendedBarChart from "../ChartsComponents/RegisteredAttendedBarChart";

const StatisticsComponent = ({value, title}) => {
  return (
    <div className="flex flex-col gap-y-1 items-center justify-center w-36 p-4 border border-gray-200 rounded-md">
      <h2 className="text-3xl font-medium text-[#0897FF]">{value}</h2>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
};

const EventDetailsComponent = ({event, onClose}) => {
  const eventtime = `${event.starttime} - ${event.endtime}`;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ac]">
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-[60%] max-w-[90%] h-[75%] overflow-y-auto">
        <RiCloseLargeLine className="absolute top-8 right-8 text-2xl cursor-pointer" onClick={onClose}/>
        <div className="">
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
            <EventInfoTags Icon={RiMoneyRupeeCircleFill} title="Free" />
            <EventInfoTags Icon={null} title={event.mode} />
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

              {
                (event.eligibility.split(',')).map((eleg, index) => (
                  <span key={index} className="text-center py-1 px-5 rounded-md text-sm border border-gray-200 text-[#0897FF]">{eleg}</span>
                ))
              }            

              
            </div>
          </div>


          {/* Statistics box */}
          <div className="mt-6 flex flex-col gap-y-2">
            <h3 className="text-lg font-semibold text-[#333]">Statistics</h3>
            <div className="flex items-center gap-x-3">
              <StatisticsComponent value={34} title={"Registrations"} />
              <StatisticsComponent value={230} title={"Revenue (Rs)"} />
            </div>
          </div>

          {/* Analytics box */}
          <div className="mt-6 flex flex-col gap-y-2">
            <h3 className="text-lg font-semibold text-[#333]">Analytics</h3>
            <div className="flex items-center gap-x-3 w-full border border-gray-200 p-2 rounded-md">
            <RegisteredAttendedBarChart registered={200} attended={175} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsComponent;
