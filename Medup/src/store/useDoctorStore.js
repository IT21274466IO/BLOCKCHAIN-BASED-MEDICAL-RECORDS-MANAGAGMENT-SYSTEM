import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDoctorStore = create(
  persist(
    (set) => ({
      doctor: null,
      token: null,
      isAuthenticated: false,

      login: (doctorData, token) =>
        set({
          doctor: doctorData,
          token: token,
          isAuthenticated: true,
        }),

        logout: () => {
          localStorage.removeItem('doctor-auth'); // Clear localStorage
          set({
            doctor: null,
            token: null,
            isAuthenticated: false,
          });
        },
      }),
    {
      name: 'doctor-auth', // localStorage
    }
  )
);
