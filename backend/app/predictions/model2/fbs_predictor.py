import tensorflow as tf
import cv2
import numpy as np
import os

# Load the model
MODEL_PATH = "app/predictions/model2/models/fbs_classifier_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Preprocess the input image
def preprocess_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not read the image.")
    image = cv2.resize(image, (128, 128))
    image = image.astype("float32") / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# Predict the FBS level
def predict_fbs(image_path):
    input_data = preprocess_image(image_path)
    prediction_output = model.predict(input_data)
    fbs_value = float(prediction_output[0][0]) * 400  # Scaling adjustment
    if fbs_value <= 100:
        label = "Low"
    elif fbs_value <= 125:
        label = "Medium"
    else:
        label = "High"
    return {"fbs_value": round(fbs_value, 2), "prediction": label}
