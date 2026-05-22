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
    <Box className="flex-1 bg-background px-6 py-8">
      <Center className="gap-4">
        <Text className="text-2xl font-semibold">Accedi</Text>
        <Box className="w-full max-w-md">
          <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none">
            <InputField />
          </Input>
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry className="mt-3">
            <InputField />
          </Input>

          <Button className="mt-4" onPress={onSubmit}>
            <ButtonText>Accedi</ButtonText>
          </Button>

          <Center className="mt-4">
            <Text>Non hai un account?</Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-primary"> Registrati</Text>
            </TouchableOpacity>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
