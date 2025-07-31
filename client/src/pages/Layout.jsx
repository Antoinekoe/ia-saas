import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false); // Mobile sidebar state
  const { user } = useUser(); // Get current user

  return user ? (
    // Authenticated user layout
    <div className="flex flex-col items-start justify-start h-screen">
      {/* Top navigation bar */}
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <img
          src={assets.logo}
          alt=""
          onClick={() => navigate("/")}
          className="cursor-pointer w-32 sm:w-44"
        />
        {/* Mobile menu toggle */}
        {sidebar ? (
          <X
            className="w-6 h-6 text-gray-600 z-10000 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 text-gray-600 sm:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      {/* Main content area with sidebar */}
      <div className="flex-1 w-full flex h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSideBar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    // Unauthenticated user - show sign-in page
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
