import api from './axios';
import { Platform } from 'react-native';

export const predictDisease = async (imageUri: string, modelType: 'skin' | 'eye') => {
  const formData = new FormData();

  const fileName = imageUri.split('/').pop() || 'photo.jpg';
  const file = {
    uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
    type: 'image/jpeg',
    name: fileName,
  };

  formData.append('file', file as any);
  formData.append('model_type', modelType);

  const response = await api.post('/predict/skin-eye-predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    label: response.data.label,
    confidence: response.data.confidence,
    doctor_info: response.data.doctor_info,
  };
};



export const getPredictionHistory = async () => {
  try {
    const response = await api.get('/predict/skin-eye-predictions');
    return { success: true, data: response.data.predictions };
  } catch (error: any) {
    console.error('Error fetching prediction history:', error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || 'Failed to load history' };
  }
};




export const analyzeRisk = async (imageUri: string) => {
  const formData = new FormData();
  const fileName = imageUri.split('/').pop() || 'risk-report.jpg';

  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: fileName,
  } as any);

  const response = await api.post('/predict/risk-analysis', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // fbs_value and prediction
};


export const getRiskPredictionHistory = async () => {
  try {
    const response = await api.get('/predict/risk-predictions');
    return { success: true, data: response.data.predictions };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch risk history',
    };
  }
};



export const identifyMedicalImage = async (imageUri: string) => {
  const formData = new FormData();
  const fileName = imageUri.split('/').pop() || 'image.jpg';

  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: fileName,
  } as any);

  const response = await api.post('/predict/identify-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // { label, confidence }
};



export const getImagePredictionHistory = async () => {
  try {
    const response = await api.get('/predict/image-predictions');
    return { success: true, data: response.data.predictions };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch image predictions',
    };
  }
};
