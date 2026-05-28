'use client';
import React from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, LogIn } from 'lucide-react-native';
import { useAppStore } from '@/store/authStore';

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;

  const email = useAppStore((state) => state.email);
  const password = useAppStore((state) => state.password);
  const isLoading = useAppStore((state) => state.isLoading);
  const errors = useAppStore((state) => state.errors);

  const setEmail = useAppStore((state) => state.setEmail);
  const setPassword = useAppStore((state) => state.setPassword);
  const setErrors = useAppStore((state) => state.setErrors);
  const login = useAppStore((state) => state.login);

  function validateEmail(value: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  async function onSubmit() {
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email richiesta';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email non valida';
    }

    if (!password) {
      newErrors.password = 'Password richiesta';
    } else if (password.length < 6) {
      newErrors.password = 'Minimo 6 caratteri';
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        await login(email, password);
        alert('Login eseguito (demo)');
        router.push('/forum');
      } catch (error) {
        alert('Errore durante il login');
      }
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#020617' }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Center className={`flex-1 px-4 ${isCompact ? 'py-6' : 'py-12'}`}>
        <Box className={`w-full gap-6 ${isCompact ? 'max-w-md' : 'max-w-sm'}`}>
          <Box className={`items-center gap-2 ${isCompact ? 'pt-4' : ''}`}>
            <Box className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <LogIn size={32} color="#fff" />
            </Box>
            <Text className={`${isCompact ? 'text-3xl' : 'text-4xl'} font-bold text-white`}>Accedi</Text>
            <Text className="text-center text-sm text-slate-400">Benvenuto nel forum</Text>
          </Box>

          <Box className={`gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/90 shadow-2xl ${isCompact ? 'p-4' : 'p-6'}`}>
            <Box className="flex-row rounded-xl border border-slate-700/50 bg-slate-950/60 p-1">
              <TouchableOpacity
                onPress={() => router.push('/login')}
                className="flex-1 items-center justify-center rounded-lg bg-blue-600 py-3"
              >
                <Text className="text-sm font-semibold text-white">Accedi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/register')}
                className="flex-1 items-center justify-center rounded-lg py-3"
              >
                <Text className="text-sm font-semibold text-slate-400">Registrati</Text>
              </TouchableOpacity>
            </Box>

            <Box>
              <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Email
              </Text>
              <Box className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-950/60 ${errors.email ? 'border-red-500/50' : 'border-slate-600/50'}`}>
                <Mail size={18} color={errors.email ? '#ef4444' : '#94a3b8'} />
                <TextInput
                  placeholder="nome@esempio.it"
                  value={email}
                  onChangeText={(text: string) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#64748b"
                  className="ml-3 flex-1 text-white"
                />
              </Box>
              {errors.email ? <Text className="mt-1.5 text-xs text-red-400">{errors.email}</Text> : null}
            </Box>

            <Box>
              <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Password
              </Text>
              <Box className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-950/60 ${errors.password ? 'border-red-500/50' : 'border-slate-600/50'}`}>
                <Lock size={18} color={errors.password ? '#ef4444' : '#94a3b8'} />
                <TextInput
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(text: string) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  secureTextEntry
                  placeholderTextColor="#64748b"
                  className="ml-3 flex-1 text-white"
                />
              </Box>
              {errors.password ? <Text className="mt-1.5 text-xs text-red-400">{errors.password}</Text> : null}
            </Box>

            <Button
              className="mt-5 w-full rounded-lg bg-blue-600 py-3 shadow-lg active:shadow-md"
              onPress={onSubmit}
              disabled={isLoading}
            >
              <ButtonText className="text-base font-semibold text-white">
                {isLoading ? 'Accesso in corso...' : 'Accedi'}
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </Center>
    </ScrollView>
  );
}