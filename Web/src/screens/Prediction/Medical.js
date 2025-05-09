import React, { useState, useEffect } from 'react';
import axios from "axios";
import LocalIP from "../LocalIP";
import Layout from '../../Layout';
import MicRecorder from "mic-recorder-to-mp3";
import { Card } from "antd";
import { Button } from '../../components/Form';
import { toast } from 'react-hot-toast';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

const Medical = () => {
    const [recEn, setRecEn] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [voice, setVoice] = useState("");
    const [textData, setTextData] = useState("");
    const [editablePrediction, setEditablePrediction] = useState("");  
    const [mediaStream, setMediaStream] = useState(null);

    // Function to count words in a string
    const countWords = (str) => {
        return str.trim().split(/\s+/).length;
    };

    const start = async () => {
        console.log("Starting recording...");
    
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Request microphone access here
            setMediaStream(stream);
    
            Mp3Recorder.start()
                .then(() => {
                    setIsRecording(true);
                    recognition.start();
                })
                .catch((e) => console.error("MicRecorder Error:", e));
    
            recognition.onresult = (event) => {
                let interimText = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        setTextData(prev => prev + " " + event.results[i][0].transcript);
                    } else {
                        interimText += event.results[i][0].transcript;
                    }
                }
            };
        } catch (error) {
            console.error("Error capturing audio:", error);
            toast.error("Please allow microphone access.");
        }
    };
    
    const stop = () => {
        console.log("Stopping recording...");
        recognition.stop();
        Mp3Recorder.stop()
            .getMp3()
            .then(async ([buffer, blob]) => {
                if (blob.size !== 0) {
                    console.log(blob);
                    const audioFile = new File([blob], "voice.mp3", { type: "audio/mp3" });
                    const data = new FormData();
                    data.append("file", audioFile);

                    axios.post(LocalIP + ":4000/main", data)
                        .then(async (res) => {
                            setRecEn(false);
                            const data_url = await res.data.filename;
                            const response = await axios.post(LocalIP + ":5555/sound", JSON.stringify({ url: data_url }), {
                                headers: { "Content-Type": "application/json" },
                            });

                            const formattedPrediction = 
                                `Symptoms: ${response.data.Symptoms}\nDiagnosis: ${response.data.Diagnosis}\nMedicines: ${response.data.Medicines}\nTreatment: ${response.data.Treatment}\nNotes: ${response.data.Notes}`;

                            setVoice(formattedPrediction);
                            setEditablePrediction(formattedPrediction);
                        });
                }
            })
            .catch((e) => console.log(e));

        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    const startFun = () => {
        setRecEn(true);
        start();
    };

    const textFun = async () => {
        // Check if text contains at least 30 words
        const wordCount = countWords(textData);

        if (wordCount < 30) {
            toast.error("Given input is invaild or insufficient. Please provide more information.");
            return;
        }

        if (textData.trim() !== "") {
            const response = await axios.post(LocalIP + ":5555/text", JSON.stringify({ text: textData }), {
                headers: { "Content-Type": "application/json" },
            });

            const formattedPrediction = 
                `Symptoms: ${response.data.Symptoms}\nDiagnosis: ${response.data.Diagnosis}\nMedicines: ${response.data.Medicines}\nTreatment: ${response.data.Treatment}\nNotes: ${response.data.Notes}`;

            setVoice(formattedPrediction);
            setEditablePrediction(formattedPrediction);
        } else {
            toast("Conversation Text Required");
        }
    };

    const saveEditedPrediction = async () => {
        if (editablePrediction.trim() !== "") {
            // await axios.post(LocalIP + ":5555/save", JSON.stringify({ text: editablePrediction }), {
            //     headers: { "Content-Type": "application/json" },
            // });
            // Clear inputs after saving
            setTextData(""); // Clear conversation input
            setEditablePrediction(""); // Clear editable prediction input

            toast.success("Record Saved Successfully!"); // Show success message
        } else {
            toast("Edited Prediction is empty!");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 mb-8">
                <h1 className="text-xl font-semibold">Consultation</h1>
                <Card style={{ textAlign: "center", backgroundColor: 'white' }}>
                    <div className="text-sm w-full">
                        <label className="text-black text-sm">Conversation</label>
                        <textarea
                            value={textData}
                            rows={5}
                            placeholder="Speak or type..."
                            onChange={(e) => setTextData(e.target.value)}
                            className="focus:border-subMain w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light"
                        />
                    </div>

                    {!recEn ? (
                        <Button label="🎤 Start Listening" onClick={startFun} />
                    ) : (
                        <Button label="⏹ Stop Listening" onClick={stop} />
                    )}

                    <div style={{ marginTop: "40px" }}>
                        <Button style={{ color: "black" }} label="Submit" onClick={textFun} />
                    </div>

                    {voice && (
                        <div className="mt-5">
                            <h2 className="font-bold text-lg mb-2">Editable Prediction</h2>
                            <textarea
                                value={editablePrediction}
                                rows={6}
                                onChange={(e) => setEditablePrediction(e.target.value)}
                                className="focus:border-subMain w-full bg-transparent text-sm p-4 border border-border rounded font-light"
                            />
                            <Button label="💾 Save Record" onClick={saveEditedPrediction} />
                        </div>
                    )}
                </Card>
            </div>
        </Layout>
    );
};

export default Medical;
