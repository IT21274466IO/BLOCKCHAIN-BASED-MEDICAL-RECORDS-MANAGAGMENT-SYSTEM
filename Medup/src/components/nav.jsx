import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useDoctorStore } from "../store/useDoctorStore";
import Modal from "./Model";
import { registerDoctor, loginDoctor } from "../api/doctorApi";
import { toast } from "react-toastify";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  //logic for login
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const credentials = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await loginDoctor(credentials);
      useDoctorStore.getState().login({ email: credentials.email }, res.token);
      toast.success("Login successful");
      setLoginOpen(false);
      navigate("/doctor/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  //logic for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
      specialization: form.specialization.value,
      hospital: form.hospital.value,
      mobile: form.mobile.value,
      profile_image: "",
    };

    try {
      const res = await registerDoctor(formData);
      useDoctorStore.getState().login({ email: formData.email }, res.token);
      toast.success("Signup successful");
      setSignupOpen(false);
      navigate("/doctor/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] bg-white/70 backdrop-blur-md border border-gray-50 rounded-full z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-2xl font-semibold text-[#087f5b]">
            Med<span className="text-gray-800">Up</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className={`text-sm transition-colors ${
                isActive("/")
                  ? "text-[#0ca678] font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Home
            </a>
            <a
              href="#contact"
              className={`text-sm transition-colors ${
                isActive("/contact")
                  ? "text-[#0ca678] font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Contact Us
            </a>
            <button
              onClick={() => setLoginOpen(true)}
              className="text-sm text-gray-700 hover:text-green-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-md px-2 py-1"
            >
              Login
            </button>
            <button
              onClick={() => setSignupOpen(true)}
              className="text-sm font-medium px-4 py-2 bg-[#0ca678] text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              Sign Up
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-md p-1"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 px-6 pb-4 pt-2 rounded-b-2xl shadow-inner space-y-2">
            <a
              href="#home"
              className="block text-gray-700 hover:text-green-600 text-sm"
            >
              Home
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-green-600 text-sm"
            >
              Contact Us
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                setLoginOpen(true);
              }}
              className="block text-left w-full text-gray-700 hover:text-green-600 text-sm"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setSignupOpen(true);
              }}
              className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        title="Login to MedUp"
      >
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isSignupOpen}
        onClose={() => setSignupOpen(false)}
        title="Create a MedUp Account"
      >
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            name="fullname"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="specialization"
            placeholder="Specialization"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="hospital"
            placeholder="Hospital"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="mobile"
            placeholder="Mobile"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
      </Modal>
    </>
  );
}
