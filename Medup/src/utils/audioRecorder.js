
//handle audio recording using MediaRecorder API
export const startAudioRecording = async (mediaRecorderRef, audioChunksRef, onStopCallback) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    // Stop recording and process the audio data
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      onStopCallback(blob); // Pass the blob back 
      stream.getTracks().forEach((track) => track.stop()); // Stop mic access
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();

    console.log('Recording started...');
  } catch (err) {
    alert('Microphone access denied or unsupported!');
    console.error(err);
  }
};
