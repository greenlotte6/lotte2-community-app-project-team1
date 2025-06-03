import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaCalendarAlt,
  FaComments,
  FaClipboardList,
  FaProjectDiagram,
  FaHdd,
  FaCogs,
  FaUserFriends, // ← 추가
} from "react-icons/fa";

const ImageList = () => {
  const [currentImage, setCurrentImage] = useState(
    "/images/main/dashboard.PNG"
  );

  const features = [
    { icon: <FaTachometerAlt />, label: "Dashboard" },
    { icon: <FaFileAlt />, label: "Docs" },
    { icon: <FaCalendarAlt />, label: "Calendar" },
    { icon: <FaComments />, label: "Messenger" },
    { icon: <FaClipboardList />, label: "Board" },
    { icon: <FaProjectDiagram />, label: "Schedule" },
    { icon: <FaHdd />, label: "Drive" },
    { icon: <FaCogs />, label: "Settings" },
    { icon: <FaUserFriends />, label: "Employees" },
  ];

  const imageMap = {
    Dashboard: "/images/main/dashboard.PNG",
    Docs: "/images/main/docs.PNG",
    Calendar: "/images/main/calendar.PNG",
    Messenger: "/images/main/messenger.PNG",
    Board: "/images/main/board.PNG",
    Schedule: "/images/main/schedule.PNG",
    Drive: "/images/main/drive.PNG",
    Settings: "/images/main/settings.PNG",
    Employees: "/images/main/employees.PNG",
  };

  return (
    <section className="flex items-center justify-center py-20 px-4 bg-gray-50">
      <div className="relative w-3/5 pr-8">
        <img
          src={currentImage}
          alt="대시보드"
          className="w-full h-auto  rounded-xl shadow-xl scale-105"
        />
      </div>

      <div className="w-2/5 max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10">
        <h2 className="text-2xl font-semibold mb-2">Set up your Workspace</h2>
        <p className="text-gray-500 text-sm mb-4">
          Start with what you need, customize as you go.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {features.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-gray-100 cursor-pointer"
              onClick={() => setCurrentImage(imageMap[label])}
            >
              <div className="text-xl text-purple-500">{icon}</div>
              <span className="mt-2 text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageList;
