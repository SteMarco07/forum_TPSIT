import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { Slot, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon, SlashIcon } from '@/components/ui/icon';
import { useAppStore } from '@/store/authStore';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [isHydrated, setIsHydrated] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const unsubFinishHydration = useAppStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAppStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubFinishHydration();
    };
  }, []);

  useEffect(() => {
    if (loaded && isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isHydrated]);

  if (!loaded || !isHydrated) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAppStore((state) => state.token);
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<'system' | 'light' | 'dark'>('system');

  useEffect(() => {
    if (!token) {
      // If there is no token, only allow login and register
      if (pathname !== '/login' && pathname !== '/register') {
        router.replace('/login');
      }
    } else {
      // If there is a token, prevent visiting login, register or root route
      if (pathname === '/login' || pathname === '/register' || pathname === '/') {
        router.replace('/forum');
      }
    }
  }, [token, pathname]);

  // Determine effective color scheme
  const effectiveColorScheme = mode === 'system'
    ? (systemColorScheme ?? 'light')
    : mode;

  const handleToggleTheme = () => {
    if (mode === 'system') {
      setMode('light');
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('system');
    }
  };

  return (
    <GluestackUIProvider mode={mode}>
      <ThemeProvider value={effectiveColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        {pathname === '/' && (
          <Fab
            onPress={handleToggleTheme}
            className="m-6"
            size="lg"
          >
            <FabIcon as={mode === 'system' ? SlashIcon : (effectiveColorScheme === 'dark' ? MoonIcon : SunIcon)} />
          </Fab>
        )}
      </ThemeProvider>
    </GluestackUIProvider>
  );
}