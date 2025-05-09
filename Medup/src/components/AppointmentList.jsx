import React, { useEffect, useState } from "react";
import { getDoctorAppointments } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import { toast } from "react-toastify";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";

export default function AppointmentList() {
  const token = useDoctorStore((state) => state.token);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getDoctorAppointments(token);
        const withStatus = res.appointments.map((appt) => ({
          ...appt,
          status: "upcoming",
        }));
        setAppointments(withStatus);
      } catch (err) {
        toast.error("Failed to load appointments" + err.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchAppointments();
  }, [token]);

  const toggleStatus = (idx) => {
    setAppointments((prev) =>
      prev.map((appt, i) =>
        i === idx
          ? {
              ...appt,
              status: appt.status === "complete" ? "upcoming" : "complete",
            }
          : appt
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Scheduled Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        <div className="relative pl-6">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />

          <ul className="space-y-6">
            {appointments.map((appt, idx) => (
              <li key={idx} className="relative flex items-start gap-4">
                {/* Status Icon */}
                <div className="relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs
                      ${
                        appt.status === "complete"
                          ? "bg-green-500"
                          : "bg-orange-400"
                      }`}
                  >
                    {appt.status === "complete" ? (
                      <BsCheckCircleFill className="text-white text-[11px]" />
                    ) : (
                      <BsClockFill className="text-white text-[11px]" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-lg px-5 py-4 w-full">
                  <div className="flex justify-between items-start flex-wrap">
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-medium text-gray-600">Patient:</span>{" "}
                        {appt.patient_email}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">Date:</span>{" "}
                        {new Date(appt.appointment_date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">Created:</span>{" "}
                        {new Date(appt.created_at).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">Status:</span>{" "}
                        <span
                          className={`font-semibold ${
                            appt.status === "complete"
                              ? "text-green-600"
                              : "text-orange-500"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => toggleStatus(idx)}
                      className="mt-2 md:mt-0 text-sm px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition"
                    >
                      Mark {appt.status === "complete" ? "Upcoming" : "Complete"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
