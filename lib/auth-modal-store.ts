import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  mode: 'login' | 'register';
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
  setMode: (mode: 'login' | 'register') => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  mode: 'login',

  openLogin: () => set({ isOpen: true, mode: 'login' }),

  openRegister: () => set({ isOpen: true, mode: 'register' }),

  closeModal: () => set({ isOpen: false }),

  setMode: (mode) => set({ mode }),
}));
