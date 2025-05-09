import React, { useEffect, useState } from "react";
import { getDoctorNlpPredictions, deleteNlpPrediction } from "../api/doctorApi";
import { useDoctorStore } from "../store/useDoctorStore";
import { TrashIcon } from "@heroicons/react/24/outline";
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
      console.log(data);
      setRecords(
        records.filter((record) => record.blockchain_tx_id !== selectedRecordId)
      ); // Remove record from the UI
      setShowModal(false); // Close the modal after deletion

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
      toast.error(err?.response?.data?.error || "Failed to save the record", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Medical Records
      </h2>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading Records...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500 text-lg">No medical records found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {records.map((record, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <div className="text-xs text-gray-500 mb-1">
                {new Date(record.timestamp).toLocaleString()}
              </div>

              <div className="mb-3">
                <p className="font-semibold text-gray-800">Conversation:</p>
                <div className="text-gray-700 italic text-sm mt-1">
                  {expandedInput[idx] ? (
                    <>
                      {record.input || record.transcribed_text}
                      <button
                        onClick={() => toggleInputExpansion(idx)}
                        className="text-blue-600 text-xs underline ml-2"
                      >
                        Show Less
                      </button>
                    </>
                  ) : (
                    <>
                      {truncateInput(record.input || record.transcribed_text)}
                      <button
                        onClick={() => toggleInputExpansion(idx)}
                        className="text-blue-600 text-xs underline ml-2"
                      >
                        Show More
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-800">
                <p>
                  <strong>Symptoms:</strong> {record.results.Symptoms}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {record.results.Diagnosis}
                </p>
                <p>
                  <strong>Medicines:</strong> {record.results.Medicines}
                </p>
                <p>
                  <strong>Treatment:</strong> {record.results.Treatment}
                </p>
                <p>
                  <strong>Notes:</strong> {record.results.Notes}
                </p>
              </div>

              <div className="text-xs text-cyan-700 mt-3 break-all">
                Blockchain TX: {record.blockchain_tx_id}
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => openDeleteModal(record.blockchain_tx_id)}
                  className="text-red-600 hover:text-red-800 flex items-center justify-end gap-1 text-sm"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this record?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
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
