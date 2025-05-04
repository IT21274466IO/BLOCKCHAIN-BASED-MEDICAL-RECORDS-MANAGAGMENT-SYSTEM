import pickle
import os
import speech_recognition as sr

# Load models
MODEL_DIR = "app/predictions/model4/models"

def load_all_models():
    return [
        pickle.load(open(os.path.join(MODEL_DIR, f"nlp_model{i}.dat"), "rb"))
        for i in range(1, 6)
    ]

model1, model2, model3, model4, model5 = load_all_models()

def predict_from_text(text):
    return {
        "Symptoms": model1.predict([text])[0],
        "Diagnosis": model2.predict([text])[0],
        "Medicines": model3.predict([text])[0],
        "Treatment": model4.predict([text])[0],
        "Notes": model5.predict([text])[0]
    }

def convert_audio_to_text(wav_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_path) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio)
    except:
        return None
