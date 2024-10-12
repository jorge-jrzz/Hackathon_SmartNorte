// // app/_layout.tsx
// import { useFonts } from 'expo-font';
// import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
// import React, { useEffect, useState, useContext } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import { Ionicons } from '@expo/vector-icons';
// import { TouchableOpacity, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AuthProvider, AuthContext } from '../contexts/AuthContext';

// // Prevenir que la pantalla de carga se oculte automáticamente antes de completar la carga de recursos.
// SplashScreen.preventAutoHideAsync();

// const InitialLayout = () => {
//   const [fontsLoaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });
//   const { isSignedIn } = useContext(AuthContext);
//   const [authStateChecked, setAuthStateChecked] = useState(false);

//   const segments = useSegments();
//   const router = useRouter();

//   // Manejo de errores en la carga de fuentes
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   // Ocultar la pantalla de carga cuando las fuentes estén cargadas
//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   // Verificar si el estado de autenticación ha sido chequeado
//   useEffect(() => {
//     if (isSignedIn !== undefined) {
//       setAuthStateChecked(true);
//     }
//   }, [isSignedIn]);

//   // Navegación basada en el estado de autenticación
//   useEffect(() => {
//     if (!authStateChecked) return;

//     const inAuthGroup = segments[0] === '(auth)';

//     if (isSignedIn && !inAuthGroup) {
//       router.replace('/(auth)/');
//     } else if (!isSignedIn) {
//       router.replace('/');
//     }
//   }, [isSignedIn, authStateChecked]);

//   if (!fontsLoaded || !authStateChecked) {
//     return null; // Puedes mostrar un indicador de carga aquí si lo deseas
//   }

//   return (
//     <Stack>
//       <Stack.Screen
//         name="index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="login"
//         options={{
//           presentation: 'modal',
//           title: '',
//           headerTitleStyle: {
//             fontFamily: 'mon-sb',
//           },
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => router.back()}>
//               <Ionicons name="close-outline" size={28} />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//     </Stack>
//   );
// };

// const RootLayoutNav = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <InitialLayout />
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default RootLayoutNav;

import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';

// Evitar que la pantalla de carga se oculte automáticamente antes de que la carga de activos esté completa.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isSignedIn } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  // Manejo de errores en la carga de fuentes.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Ocultar la pantalla de carga una vez que las fuentes se hayan cargado.
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Navegación basada en el estado de autenticación.
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded) {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayoutNav;
