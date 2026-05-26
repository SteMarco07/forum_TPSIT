'use client';
import React from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Lock, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '@/store/authStore';

export default function Register() {
  const router = useRouter();

  // Store unico per gestire tutto lo stato
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

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateUsername(username: string) {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  }

  function onSubmit() {
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
        // Chiama la funzione di register dallo store
        register(email, password);
        alert('Registrazione completata (demo)');
        router.push('/login');
      } catch (error) {
        alert('Errore durante la registrazione');
      }
    }
  }

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Center className="min-h-screen px-6 py-12">
        <Box className="w-full max-w-sm gap-8">
          {/* Header */}
          <Box className="items-center gap-2">
            <Box className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 items-center justify-center mb-2">
              <User size={32} color="#fff" />
            </Box>
            <Text className="text-4xl font-bold text-white">Registrati</Text>
            <Text className="text-sm text-slate-400 text-center">
              Unisciti al nostro forum
            </Text>
          </Box>

          {/* Card container */}
          <Box className="bg-gradient-to-b from-slate-800 to-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-2xl gap-4">
            {/* Segmented switch */}
            <Box className="flex-row bg-slate-900/80 rounded-xl p-1 border border-slate-700/50">
              <TouchableOpacity
                onPress={() => router.push('/login')}
                className="flex-1 rounded-lg py-3 items-center justify-center"
              >
                <Text className="text-sm font-semibold text-slate-400">Accedi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/register')}
                className="flex-1 rounded-lg py-3 items-center justify-center bg-green-600"
              >
                <Text className="text-sm font-semibold text-white">Registrati</Text>
              </TouchableOpacity>
            </Box>

            {/* Username Input */}
            <Box>
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Username
              </Text>
              <Box
                className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-900/50 ${
                  errors.username ? 'border-red-500/50' : 'border-slate-600/50'
                }`}
              >
                <User size={18} color={errors.username ? '#ef4444' : '#94a3b8'} />
                <Input
                  placeholder="nome_utente"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (errors.username) setErrors({ ...errors, username: '' });
                  }}
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-white"
                >
                  <InputField className="text-white placeholder:text-slate-500" />
                </Input>
              </Box>
              {errors.username ? (
                <Text className="text-xs text-red-400 mt-1.5">{errors.username}</Text>
              ) : null}
            </Box>

            {/* Email Input */}
            <Box>
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Email
              </Text>
              <Box
                className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-900/50 ${
                  errors.email ? 'border-red-500/50' : 'border-slate-600/50'
                }`}
              >
                <Mail size={18} color={errors.email ? '#ef4444' : '#94a3b8'} />
                <Input
                  placeholder="nome@esempio.it"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-white"
                >
                  <InputField className="text-white placeholder:text-slate-500" />
                </Input>
              </Box>
              {errors.email ? (
                <Text className="text-xs text-red-400 mt-1.5">{errors.email}</Text>
              ) : null}
            </Box>

            {/* Password Input */}
            <Box>
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Password
              </Text>
              <Box
                className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-900/50 ${
                  errors.password ? 'border-red-500/50' : 'border-slate-600/50'
                }`}
              >
                <Lock size={18} color={errors.password ? '#ef4444' : '#94a3b8'} />
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  secureTextEntry
                  className="flex-1 ml-3 text-white"
                >
                  <InputField className="text-white placeholder:text-slate-500" />
                </Input>
              </Box>
              {errors.password ? (
                <Text className="text-xs text-red-400 mt-1.5">{errors.password}</Text>
              ) : null}
            </Box>

            {/* Confirm Password Input */}
            <Box>
              <Text className="text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Conferma Password
              </Text>
              <Box
                className={`flex-row items-center rounded-lg border px-3 py-2.5 bg-slate-900/50 ${
                  errors.confirm ? 'border-red-500/50' : 'border-slate-600/50'
                }`}
              >
                <CheckCircle2 size={18} color={errors.confirm ? '#ef4444' : '#94a3b8'} />
                <Input
                  placeholder="••••••••"
                  value={confirm}
                  onChangeText={(text) => {
                    setConfirm(text);
                    if (errors.confirm) setErrors({ ...errors, confirm: '' });
                  }}
                  secureTextEntry
                  className="flex-1 ml-3 text-white"
                >
                  <InputField className="text-white placeholder:text-slate-500" />
                </Input>
              </Box>
              {errors.confirm ? (
                <Text className="text-xs text-red-400 mt-1.5">{errors.confirm}</Text>
              ) : null}
            </Box>

            {/* Register Button */}
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-green-700 py-3 mt-5 rounded-lg shadow-lg active:shadow-md transition-all"
              onPress={onSubmit}
              disabled={isLoading}
            >
              <ButtonText className="text-white font-semibold text-base">
                {isLoading ? 'Registrazione in corso...' : 'Registrati'}
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </Center>
    </ScrollView>
  );
}
