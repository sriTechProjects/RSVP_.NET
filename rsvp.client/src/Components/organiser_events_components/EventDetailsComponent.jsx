import React from "react";

const EventDetailsComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ac]">
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-[60%] max-w-[90%] h-[70%] overflow-y-auto">
        <div className="">
          <span className="flex justify-between">
            <h1 className="text-4xl font-semibold text-[#333]">Nirmaan 3.0</h1>
            <span className="p-2 text-base border border-gray-700 rounded-md">Hackthon</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsComponent;
