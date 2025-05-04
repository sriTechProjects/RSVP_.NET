import React, { useState } from "react";
import EventsCard from "../../Components/user_components/EventsCard";
import wallpaper1 from "../../assets/wallpapers/wallpaper_1.jpg";
import wallpaper2 from "../../assets/wallpapers/wallpaper_2.jpg";
import wallpaper3 from "../../assets/wallpapers/wallpaper_3.jpg";
import wallpaper4 from "../../assets/wallpapers/wallpaper_4.jpg";
import wallpaper5 from "../../assets/wallpapers/wallpaper_5.jpg";
import UserEventDetails from "../../Components/user_components/UserEventDetails";
import EventRegisterForm from "../../Components/user_components/EventRegisterForm";

const UserHome = () => {
  const events = [
    {
      id: 1,
      title: "Nirmaan 3.0",
      description:
        "A 24-hour hackathon inviting students to solve real-world problems using tech.",
      venue: "D101",
      date: "12/04/2025",
      time: "16:00 - 18:00",
      category: "Hackathon",
      isPaid: false,
      eligibility: "SY,TY",
    },
    {
      id: 2,
      title: "Tech Talks: AI & Future",
      description:
        "Expert session on Artificial Intelligence trends and industry use-cases.",
      venue: "Seminar Hall B",
      date: "15/04/2025",
      time: "10:00 - 12:00",
      category: "Guest Lecture",
      isPaid: false,
      eligibility: "SY,TY",
    },
    {
      id: 3,
      title: "Circuit Craze",
      description:
        "Electronics competition to design the most efficient circuit in 60 minutes.",
      venue: "Lab C204",
      date: "17/04/2025",
      time: "14:00 - 16:00",
      category: "Technical Competition",
      isPaid: false,
      eligibility: "SY,TY",
    },
    {
      id: 4,
      title: "Code Sprint",
      description:
        "Competitive coding event for individuals and teams with exciting prizes.",
      venue: "Online (HackerRank)",
      date: "20/04/2025",
      time: "19:00 - 21:00",
      category: "Coding Contest",
      isPaid: true,
      amount: 30,
      eligibility: "SY,TY",
    },
    {
      id: 5,
      title: "Robowar",
      description:
        "Build and battle your bots in this crowd-favorite robotics event.",
      venue: "Main Ground",
      date: "25/04/2025",
      time: "11:00 - 15:00",
      category: "Robotics",
      isPaid: true,
      amount: 100,
      eligibility: "SY,TY",
    },
    {
      id: 6,
      title: "Startup Pitch Fest",
      description:
        "Students pitch innovative startup ideas to a panel of judges and investors.",
      venue: "Auditorium",
      date: "28/04/2025",
      time: "13:00 - 16:00",
      category: "Entrepreneurship",
      isPaid: false,
      eligibility: "SY,TY",
    },
    {
      id: 7,
      title: "AutoCAD Design Challenge",
      description:
        "Put your design skills to the test with real-world engineering problems.",
      venue: "CAD Lab D210",
      date: "30/04/2025",
      time: "09:30 - 12:30",
      category: "Design",
      isPaid: false,
      eligibility: "SY,TY",
    },
    {
      id: 8,
      title: "LAN Gaming Tournament",
      description:
        "FIFA, CS:GO, Valorant — show your gaming skills on LAN with peers.",
      venue: "Block B - Lab 3",
      date: "02/05/2025",
      time: "17:00 - 21:00",
      category: "E-Sports",
      isPaid: true,
      amount: 50,
      eligibility: "SY,TY",
    },
    {
      id: 9,
      title: "Cultural Night",
      description:
        "An evening filled with music, dance, drama, and laughter by students.",
      venue: "Open Air Theater",
      date: "04/05/2025",
      time: "18:30 - 21:30",
      category: "Cultural",
      isPaid: true,
      amount: 75,
      eligibility: "SY,TY",
    },
    {
      id: 10,
      title: "Greenathon",
      description:
        "Tree plantation drive followed by a sustainability awareness workshop.",
      venue: "Campus Lawn",
      date: "06/05/2025",
      time: "07:30 - 10:00",
      category: "Social Cause",
      isPaid: false,
      eligibility: "SY,TY",
    },
  ];

  const wallpapers = {
    1: wallpaper1,
    2: wallpaper2,
    3: wallpaper3,
    4: wallpaper4,
    5: wallpaper5,
  };
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <span>
          <h1 className="text-lg font-semibold text-[#333]">
            All Events ({events.length})
          </h1>
        </span>
        <div className="slider-container p-2 flex gap-6 flex-wrap overflow-y-auto scrollbar-hide">
          {events.map((event) => (
            <EventsCard
              key={event.id}
              imageUrl={wallpapers[getRandomNumber()]}
              event={event}
              setOpenDetails={setOpenDetails}
              setOpenRegister={setOpenRegister}
              setSelectedEvent={setSelectedEvent}
            />
          ))}
        </div>
      </div>

      {openDetails && (
        <UserEventDetails
          event={selectedEvent}
          onClose={() => setOpenDetails(false)}
          imageUrl={wallpapers[getRandomNumber()]}
          onClick={() => setOpenRegister(true)}
        />
      )}

      {openRegister && (
        <EventRegisterForm
          onClose={() => {
            setOpenRegister(false);
          }}
        />
      )}
    </>
  );
};

export default UserHome;
