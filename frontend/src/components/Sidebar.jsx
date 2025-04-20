
import React from 'react';
// import VelocityLogo from "../assets/velocity_logo.png";
import { RxDashboard } from "react-icons/rx";
import { RiFileListFill } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { RiMoonClearLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <RxDashboard className="w-5 h-5" /> },
    { path: "/chart", label: "Chart", icon: <RiFileListFill className="w-5 h-5" /> },
    { path: "/transaction", label: "Transactions", icon: <LuClipboardList className="w-5 h-5" /> },
    { path: "/newtransaction", label: "New Transaction", icon: <BsGrid3X3GapFill className="w-5 h-5" /> },
    { path: "/category", label: "Categories", icon: <RiMoonClearLine className="w-5 h-5" /> },
  ];

  return (
    <div className="p-10 bg-black min-h-screen h-full">
      <div className="w-full flex flex-row items-center justify-center">
        <h1 className="text-white font-bold text-lg">FINANCE TRACKER</h1>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={index} to={item.path}>
              <div className={`flex flex-row gap-2 items-center ${
                isActive ? 'text-white font-bold' : 'text-gray-500 hover:text-white'
              }`}>
                {item.icon}
                <p className="text-xl">{item.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
