import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const CreateNewEventForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    venue: "",
    date: "",
    mode: "",
    status: "",
    starttime: "",
    endtime: ""
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000ac]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-xl relative">
        <span className="flex gap-x-2 items-center mb-6">
          <div className="p-2 rounded-full bg-[#0898ff66] border border-[#0897FF]">
            <IoAddOutline className="text-[#0897FF] text-2xl font-semibold"/>
          </div>
          <h2 className="text-2xl font-medium text-left">
            Create New Event
          </h2>
        </span>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-2 rounded-md outline-0"
            >
              <option value="" disabled>Select Category</option>
              <option value="hackathon">Hackathon</option>
              <option value="coding contest">Conding Contest</option>
              <option value="podcast">Podcast</option>
              <option value="bootcamp">Bootcamp</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Mode</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            >
              <option value="" disabled>Select Mode</option>
              <option value="available">Offline</option>
              <option value="out of stock">Online</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            >
              <option value="" disabled>Select Status</option>
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <input
              type="text"
              name="starttime"
              value={formData.starttime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">End Time</label>
            <input
              type="text"
              name="endtime"
              value={formData.endtime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-0"
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#f1f1f1] shadow-sm rounded-md"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0897FF] text-white rounded-md"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewEventForm;
