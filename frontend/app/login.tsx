'use client';
import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    if (!email || !password) {
      // minimal validation
      alert('Compila tutti i campi');
      return;
    }
    // TODO: replace with real auth logic
    alert('Login eseguito (demo)');
  }

  return (
    <Box className="flex-1 bg-background px-6 py-12">
      <Center className="gap-6">
        <Text className="text-2xl font-semibold text-foreground">Accedi</Text>

        {/* Card container - force lighter card on light and keep readable in dark */}
        <Box className="w-full max-w-md bg-white/95 dark:bg-card p-6 rounded-xl shadow-lg border border-[rgba(10,10,10,0.06)]">
          {/* Top segmented switch */}
          <Box className="flex-row bg-muted rounded-md p-1 mb-4">
            <TouchableOpacity
              onPress={() => router.push('/login')}
              className="flex-1 rounded-md py-2 items-center justify-center"
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className="text-sm font-medium text-foreground">Accedi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/register')}
              className="flex-1 rounded-md py-2 items-center justify-center bg-transparent"
            >
              <Text className="text-sm font-medium text-muted-foreground">Registrati</Text>
            </TouchableOpacity>
          </Box>

          <Box className="mb-3">
            <Text className="text-sm text-muted-foreground mb-2">Email</Text>
            <Box className="rounded-md border border-border overflow-hidden">
              <Input placeholder="Inserisci la tua email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none">
                <InputField />
              </Input>
            </Box>
          </Box>

          <Box className="mb-3">
            <Text className="text-sm text-muted-foreground mb-2">Password</Text>
            <Box className="rounded-md border border-border overflow-hidden">
              <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry>
                <InputField />
              </Input>
            </Box>
          </Box>

          {/* Visible, full-width primary button */}
          <Button className="mt-4 w-full bg-primary shadow-md" onPress={onSubmit}>
            <ButtonText className="text-primary-foreground">Accedi</ButtonText>
          </Button>
        </Box>
      </Center>
    </Box>
  );
}
