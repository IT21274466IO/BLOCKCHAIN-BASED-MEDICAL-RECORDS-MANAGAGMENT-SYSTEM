import React, { useRef, useState, useEffect } from "react";
import { useDoctorStore } from "../store/useDoctorStore";
import {
  predictNlpFromAudio,
  predictNlpFromText,
  updateNlpPrediction,
} from "../api/doctorApi";
import WaveSurfer from "wavesurfer.js";
import { startAudioRecording } from "../utils/audioRecorder";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Conversation() {
  const token = useDoctorStore((state) => state.token);
  const [response, setResponse] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);
  const [textInput, setTextInput] = useState("");

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log("AI Response:", response);
    if (response && response.Symptoms) {
      // Update each state variable based on the response values
      setSymptoms(response.Symptoms || "");
      setDiagnosis(response.Diagnosis || "");
      setMedicines(response.Medicines || "");
      setTreatment(response.Treatment || "");
      setNotes(response.Notes || "");
    }
  }, [response]); // Trigger this whenever the 'response' changes
   
  

  const renderWaveform = (urlOrBlob) => {
    if (waveSurfer.current) waveSurfer.current.destroy();

    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#d1fae5",
      progressColor: "#10b981",
      height: 80,
      barWidth: 2,
    });

    if (typeof urlOrBlob === "string") {
      waveSurfer.current.load(urlOrBlob);
    } else {
      waveSurfer.current.loadBlob(urlOrBlob);
    }
  };

  //stop audio recording
  const handleStop = (blob) => {
    const fixedBlob = new Blob([blob], { type: "audio/webm" }); // or "audio/wav" based on MediaRecorder
    setAudioBlob(fixedBlob);
    renderWaveform(fixedBlob);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  //handle audio upload and prediction
  const handleUpload = async () => {
    if (!audioBlob) return alert("No audio to analyze");
    try {
      const result = await predictNlpFromAudio(audioBlob, token);
      setTranscript(result.transcribed_text);
      setResponse(result);
    } catch (err) {
      alert(err?.response?.data?.error || "Prediction failed");
    }
  };

  //handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioBlob(file);
      setResponse(null);
      setTranscript("");
      renderWaveform(file);
    }
  };

  //handle audio preview
  const handlePreview = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
    }

    if (audioElementRef.current && audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioElementRef.current.src = audioURL;

      // Revoke URL after audio is loaded to prevent memory leaks
      audioElementRef.current.onloadeddata = () => {
        URL.revokeObjectURL(audioURL);
      };

      audioElementRef.current.play().catch((err) => {
        console.error(
          "Audio playback failed. Possibly due to autoplay restrictions.",
          err
        );
      });
    }
  };

  //handle text prediction
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    try {
      const result = await predictNlpFromText(textInput, token);
      console.log("Backend response:", result);
      setResponse(result);
    } catch (err) {
      alert(err?.response?.data?.error || "Text prediction failed");
    }
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      if (finalTranscript) {
        setTextInput((prev) => prev + finalTranscript);
      }
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    recognitionRef.current.start();
    setListening(true);

    startAudioRecording(mediaRecorderRef, audioChunksRef, handleStop);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

// Function to handle saving the AI response
const handleSaveResponse = async () => {
  const updatedResponse = {
    blockchain_tx_id: response.blockchain_tx_id, // Correctly pass blockchain_tx_id
    updated_results: {
      Symptoms: symptoms, // Use the updated state values
      Diagnosis: diagnosis,
      Medicines: medicines,
      Treatment: treatment,
      Notes: notes,
    },
  };

  try {
    // Send the PUT request to the backend API to update the response
    const result = await updateNlpPrediction(response.blockchain_tx_id, updatedResponse, token);
    setResponse(result); // Set the updated response
    alert("Response updated successfully!");
  } catch (err) {
    alert(err?.response?.data?.error || "Failed to save updated response");
  }
};

  

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800">
        Doctor Conversation Assistant
      </h2>

      <form onSubmit={handleTextSubmit} className="flex gap-4 items-center">
        <textarea
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter symptoms or query..."
          className="flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#087f5b] text-white rounded-full hover:bg-green-800 transition"
        >
          Text Analyze
        </button>
      </form>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-4">
          {!listening ? (
            <button
              onClick={startListening}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              🎙️ Live Transcribe
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
            >
              🛑 Stop Transcribe
            </button>
          )}

          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition"
          >
            Show Audio
          </button>
          <button
            onClick={handlePreview}
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700-700 transition"
          >
            Play Audio
          </button>
          <label className="cursor-pointer px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded hover:bg-gray-300 transition">
            Upload Audio
            <input
              type="file"
              accept="audio/*"
              hidden
              onChange={handleFileChange}
            />
          </label>
        </div>

        <button
          onClick={handleUpload}
          className="px-8 py-2 bg-[#087f5b] text-white hover:bg-green-800 transition rounded-full"
        >
          Voice Analyze
        </button>
      </div>

      {audioBlob && (
        <>
          <h3 className="text-md font-medium text-gray-700 mt-4">
            Audio Preview
          </h3>
          <div
            ref={waveformRef}
            className="w-full bg-gray-50 rounded border py-2 px-2"
          />
          <audio ref={audioElementRef} controls className="mt-2 w-full" />
        </>
      )}

      {transcript && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Transcription:</strong> {transcript}
        </div>
      )}

{response && (
  <div className="bg-green-50 border border-green-300 rounded p-4 mt-4">
    <h3 className="text-lg font-semibold text-green-700 mb-2">
      AI Response (Editable)
    </h3>

    {/* Symptoms Textarea */}
    <div className="mb-2">
      <label className="block text-sm font-medium text-green-800 mb-1">
        Symptoms
      </label>
      <textarea
        value={symptoms} // State bound here
        onChange={(e) => setSymptoms(e.target.value)} // Update state on change
        className="w-full mt-2 border p-2 rounded-md"
      />
    </div>

    {/* Diagnosis Textarea */}
    <div className="mb-2">
      <label className="block text-sm font-medium text-green-800 mb-1">
        Diagnosis
      </label>
      <textarea
        value={diagnosis} // State bound here
        onChange={(e) => setDiagnosis(e.target.value)} // Update state on change
        className="w-full mt-2 border p-2 rounded-md"
      />
    </div>

    {/* Medicines Textarea */}
    <div className="mb-2">
      <label className="block text-sm font-medium text-green-800 mb-1">
        Medicines
      </label>
      <textarea
        value={medicines} // State bound here
        onChange={(e) => setMedicines(e.target.value)} // Update state on change
        className="w-full mt-2 border p-2 rounded-md"
      />
    </div>

    {/* Treatment Textarea */}
    <div className="mb-2">
      <label className="block text-sm font-medium text-green-800 mb-1">
        Treatment
      </label>
      <textarea
        value={treatment} // State bound here
        onChange={(e) => setTreatment(e.target.value)} // Update state on change
        className="w-full mt-2 border p-2 rounded-md"
      />
    </div>

    {/* Notes Textarea */}
    <div className="mb-2">
      <label className="block text-sm font-medium text-green-800 mb-1">
        Notes
      </label>
      <textarea
        value={notes} // State bound here
        onChange={(e) => setNotes(e.target.value)} // Update state on change
        className="w-full mt-2 border p-2 rounded-md"
      />
    </div>

    <button
      onClick={handleSaveResponse}
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
    >
      Save Changes
    </button>
  </div>
)}


    </div>
  );
}
