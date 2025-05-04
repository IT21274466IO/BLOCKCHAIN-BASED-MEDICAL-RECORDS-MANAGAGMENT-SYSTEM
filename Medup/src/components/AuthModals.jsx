import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Model";
import { useDoctorStore } from "../store/useDoctorStore";
import { loginDoctor, registerDoctor } from "../api/doctorApi";

export default function AuthModals() {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  // Logic for login
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
      setLoginOpen(false);
      toast.success("Login successful");
      navigate("/doctor/dashboard");
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed ");
    }
  };

  // Logic for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
      specialization: form.specialization?.value || "", // Optional
      hospital: form.hospital?.value || "",
      mobile: form.mobile?.value || "",
      profile_image: "",
    };

    try {
      console.log("Posting to backend...");
      const res = await registerDoctor(formData);
      console.log("Response:", res);
      useDoctorStore.getState().login({ email: formData.email }, res.token);
      toast.success("Signup successful");
      setSignupOpen(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err?.response?.data?.error || "Signup failed ");
    }
  };

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setLoginOpen(true)}
          className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
        >
          Login
        </button>
        <button
          onClick={() => setSignupOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </div>

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
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="specialization"
            placeholder="Specialization"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="hospital"
            placeholder="Hospital"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="mobile"
            placeholder="Mobile (optional)"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
