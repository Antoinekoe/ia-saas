// Sidebar navigation component with user profile and AI tools menu
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Icon,
  Images,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

// Navigation items configuration
const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate images", Icon: Images },
  { to: "/ai/remove-background", label: "Remove background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSideBar }) => {
  const { user } = useUser(); // Get current user
  const { signOut, openUserProfile } = useClerk(); // Clerk user actions

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 sm:relative w-full sm:w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center h-screen sm:h-full z-50 transition-transform duration-300 ease-in-out ${
          sidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="my-7 w-full px-4 sm:px-0">
          {/* User profile section */}
          <img
            src={user.imageUrl}
            className="w-13 rounded-full mx-auto"
            alt="User avatar"
          />
          <h1 className="mt-1 text-center">{user.fullName}</h1>

          {/* Navigation menu */}
          <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => setSideBar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                    isActive
                      ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                      : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-white " : ""}`}
                    />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom user profile and logout section */}
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div
            onClick={openUserProfile}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img src={user.imageUrl} className="w-8 rounded-full" alt="" />
            <div>
              <h1 className="text-sm font-medium">{user.fullName}</h1>
              <p className="text-xs text-gray-500">
                <Protect plan="premium" fallback="Free">
                  Premium{" "}
                </Protect>
                Plan
              </p>
            </div>
          </div>
          <LogOut
            onClick={signOut}
            className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
