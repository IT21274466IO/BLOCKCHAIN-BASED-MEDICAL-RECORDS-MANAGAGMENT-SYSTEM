import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000'; 


//doctor signup
export const registerDoctor = async (data) => {
  const res = await axios.post(`${API_BASE}/doctors/register`, data);
  console.log("Backend responded:", res.data);
  return res.data;
};


//doctor login
export const loginDoctor = async (data) => {
  const res = await axios.post(`${API_BASE}/doctors/login`, data);
  return res.data;
};


// add doctor availability
export const addDoctorAvailability = async (available_dates, token) => {
  const res = await axios.post(
    `${API_BASE}/appointments/doctor-availability`,
    { available_dates },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};



// get doctor availability
export const getDoctorAvailability = async (token) => {
  const res = await axios.get(`${API_BASE}/appointments/my-availability`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



// get doctor's appointments
export const getDoctorAppointments = async (token) => {
  const res = await axios.get(`${API_BASE}/appointments/doctor-appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



//nlp audio prediction
export const predictNlpFromAudio = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${API_BASE}/predict/nlp-audio`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};



//nlp text prediction
export const predictNlpFromText = async (text, token) => {
  const res = await axios.post(
    `${API_BASE}/predict/nlp-text`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// get all NLP predictions for the logged-in doctor
export const getDoctorNlpPredictions = async (token) => {
  const res = await axios.get(`${API_BASE}/predict/nlp-predictions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


// Delete NLP prediction by blockchain_tx_id
export const deleteNlpPrediction = async (blockchainTxId, token) => {
  const res = await axios.delete(`${API_BASE}/predict/nlp-predictions/${blockchainTxId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// API call to update the NLP prediction
export const updateNlpPrediction = async (blockchain_tx_id, updatedResponse, token) => {
  try {
    const res = await axios.put(
      `${API_BASE}/predict/nlp-update`,
      { blockchain_tx_id, ...updatedResponse },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error updating NLP prediction:", err);
    throw err;
  }
};

// Get all Image predictions for the logged-in doctor
export const getDoctorImagePredictions = async (token) => {

  const res = await axios.get(`${API_BASE}/predict/image-predictions/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
