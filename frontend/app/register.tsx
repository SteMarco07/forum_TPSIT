'use client';
import React from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Lock, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '@/store/authStore';

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;

  const username = useAppStore((state) => state.username);
  const email = useAppStore((state) => state.email);
  const password = useAppStore((state) => state.password);
  const confirm = useAppStore((state) => state.confirm);
  const isLoading = useAppStore((state) => state.isLoading);
  const errors = useAppStore((state) => state.errors);

  const setUsername = useAppStore((state) => state.setUsername);
  const setEmail = useAppStore((state) => state.setEmail);
  const setPassword = useAppStore((state) => state.setPassword);
  const setConfirm = useAppStore((state) => state.setConfirm);
  const setErrors = useAppStore((state) => state.setErrors);
  const register = useAppStore((state) => state.register);

  function validateEmail(value: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  function validateUsername(value: string) {
    return value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
  }

  async function onSubmit() {
    const newErrors = { username: '', email: '', password: '', confirm: '' };

    if (!username) {
      newErrors.username = 'Username richiesto';
    } else if (!validateUsername(username)) {
      newErrors.username = 'Min 3 caratteri, solo lettere e numeri';
    }

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

    if (!confirm) {
      newErrors.confirm = 'Conferma richiesta';
    } else if (password !== confirm) {
      newErrors.confirm = 'Le password non coincidono';
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.email && !newErrors.password && !newErrors.confirm) {
      try {
        await register(username, email, password);
        router.push('/forum');
      } catch (error) {
        console.error('Registration error:', error);
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
            <Box className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-green-600">
              <User size={32} color="#fff" />
            </Box>
            <Text className={`${isCompact ? 'text-3xl' : 'text-4xl'} font-bold text-white`}>Registrati</Text>
            <Text className="text-center text-sm text-slate-400">Unisciti al nostro forum</Text>
          </Box>

          <Box className={`gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/90 shadow-2xl ${isCompact ? 'p-4' : 'p-6'}`}>
            <Box className="flex-row rounded-xl border border-slate-700/50 bg-slate-950/60 p-1">
              <TouchableOpacity
                onPress={() => router.push('/login')}
                className="flex-1 items-center justify-center rounded-lg py-3"
              >
                <Text className="text-sm font-semibold text-slate-400">Accedi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/register')}
                className="flex-1 items-center justify-center rounded-lg bg-green-600 py-3"
              >
                <Text className="text-sm font-semibold text-white">Registrati</Text>
              </TouchableOpacity>
            </Box>

            <Box>
              <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Username
              </Text>
              <Box className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-950/60 ${errors.username ? 'border-red-500/50' : 'border-slate-600/50'}`}>
                <User size={18} color={errors.username ? '#ef4444' : '#94a3b8'} />
                <TextInput
                  placeholder="nome_utente"
                  value={username}
                  onChangeText={(text: string) => {
                    setUsername(text);
                    if (errors.username) setErrors({ ...errors, username: '' });
                  }}
                  autoCapitalize="none"
                  placeholderTextColor="#64748b"
                  className="ml-3 flex-1 text-white"
                />
              </Box>
              {errors.username ? <Text className="mt-1.5 text-xs text-red-400">{errors.username}</Text> : null}
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

            <Box>
              <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Conferma Password
              </Text>
              <Box className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-950/60 ${errors.confirm ? 'border-red-500/50' : 'border-slate-600/50'}`}>
                <CheckCircle2 size={18} color={errors.confirm ? '#ef4444' : '#94a3b8'} />
                <TextInput
                  placeholder="••••••••"
                  value={confirm}
                  onChangeText={(text: string) => {
                    setConfirm(text);
                    if (errors.confirm) setErrors({ ...errors, confirm: '' });
                  }}
                  secureTextEntry
                  placeholderTextColor="#64748b"
                  className="ml-3 flex-1 text-white"
                />
              </Box>
              {errors.confirm ? <Text className="mt-1.5 text-xs text-red-400">{errors.confirm}</Text> : null}
            </Box>

            <Button
              className="mt-5 w-full rounded-lg bg-green-600 py-3 shadow-lg active:shadow-md"
              onPress={onSubmit}
              disabled={isLoading}
            >
              <ButtonText className="text-base font-semibold text-white">
                {isLoading ? 'Registrazione in corso...' : 'Registrati'}
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </Center>
    </ScrollView>
  );
}