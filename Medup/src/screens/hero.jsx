import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import HeroImg from "../assets/hero.png";
import Modal from "../components/Model";
import { registerDoctor, loginDoctor } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import { toast } from "react-toastify";

export default function Hero() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();

  //login handler
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

  //signup handler
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
    <div>
      <Nav
        onLoginClick={() => setLoginOpen(true)}
        onSignupClick={() => setSignupOpen(true)}
      />

      <section className="bg-white min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-28 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight tracking-tighter">
              Empowering Doctors with{" "}
              <span className="text-[#087f5b]">Smarter Healthcare</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              MedUp helps you manage appointments, access patient records, and
              streamline clinical workflows — all in one secure platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setSignupOpen(true)}
                className="px-6 py-3 bg-[#0ca678] text-white font-medium rounded-xl hover:bg-green-700 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-xl hover:bg-green-50 transition"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <img
              src={HeroImg}
              alt="Doctor illustration"
              className=" min-w-3xl"
            />
          </div>
        </div>
      </section>

      {/* Login Modal */}
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

      {/* Sign Up Modal */}
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
    </div>
  );
}
