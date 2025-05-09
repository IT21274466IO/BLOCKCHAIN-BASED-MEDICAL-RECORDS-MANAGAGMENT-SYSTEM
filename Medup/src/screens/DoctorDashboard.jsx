import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useDoctorStore } from "../store/useDoctorStore";

const navItems = [
  { name: "Home", path: "/doctor/dashboard", icon: HomeIcon },
  {
    name: "Availability",
    path: "/doctor/dashboard/availability",
    icon: CalendarDaysIcon,
  },
  {
    name: "Appointments",
    path: "/doctor/dashboard/appointments",
    icon: CalendarIcon,
  },
  {
    name: "Medical Records",
    path: "/doctor/dashboard/medical-records",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Conversation",
    path: "/doctor/dashboard/conversation",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Image Predictions",
    path: "/doctor/dashboard/images-predictions",
    icon: PhotoIcon,
  },
  { name: "Profile", path: "/doctor/dashboard/profile", icon: UserCircleIcon },
  { name: "Settings", path: "/doctor/dashboard/settings", icon: Cog6ToothIcon },
];

export default function DoctorLayout() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = useDoctorStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear Zustand + localStorage
    setShowLogoutModal(false);
    navigate("/"); // redirect to homepage
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-5 text-2xl font-bold text-[#14919B]border-b">
          MedUp
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-[#14919B] font-medium"
                    : "text-gray-700 hover:text-[#14919B] hover:bg-green-50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full px-4 py-2 bg-[#14919B] text-white rounded-lg hover:bg-green-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 mb-16">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#14919B] text-white rounded-md hover:bg-green-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
