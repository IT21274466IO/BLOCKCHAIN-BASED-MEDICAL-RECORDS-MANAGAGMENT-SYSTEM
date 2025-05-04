import api from './axios';
import { useAuthStore } from '../Store/authStore';

export const getDoctorAvailability = async (doctorEmail: string) => {
  try {
    const response = await api.get(`/appointments/doctor-availability/${doctorEmail}`);
    return { success: true, data: response.data.availability };
  } catch (error: any) {
    console.error('Doctor availability fetch error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch availability',
    };
  }
};



export const createAppointment = async (doctorEmail: string, appointmentDate: string) => {
    const token = useAuthStore.getState().token;
  
    try {
      const response = await api.post(
        '/appointments/create',
        { doctor_email: doctorEmail, appointment_date: appointmentDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Appointment creation error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to create appointment',
      };
    }
  };


  export const getMyAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      return { success: true, data: response.data.appointments };
    } catch (error: any) {
      console.error('Appointment fetch error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointments',
      };
    }
  };