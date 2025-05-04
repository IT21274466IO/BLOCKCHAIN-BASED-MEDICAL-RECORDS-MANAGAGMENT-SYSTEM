import React, { useEffect, useState } from "react";
import { getDoctorAvailability } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import { toast } from "react-toastify";

export default function ViewAvailability() {
  const token = useDoctorStore((state) => state.token);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await getDoctorAvailability(token);
        setDates(res.available_dates);
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to load availability"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [token]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        My Available Dates
      </h2>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : dates.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven’t added any availability yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {dates.map((date, idx) => (
            <li
              key={idx}
              className="bg-green-50 text-green-700 px-4 py-2 rounded border border-green-200"
            >
              {date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
