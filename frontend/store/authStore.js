import { create } from 'zustand';
import { loginAPI, registerAPI, logoutAPI } from '@/api/authAPI';

export const useAppStore = create((set) => ({
  user: null,
  token: null,
  username: '',
  email: '',
  password: '',
  confirm: '',
  isLoading: false,
  errors: { username: '', email: '', password: '', confirm: '' },

  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirm: (confirm) => set({ confirm }),
  setErrors: (errors) => set({ errors }),

  login: async (email, password) => {
    try {
      set({ isLoading: true });

      const loginData = {
        email,
        password,
        timestamp: new Date().toISOString(),
      };

      const response = await loginAPI(loginData);

      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      });

      return response;
    } catch (error) {
      console.error('Login Error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email, password) => {
    try {
      set({ isLoading: true });

      const registerData = {
        email,
        password,
        timestamp: new Date().toISOString(),
      };

      const response = await registerAPI(registerData);

      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      });

      return response;
    } catch (error) {
      console.error('Register Error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await logoutAPI();
      set({
        user: null,
        token: null,
        email: '',
        password: '',
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout Error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  reset: () =>
    set({
      user: null,
      token: null,
      username: '',
      email: '',
      password: '',
      confirm: '',
      isLoading: false,
      errors: { username: '', email: '', password: '', confirm: '' },
    }),
}));