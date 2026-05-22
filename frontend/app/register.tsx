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
    <Box className="flex-1 bg-background px-6 py-8">
      <Center className="gap-4">
        <Text className="text-2xl font-semibold">Registrati</Text>
        <Box className="w-full max-w-md">
          <Input placeholder="Username" value={username} onChangeText={setUsername}>
            <InputField />
          </Input>
          <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" className="mt-3">
            <InputField />
          </Input>
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry className="mt-3">
            <InputField />
          </Input>
          <Input placeholder="Conferma password" value={confirm} onChangeText={setConfirm} secureTextEntry className="mt-3">
            <InputField />
          </Input>

          <Button className="mt-4" onPress={onSubmit}>
            <ButtonText>Registrati</ButtonText>
          </Button>

          <Center className="mt-4">
            <Text>Hai già un account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-primary"> Accedi</Text>
            </TouchableOpacity>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
