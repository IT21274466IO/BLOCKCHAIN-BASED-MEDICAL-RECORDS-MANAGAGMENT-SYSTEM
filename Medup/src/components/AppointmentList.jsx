import React, { useEffect, useState } from "react";
import { getDoctorAppointments } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppointmentList() {
  const token = useDoctorStore((state) => state.token);
  const [appointments, setAppointments] = useState([]);

  //fetch appointments
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
        toast.error("Failed to load appointments");
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
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Scheduled Appointments
      </h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appt, idx) => (
            <li
              key={idx}
              className={`border rounded-md p-4 transition shadow-sm hover:shadow ${
                appt.status === "complete"
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p>
                    <span className="font-medium">Patient Email:</span>{" "}
                    {appt.patient_email}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(appt.appointment_date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(appt.created_at).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={
                        appt.status === "complete"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => toggleStatus(idx)}
                  className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                >
                  Mark {appt.status === "complete" ? "Upcoming" : "Complete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
