import api from './axios';
import { useAuthStore } from '../Store/authStore';



export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email: identifier,
      password,
    });

    const { token, fullname, email, profile_image } = response.data;

    useAuthStore.getState().setAuth(token, {
      fullname,
      email,
      profile_image: profile_image || null, 
    });

    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.error || 'Login failed',
    };
  }
};




export const registerUser = async (formData: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
}) => {
  try {
    const response = await api.post('/auth/register', {
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
      mobile: formData.phone,
      dob: formData.dob,
      profile_image: null, 
    });

    const { token, fullname, email, profile_image } = response.data;

    useAuthStore.getState().setAuth(token, {
      fullname,
      email,
      profile_image: profile_image || null,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.error || 'Something went wrong',
    };
  }
};


export const updateProfile = async (formData: {
  fullname: string;
  email: string;
  mobile: string;
  profile_image?: string;
}) => {
  try {
    const response = await api.put('/auth/edit-profile', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Update profile error:', error.response?.data || error.message);
    return { success: false, message: error.response?.data?.error || 'Update failed' };
  }
};


export const getProfile = async () => {
  try {
    const response = await api.get('/auth/get-profile');
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Get profile error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch profile',
    };
  }
};



export const deleteProfile = async () => {
  try {
    const response = await api.delete('/auth/delete-profile');
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Delete profile error:', error.response?.data || error.message);
    return { success: false, message: error.response?.data?.error || 'Delete failed' };
  }
};




