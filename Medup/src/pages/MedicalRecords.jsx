import React, { useEffect, useState } from "react";
import { getDoctorNlpPredictions, deleteNlpPrediction } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import {
    TrashIcon,
  } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MedicalRecords() {
  const token = useDoctorStore((state) => state.token);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getDoctorNlpPredictions(token);
        setRecords(data.predictions || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [token]);

  // Handle expanding/collapsing input text
  const [expandedInput, setExpandedInput] = useState({});

  const toggleInputExpansion = (idx) => {
    setExpandedInput((prevState) => ({
      ...prevState,
      [idx]: !prevState[idx],
    }));
  };

  // Function to truncate text into words
  const truncateInput = (input) => {
    const words = input.split(" ");
    return words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");
  };

  // Delete record and update UI
  const handleDelete = async () => {
    try {
      const data = await deleteNlpPrediction(selectedRecordId, token);
      setRecords(records.filter((record) => record.blockchain_tx_id !== selectedRecordId));  // Remove record from the UI
      setShowModal(false);  // Close the modal after deletion

      // Show success toast message
            toast.warning("Record deleted successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
    } catch (err) {
      setShowModal(false); // Close the modal if the deletion failed
      toast.error(
              err?.response?.data?.error || "Failed to save the record",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
    }
  };

  // Function to open modal
  const openDeleteModal = (blockchainTxId) => {
    setSelectedRecordId(blockchainTxId);
    setShowModal(true);
  };

  // Function to close modal without deleting
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Medical Records</h2>

      {loading ? (
        <p className="text-gray-600">Loading Records...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500">No medical records found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {records.map((record, idx) => (
            <div
              key={idx}
              className="bg-[#defcf6] border border-gray-200 rounded-lg shadow p-4 space-y-2"
            >
              <div className="text-sm text-gray-500">{new Date(record.timestamp).toLocaleString()}</div>
              {/* <p><strong>Input Type:</strong> {record.input_type}</p> */}
              {/* <p><strong>Input:</strong> <span className="text-gray-700 italic">{record.input || record.transcribed_text}</span></p> */}

              <div className="mt-2">
                <p>
                  <strong>Conversation:</strong>
                  <span className="text-gray-700 italic">
                    {expandedInput[idx] ? (
                      <div>
                        {record.input || record.transcribed_text}
                        <button
                          onClick={() => toggleInputExpansion(idx)}
                          className="text-blue-600 text-sm mt-2 block"
                        >
                          Show Less
                        </button>
                      </div>
                    ) : (
                      <div>
                        {truncateInput(record.input || record.transcribed_text)}
                        <button
                          onClick={() => toggleInputExpansion(idx)}
                          className="text-blue-600 text-sm mt-2 block"
                        >
                          Show More
                        </button>
                      </div>
                    )}
                  </span>
                </p>
              </div>

              <div className="mt-2">
                <p><strong>Symptoms:</strong> {record.results.Symptoms}</p>
                <p><strong>Diagnosis:</strong> {record.results.Diagnosis}</p>
                <p><strong>Medicines:</strong> {record.results.Medicines}</p>
                <p><strong>Treatment:</strong> {record.results.Treatment}</p>
                <p><strong>Notes:</strong> {record.results.Notes}</p>
              </div>

              <div className="text-xs text-[#14919B] mt-2">
                Blockchain TX: {record.blockchain_tx_id}
              </div>

              <button
                onClick={() => openDeleteModal(record.blockchain_tx_id)}
                className="text-red-500 hover:text-red-900"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this Record?</h3>
            <div className="flex justify-end gap-4">
            <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
