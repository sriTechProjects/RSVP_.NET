import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdNotifications, MdExpandMore, MdAccountCircle, MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
// import logo from "/solved.png"; // ensure this logo exists in public or src

const UserLayout = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New order received", time: "5m ago" },
    { id: 2, text: "Product stock low", time: "1h ago" },
  ]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Seller",
  };

  const ProfileDropdown = () => (
    <div className="relative profile-dropdown">
      <button
        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[#0897FF] text-white flex items-center justify-center font-medium">
          {getInitials(user.name)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <MdExpandMore
          className={`
          w-5 h-5 text-gray-500 transition-transform duration-200
          ${isProfileDropdownOpen ? "rotate-180" : ""}
        `}
        />
      </button>

      {isProfileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              to="/seller/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <MdAccountCircle className="w-5 h-5" />
              Profile
            </Link>
            <Link
              to="/seller/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <IoMdSettings className="w-5 h-5" />
              Settings
            </Link>
          </div>

          <div className="border-t border-gray-200 py-1">
            <button
              onClick={() => {
                // Add logout logic here
                setIsProfileDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              <MdLogout className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const NotificationDropdown = () => (
    <div className="relative">
      <button
        className="p-2 rounded-lg hover:bg-gray-100 relative"
        onClick={() => setIsProfileDropdownOpen(false)}
      >
        <MdNotifications className="w-6 h-6 text-gray-500" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white shadow-md py-2">
        <div className="max-w-[90%] mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <Link to='/' className="flex items-center gap-2">
            {/* <img src={logo} alt="DoubtAdda Logo" className="h-8 w-8" /> */}
            <h1 className="text-xl font-semibold text-gray-800">RSVP</h1>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow py-6">
        <div className="max-w-[90%] mx-auto px-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e1e1e] text-gray-300 py-4 mt-auto">
        <div className="max-w-[90%] mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 RSVP. All rights reserved.</p>
          <div className="text-sm mt-2 md:mt-0">
            Contact:{" "}
            <a href="mailto:contact@doubtadda.com" className="underline">
              contact@rsvp.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
