import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
<<<<<<< HEAD
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useContext } from 'react';
=======
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
>>>>>>> fork/main
import {
  View,
  StyleSheet,
  TextInput,
  Text,
<<<<<<< HEAD
=======
  Alert,
>>>>>>> fork/main
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
<<<<<<< HEAD
import { AuthContext } from '../contexts/AuthContext';
import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { setIsSignedIn } = useContext(AuthContext);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('jorgeang33@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAuth = () => {
    setShowAnimation(true);
  };

  const onAnimationFinish = () => {
    setShowAnimation(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSignedIn(true);
      router.replace('/(auth)/'); // Asegúrate de que esta ruta existe
    }, 400); // Simula un retraso de 1 segundo
=======

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: signupSetActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPress = async () => {
    if (!signUpLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      const result = await signUp.create({
        emailAddress,
        password,
      });

      // This indicates the user is signed in
      signupSetActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
>>>>>>> fork/main
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}
<<<<<<< HEAD
      style={styles.container}
    >
=======
      style={styles.container}>
>>>>>>> fork/main
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

<<<<<<< HEAD
      {/* Siempre renderiza el contenido principal */}
      <>
        <Image source={require('@/assets/images/banorte_dark.png')} style={styles.logo} />

        <Text style={styles.title}>
          {type === 'login' ? 'Bienvenido' : 'Crea tu cuenta'}
        </Text>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            autoCapitalize="none"
            placeholder="john@apple.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
        </View>

        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={handleAuth}
        >
          <Text style={styles.btnPrimaryText}>
            {type === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </Text>
        </TouchableOpacity>
      </>

      {/* Superponer BlurView y animación cuando showAnimation es true */}
      {showAnimation && (
        <View style={StyleSheet.absoluteFill}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill}/>
          ) : (
            <View style={styles.overlay} />
          )}
          <View style={styles.animationContainer}>
            <LottieView
              source={require('@/assets/animations/faceid.json')}
              autoPlay
              loop={false}
              onAnimationFinish={onAnimationFinish}
              style={styles.animation}
              speed={1.5}
            />
          </View>
        </View>
=======
      <Image source={require('../assets/images/logo-dark.png')} style={styles.logo} />

      <Text style={styles.title}>{type === 'login' ? 'Welcome back' : 'Create your account'}</Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
      </View>

      {type === 'login' ? (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignInPress}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignUpPress}>
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
>>>>>>> fork/main
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    padding: 20,
  },
  logo: {
    width: 75,
    height: 75,
=======
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
>>>>>>> fork/main
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: Colors.brown,
=======
    borderColor: Colors.primary,
>>>>>>> fork/main
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
<<<<<<< HEAD
    backgroundColor: Colors.brown,
=======
    backgroundColor: Colors.primary,
>>>>>>> fork/main
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
<<<<<<< HEAD
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  animationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 100,
    height: 100,
    marginTop: -400, // Ajusta este valor según tus necesidades
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    ...StyleSheet.absoluteFillObject,
  },
});

export default Login;


// ------------------------------------------------------------
// **** Autenticacion con Face ID ****


// import Colors from '@/constants/Colors';
// import { defaultStyles } from '@/constants/Styles';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState, useContext } from 'react';
// import { Video } from 'expo-av';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Text,
//   ActivityIndicator,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Image,
//   Platform,
//   Alert,
// } from 'react-native';
// import { AuthContext } from '@/contexts/AuthContext';
// import * as LocalAuthentication from 'expo-local-authentication';

// const Login = () => {
//   const { type } = useLocalSearchParams<{ type: string }>();
//   const { setIsSignedIn } = useContext(AuthContext);
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleAuth = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setIsSignedIn(true);
//       router.replace({ pathname: '/(auth)' });
//     }, 1000); // Simula un retraso de 1 segundo
//   };

//   // const handleBiometricAuth = async () => {
//   //   try {
//   //     const compatible = await LocalAuthentication.hasHardwareAsync();
//   //     if (!compatible) {
//   //       Alert.alert('Error', 'Este dispositivo no soporta autenticación biométrica');
//   //       return;
//   //     }

//   //     const enrolled = await LocalAuthentication.isEnrolledAsync();
//   //     if (!enrolled) {
//   //       Alert.alert('Error', 'No hay datos biométricos registrados en este dispositivo');
//   //       return;
//   //     }

//   //     const result = await LocalAuthentication.authenticateAsync({
//   //       promptMessage: 'Autentícate con Face ID',
//   //       fallbackLabel: 'Usar contraseña',
//   //       disableDeviceFallback: true,
//   //     });

//   //     if (result.success) {
//   //       // La autenticación biométrica fue exitosa
//   //       handleAuth();
//   //     } else {
//   //       Alert.alert('Error', 'La autenticación biométrica falló');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error durante la autenticación biométrica:', error);
//   //     Alert.alert('Error', 'Ocurrió un error durante la autenticación');
//   //   }
//   // };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={70}
//       style={styles.container}
//     >
//       {loading && (
//         <View style={defaultStyles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       )}

//       <Image source={require('../assets/images/banorte_dark.png')} style={styles.logo} />

//       <Text style={styles.title}>{type === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</Text>
//       <View style={{ marginBottom: 30 }}>
//         <TextInput
//           autoCapitalize="none"
//           placeholder="john@apple.com"
//           value={emailAddress}
//           onChangeText={setEmailAddress}
//           style={styles.inputField}
//         />
//         <TextInput
//           placeholder="Contraseña"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.inputField}
//         />
//       </View>

//       <TouchableOpacity
//         style={[defaultStyles.btn, styles.btnPrimary]}
//         // onPress={handleBiometricAuth}
//         onPress={handleAuth}
//       >
//         <Text style={styles.btnPrimaryText}>
//           {type === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
//         </Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   logo: {
//     width: 75,
//     height: 75,
//     alignSelf: 'center',
//     marginVertical: 80,
//   },
//   title: {
//     fontSize: 30,
//     marginBottom: 20,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//   },
//   inputField: {
//     marginVertical: 4,
//     height: 50,
//     borderWidth: 1,
//     borderColor: Colors.brown,
//     borderRadius: 12,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   btnPrimary: {
//     backgroundColor: Colors.brown,
//     marginVertical: 4,
//   },
//   btnPrimaryText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default Login;
=======
});

export default Login;
>>>>>>> fork/main
