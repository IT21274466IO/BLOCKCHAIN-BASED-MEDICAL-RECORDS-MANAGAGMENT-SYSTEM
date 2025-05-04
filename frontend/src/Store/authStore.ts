import { create } from 'zustand';

interface User {
    fullname: string;
    email: string;
    profile_image?: string | null;
  }
  
  interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    clearAuth: () => void;
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    setAuth: (token, user) => set({ token, user }),
    clearAuth: () => set({ token: null, user: null }),
  }));
  
