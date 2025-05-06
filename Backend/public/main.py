import json , time
from flask import Flask, jsonify, request, make_response , send_from_directory

from flask_cors import CORS
import requests
import shutil
import cv2
import collections,numpy
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img , img_to_array
from keras.models import load_model
from tensorflow.keras.preprocessing import image
import tensorflow_hub as hub
import os
import pickle
from tensorflow.keras.utils import custom_object_scope
import math
import speech_recognition as sr
    
def sound_convert(file):
    print(file.split(".")[0] + ".mp3 ")
    commandwav = "ffmpeg -i " + file.split(".")[0] + ".mp3 " + file.split(".")[0] + ".wav"
    os.system(commandwav)
    
with open('model/nlp_model1.dat' , 'rb') as f:
    model1 = pickle.load(f)
    
with open('model/nlp_model2.dat' , 'rb') as f:
    model2 = pickle.load(f)
    
with open('model/nlp_model3.dat' , 'rb') as f:
    model3 = pickle.load(f)
    
with open('model/nlp_model4.dat' , 'rb') as f:
    model4 = pickle.load(f)
    
with open('model/nlp_model5.dat' , 'rb') as f:
    model5 = pickle.load(f)
    
image_model = tf.keras.models.load_model(
       ('model/image_model.h5'),
       custom_objects={'KerasLayer':hub.KerasLayer}
)

def wav_to_text(wav_file_path):
    recognizer = sr.Recognizer()
    
    with sr.AudioFile(wav_file_path) as source:
        audio = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio)
        print(f"Converted text: {text}")
        return text
    except sr.UnknownValueError:
        print("value error")
    except sr.RequestError as e:
        print(f"error; {e}")
    
def image_find(filename):
    classes = ['Brain Stroke Mri', 'Brain Tumors Mri', 'Brain Tumors Xray','Breast Cancer Mri', 'Chest And Respiratory Lung Cancer Ct','Chest And Respiratory Lung Cancer Mri','Chest And Respiratory Pneumonia Mri','Chest And Respiratory Pneumonia X-Ray','Chest And Respiratory Pulmonary Disorders X-Ray','Chest And Respiratory Tuberculosis (Tb)','Chest And Respiratory Tuberculosis (Tb) Mri', 'Hip Implant Ct','Intracranial Hemorrhage Ct', 'Spinal Code Disorder Ct','Spinal Code Disorder Mri']
    img_ = image.load_img(filename, target_size=(224, 224))
    img_array = image.img_to_array(img_)
    img_processed = np.expand_dims(img_array, axis=0)
    img_processed /= 255.
    
    model = image_model
    prediction = model.predict(img_processed)
    prob = prediction

    index = np.argmax(prediction)
    confidence = prob[0][index]
    
    return str(classes[index]).title(),confidence*100

UPLOAD_FOLDER = "upload/"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route("/sound", methods=["POST"])
def upload_sound():
    try:
        
        request_data = request.get_json()

        audio_url = str("upload/"+(request_data['url'].split(".")[0]))

        print(audio_url)

        commandwav = "ffmpeg -i "+audio_url+".mp3 "+audio_url+".wav"
        os.system(commandwav)
        
        text_data = wav_to_text(audio_url+".wav")
        
        res1=model1.predict([text_data])[0]
        res2=model2.predict([text_data])[0]
        res3=model3.predict([text_data])[0]
        res4=model4.predict([text_data])[0]
        res5=model5.predict([text_data])[0]

        json_dump = json.dumps({"Symptoms":str(res1),"Diagnosis":str(res2),"Medicines":str(res3),"Treatment":str(res4),"Notes":str(res5),"success":"true"})

        return json_dump
        
    except:
        json_dump = json.dumps({"success":"false"})

        return json_dump

@app.route("/text", methods=["POST"])
def text():
    try:
        
        request_data = request.get_json()
        
        text_data = request_data['text']
        
        res1=model1.predict([text_data])[0]
        res2=model2.predict([text_data])[0]
        res3=model3.predict([text_data])[0]
        res4=model4.predict([text_data])[0]
        res5=model5.predict([text_data])[0]

        json_dump = json.dumps({"Symptoms":str(res1),"Diagnosis":str(res2),"Medicines":str(res3),"Treatment":str(res4),"Notes":str(res5),"success":"true"})

        return json_dump
        
    except:
        json_dump = json.dumps({"success":"false"})

        return json_dump
    
@app.route('/image_upload', methods=['POST'])
def image_upload():
    method = request.form.get("method")
    print(method)
    if "file" not in request.files:
        return jsonify({"error": "No photo part"}), 400

    photo = request.files["file"]
    if photo.filename == "":
        return jsonify({"error": "No selected photo"}), 400

    photo_path = os.path.join(UPLOAD_FOLDER, photo.filename)

    try:
        photo.save(photo_path)
        
        res,con=image_find(photo_path)
        
        return (
            jsonify(
                {"message": "Photo successfully uploaded", "photo_path": photo_path.replace("temp/", ""),"result":res,"con":con}
            ),
            200,
        )
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5555)
    