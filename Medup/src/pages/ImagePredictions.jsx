import React, { useEffect, useState } from 'react';
import { getDoctorImagePredictions } from '../api/doctorApi';
import { useDoctorStore } from '../store/useDoctorStore';  // ✅ Import Zustand store

function ImagePredictions() {
  const token = useDoctorStore((state) => state.token);  // ✅ Get token from global store
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagePredictions = async () => {
      console.log("🔑 JWT token being sent:", token);

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await getDoctorImagePredictions(token);
        setPredictions(response.predictions);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch image predictions');
      } finally {
        setLoading(false);
      }
    };

    fetchImagePredictions();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Image Predictions</h2>
      {predictions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={`http://127.0.0.1:5000/predict${prediction.image_url}`}
                alt={prediction.predicted_class}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {prediction.predicted_class}
                </h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Confidence:</span> {prediction.confidence}%
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Timestamp:</span> {prediction.timestamp}
                </p>
                <p className="text-sm text-gray-700 break-words">
                  <span className="font-medium">Blockchain Transaction ID:</span> {prediction.blockchain_tx_id}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm">No predictions found.</p>
      )}
    </div>
  );
  
}

export default ImagePredictions;
