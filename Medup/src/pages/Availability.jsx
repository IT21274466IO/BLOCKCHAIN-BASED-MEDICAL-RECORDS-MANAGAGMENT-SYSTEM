import React from "react";
import AvailabilityForm from "../components/AvailabilityForm";
import ViewAvailability from "../components/ViewAvailability";
import { ToastContainer } from "react-toastify";

export default function Availability() {
  return (
    <div className="space-y-8">
      <AvailabilityForm />
      <ViewAvailability />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
