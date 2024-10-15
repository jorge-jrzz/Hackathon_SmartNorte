import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
<<<<<<< HEAD
import { useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';

// Evitar que la pantalla de carga se oculte automáticamente antes de que la carga de activos esté completa.
=======
import { useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
>>>>>>> fork/main
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
<<<<<<< HEAD
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isSignedIn } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  // Manejo de errores en la carga de fuentes.
=======
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
>>>>>>> fork/main
  useEffect(() => {
    if (error) throw error;
  }, [error]);

<<<<<<< HEAD
  // Ocultar la pantalla de carga una vez que las fuentes se hayan cargado.
=======
>>>>>>> fork/main
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

<<<<<<< HEAD
  // Navegación basada en el estado de autenticación.
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.replace({ pathname: '/(auth)/(drawer)/(chat)/new' });
    } else if (!isSignedIn) {
      router.replace({ pathname: '/' });
    }
  }, [isSignedIn]);

  if (!loaded) {
=======
  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/(drawer)/(chat)/new');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
>>>>>>> fork/main
    return <Slot />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          presentation: 'modal',
          title: '',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
<<<<<<< HEAD
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </GestureHandlerRootView>
=======
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
>>>>>>> fork/main
  );
};

export default RootLayoutNav;
