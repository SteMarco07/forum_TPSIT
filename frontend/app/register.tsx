'use client';
import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function onSubmit() {
    if (!username || !email || !password || !confirm) {
      alert('Compila tutti i campi');
      return;
    }
    if (password !== confirm) {
      alert('Le password non coincidono');
      return;
    }
    // TODO: implement registration logic
    alert('Registrazione completata (demo)');
    router.push('/login');
  }

  return (
    <Box className="flex-1 bg-background px-6 py-12">
      <Center className="gap-6">
        <Text className="text-2xl font-semibold text-foreground">Registrati</Text>

        {/* Card container - lighter */}
        <Box className="w-full max-w-md bg-white/95 dark:bg-card p-6 rounded-xl shadow-lg border border-[rgba(10,10,10,0.06)]">

          {/* Top segmented switch */}
          <Box className="flex-row bg-muted rounded-md p-1 mb-4">
            <TouchableOpacity
              onPress={() => router.push('/login')}
              className="flex-1 rounded-md py-2 items-center justify-center"
            >
              <Text className="text-sm font-medium text-muted-foreground">Accedi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/register')}
              className="flex-1 rounded-md py-2 items-center justify-center bg-transparent"
            >
              <Text className="text-sm font-medium text-foreground">Registrati</Text>
            </TouchableOpacity>
          </Box>

          <Box className="mb-3">
            <Text className="text-sm text-muted-foreground mb-2">Username</Text>
            <Box className="rounded-md border border-border overflow-hidden">
              <Input placeholder="Scegli un username" value={username} onChangeText={setUsername}>
                <InputField />
              </Input>
            </Box>
          </Box>

          <Box className="mb-3">
            <Text className="text-sm text-muted-foreground mb-2">Email</Text>
            <Box className="rounded-md border border-border overflow-hidden">
              <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none">
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

          <Box className="mb-3">
            <Text className="text-sm text-muted-foreground mb-2">Conferma password</Text>
            <Box className="rounded-md border border-border overflow-hidden">
              <Input placeholder="Conferma password" value={confirm} onChangeText={setConfirm} secureTextEntry>
                <InputField />
              </Input>
            </Box>
          </Box>

          {/* Visible, full-width primary button */}
          <Button className="mt-4 w-full bg-primary shadow-md" onPress={onSubmit}>
            <ButtonText className="text-primary-foreground">Registrati</ButtonText>
          </Button>

        </Box>
      </Center>
    </Box>
  );
}
