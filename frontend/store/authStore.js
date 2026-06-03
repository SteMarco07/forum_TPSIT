import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAPI, registerAPI, logoutAPI } from '@/api/authAPI';

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      username: '',
      email: '',
      password: '',
      confirm: '',
      errors: { username: '', email: '', password: '', confirm: '' },

      setUsername: (username) => set({ username }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setConfirm: (confirm) => set({ confirm }),
      setErrors: (errors) =>
      set((state) => ({ errors: { ...state.errors, ...errors } })),

      isAuthenticated: () => !!get().token,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await loginAPI({ email, password });
          set({
            user: response.user,
            token: response.token,
          });
          return response;
        } catch (error) {
          console.error('Login Error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true });
        try {
          await registerAPI({ username, email, password });
          const response = await loginAPI({ email, password });
          set({
            user: response.user,
            token: response.token,
          });
          return response;
        } catch (error) {
          console.error('Register Error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutAPI();
        } catch (error) {
          console.error('Logout Error:', error);
          throw error;
        } finally {
          get().reset();
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
    }),
    {
      name: 'app-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persisti solo user e token, non il form state
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);