import React, { useState } from "react";
import { addDoctorAvailability } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function AvailabilityForm() {
  const token = useDoctorStore((state) => state.token);
  const [selectedDates, setSelectedDates] = useState([]);

  //date selection handler
  const handleDateSelect = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    if (!selectedDates.includes(dateStr)) {
      setSelectedDates([...selectedDates, dateStr]);
    } else {
      toast.info("Date already selected");
    }
  };

  //date deletion handler
  const handleDelete = (dateStr) => {
    setSelectedDates(selectedDates.filter((d) => d !== dateStr));
  };

  //form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDates.length)
      return toast.error("Please select at least one date");

    try {
      await addDoctorAvailability(selectedDates, token);
      toast.success("Availability updated successfully!");
      setSelectedDates([]);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error updating availability ");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Doctor Availability
      </h2>
      <p className="text-sm text-gray-500 mb-4">Select available dates:</p>
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <DatePicker
          selected={null}
          onChange={handleDateSelect}
          placeholderText="    Click to select a date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <CalendarDaysIcon className="absolute top-3 w-5 h-5 text-gray-600 ml-2" />

        {selectedDates.length > 0 && (
          <ul className="mt-4 space-y-2">
            {selectedDates.map((date, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-green-50 border border-green-300 rounded px-3 py-1"
              >
                <span>{date}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(date)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition ml-5"
        >
          Save Availability
        </button>
      </form>
    </div>
  );
}
