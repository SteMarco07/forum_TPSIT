import Logo from '@/assets/icons/Logo';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const token = useAppStore((state) => state.token);

  useEffect(() => {
    if (token) {
      router.replace('/forum');
    } else {
      router.replace('/login');
    }
  }, [router, token]);

  return (
    <Box className="flex-1 bg-background">
      <Center className="flex-1 gap-5">
        <Logo />
        <Text className="font-semibold">
          Get started by editing{' '}
          <Text className="text-primary/70">app/index.tsx</Text>
        </Text>
      </Center>
    </Box>
  );
}
