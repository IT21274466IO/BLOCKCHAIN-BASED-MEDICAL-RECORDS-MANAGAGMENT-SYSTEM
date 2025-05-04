import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  openSignup: () => set({ isSignupOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  closeSignup: () => set({ isSignupOpen: false }),
}));
