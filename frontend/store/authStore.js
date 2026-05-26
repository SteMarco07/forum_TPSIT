import { create } from 'zustand';
import { loginAPI, registerAPI, logoutAPI } from '@/api/authAPI';

// Store unico per gestire tutto lo stato dell'app
export const useAppStore = create((set) => ({
    // === AUTH STATE ===
    user: null,
    token: null,
    username: '',
    email: '',
    password: '',
    confirm: '',
    isLoading: false,
    errors: { username: '', email: '', password: '', confirm: '' },

    // === AUTH ACTIONS ===
    setUsername: (username) => set({ username }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setConfirm: (confirm) => set({ confirm }),
    setErrors: (errors) => set({ errors }),

    // Login - chiama l'API e salva i dati
    login: async (email, password) => {
        try {
            set({ isLoading: true });

            const loginData = {
                email,
                password,
                timestamp: new Date().toISOString(),
            };

            const response = await loginAPI(loginData);

            // Salva user e token nello store
            set({
                user: response.user,
                token: response.token,
                isLoading: false,
            });

            return response;
        } catch (error) {
            console.error('❌ Login Error:', error);
            set({ isLoading: false });
            throw error;
        }
    },

    // Register
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
            console.error('❌ Register Error:', error);
            set({ isLoading: false });
            throw error;
        }
    },

    // Logout
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
            console.error('❌ Logout Error:', error);
            set({ isLoading: false });
            throw error;
        }
    },

    // Reset dello stato
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
            email: '',
            password: '',
            isLoading: false,
            errors: { email: '', password: '' },
        }),
}))
