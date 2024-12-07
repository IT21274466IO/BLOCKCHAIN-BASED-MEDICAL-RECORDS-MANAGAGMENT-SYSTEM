# BLOCKCHAIN-BASED-MEDICAL-RECORDS-MANAGAGMENT-SYSTEM

# Research Group - 24_25J_280

#Enhancing medical record security, accessibility, and efficiency through blockchain technology. Combining advanced technologies to streamline healthcare operations.
![Screenshot (24)](https://github.com/user-attachments/assets/fc8140ce-4ec8-49f5-a036-7d7341c082ec)

# Introduction
Managing medical records securely and efficiently is a critical challenge for healthcare institutions. Current systems often face issues such as data breaches, inefficiencies in accessing records, and lack of interoperability, which hinder effective patient care. To address these challenges, our research focuses on developing a Blockchain-Based Medical Records Management System. Blockchain technology provides a decentralized and tamper-proof framework, ensuring secure storage and controlled sharing of medical data. This research aims to enhance the reliability of medical record systems while laying the foundation for scalable, secure, and future-ready healthcare solutions.

# Overview 
Our research focuses on developing a Blockchain-Based Medical Records Management System for Healthcare Institutions to enhance data security, privacy, and accessibility. The system integrates blockchain technology to securely store various types of medical records, including medical images , patient-doctor conversation reports,  and medical report data. Each team member contributes a distinct component and integrating  Machine learning models are utilized for image processing and predictive analysis, creating a comprehensive healthcare ecosystem. Each component addresses specific aspects of data storage and analysis, ensuring a robust and patient-centric solution. This approach enhances the security and accessibility of critical medical information. The project envisions a future where healthcare data is seamlessly managed with blockchain technology.

# Research Components

# Component 1 
Component Name : Blockchain-Integrated Medical Image Categorization and Secure Retrieval
- Classify medical images (e.g., MRI, X-rays) into predefined categories such as diseases or symptoms.
- Utilize blockchain for ensuring tamper-proof and decentralized storage, allowing secure access and retrieval of categorized images.
- Enable accurate predictions to assist healthcare professionals in making informed decisions.

**Key Features:** 
- Efficient Image Classification: MobileNetV2-based lightweight architecture for rapid and accurate image processing.
- Transfer Learning: Leverages pre-trained weights from ImageNet for better accuracy with limited training data.
- Secure Data Handling: Integration with blockchain to ensure secure and immutable storage of categorized medical images.
- User-Friendly Deployment: Provides an interactive function to predict and visualize the classification of uploaded medical images.

**Technologies Used:**  
- Machine Learning Frameworks:
    - TensorFlow/Keras: For model development, training, and evaluation.
    - TensorFlow Hub: Integration of pre-trained models like MobileNetV2.
- Deep Learning Techniques:
    - MobileNetV2 as a base for feature extraction.
    - Dense layers added for customized classification with 15 output categories.
- Deployment Tools:
    - Model saved as sample_model.h5 for future inference.
- Blockchain Integration:
    - For secure storage and retrieval of categorized images.

Model Name : Medical Image Identify and Prediction Model

Completed with 89.88% accuracy

# Component 2
Component Name : Voice-to-Text Transcription (NLP) and Conversational AI for Treatment Recommender
- This component leverages NLP and AI to transcribe and analyze patient-doctor conversations, generating treatment recommendations based on the extracted insights.

**Key Features:**  
- Voice-to-Text Conversion: Converts audio of patient-doctor conversations into text using speech-to-text technologies.
- NLP-Based Information Extraction: Extracts structured information from unstructured conversational text.
- Custom Treatment Recommendations: Provides treatment plans and medication suggestions based on the extracted information.
- Multi-Model Architecture:
    - Symptom Classification Model.
    - Diagnosis Prediction Model.
    - Medicines/Drugs Prediction Model
    - Treatment Plan Suggestion Model
- Output Display: Summarizes results into patient's extracted symptoms, diagnosis, medicines, treatment plans, and relevant notes for easy visualization.

**Technologies Used:**  
- **Speech-to-Text Frameworks:** Google Speech-to-Text API or Whisper by OpenAI for high-accuracy audio transcription.  
- **Natural Language Processing (NLP)** *SpaCy*: For named entity recognition (NER) and medical text processing, *NLTK*: For tokenization, stopword removal, and preprocessing, and *BERT* or *BioBERT*: Pre-trained models fine-tuned for medical conversation data.. 
- **Machine Learning Models:** *Multinomial Naive Bayes*: For symptom classification and diagnosis prediction and *Random Forest*: For medicines and treatment plan suggestions.
- **Frameworks and Libraries:** Python: Core programming language for development and Flask or FastAPI: To integrate the model with an interactive UI for deployment.

Model Name : Medical Conversation Analysis and Treatment Guidance Model

Model Completed with 67.71% accuracy 


# Component 3 
Component Name : AI-Driven Doctor Recommendation and Symptom Analysis

Model Name : Symptom Identification and Pre-Appointment Guidance Model

Completed



# Component 4 
Component Name : Risk Categorize Predictive Models For Medical System

Model Name : Risk Categorize Model 

Completed



# Overall System Architecture Diagram

![image](https://github.com/user-attachments/assets/44741a22-e6b7-4cfa-915b-d385cbc02aef)

# Contributers

Group Leader - IT20602000 - Indusara J.D.L - Component 1

Member 1 - IT21274466 - Burah T.I.O - Component 2

Member 2 - IT21349188 - Kokuhennadige.C.K - Component 3

Member 3 - IT21303548 - Gunasekara W.M.W.A.G.T.N.A - Component 4

# for more information, contact via :
Indusara J.D.L - it20602000@my.sliit.lk

Burah T.I.O - it21274466@my.sliit.lk

Kokuhennadige.C.K - it21349188@my.sliit.lk

Gunasekara W.M.W.A.G.T.N.A - it21303548@my.sliit.lk
