import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
import pandas as pd

# Constants
IMG_SIZE = (224, 224)
MODEL_PATH = "app/predictions/model1/models/"

print(MODEL_PATH)


# Load models
skin_model = load_model(os.path.join(MODEL_PATH, "skin_disease_model.h5"))
eye_model = load_model(os.path.join(MODEL_PATH, "eye_disease_model.h5"))

# Load doctor recommendations
doctor_df = pd.read_csv("app/predictions/model1/doctor_recommendations.csv")

def get_doctor_recommendation(disease):
    recommendation = doctor_df[doctor_df["Disease"] == disease]
    if not recommendation.empty:
        return recommendation.iloc[0].to_dict()
    return None

def preprocess_inference_image(image_path):
    img = load_img(image_path, target_size=IMG_SIZE)
    img_array = img_to_array(img)
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_image(image_path, model_type):
    if model_type == "skin":
        model = skin_model
        labels = ["Acne", "Actinic Keratosis", "Basal Cell Carcinoma", "Eczema", "Rosacea"]
    elif model_type == "eye":
        model = eye_model
        labels = ["Cataract", "Normal"]
    else:
        return "Invalid model type", 0, None

    img_array = preprocess_inference_image(image_path)
    prediction = model.predict(img_array)
    class_idx = np.argmax(prediction)

    if class_idx >= len(labels):
        return "Error: Invalid class index", 0, None

    predicted_label = labels[class_idx]
    confidence = float(np.max(prediction) * 100)
    doctor_info = get_doctor_recommendation(predicted_label)

    return predicted_label, confidence, doctor_info
