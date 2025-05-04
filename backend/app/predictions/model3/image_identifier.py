import tensorflow as tf
from tensorflow.keras.applications.resnet import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np

# Constants
IMG_SIZE = (224, 224)
MODEL_PATH = 'app/predictions/model3/models/model.h5'

# Class labels
class_labels = {
    0: 'Brain Stroke MRI Scan',
    1: 'Brain Tumor MRI Scan',
    2: 'Brain Tumor X-Ray',
    3: 'Breast Cancer MRI Scan',
    4: 'Hip Implant CT Scan',
    5: 'Intracranial Hemorrhage CT Scan',
    6: 'Lung Cancer CT Scan',
    7: 'Lung Cancer MRI Scan',
    8: 'Pneumonia MRI Scan',
    9: 'Pneumonia X-Ray',
    10: 'Pulmonary Disorders X-Ray',
    11: 'Spinal Cord Disorder CT Scan',
    12: 'Spinal Cord Disorder MRI Scan',
    13: 'Tuberculosis MRI Scan'
}

# Load the model once
model = tf.keras.models.load_model(MODEL_PATH)

# Preprocess image from file path
def preprocess_inference_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize(IMG_SIZE)
    img_array = img_to_array(img)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Identify the image class
def identify_image(filepath):
    try:
        img_array = preprocess_inference_image(filepath)
        prediction = model.predict(img_array)
        class_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction)) * 100
        predicted_label = class_labels[class_index]
        return predicted_label, round(confidence, 2)
    except Exception as e:
        print(f"[Image Identify Error] {e}")
        return "Prediction failed", 0
