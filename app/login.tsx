// import Colors from '@/constants/Colors';
// import { defaultStyles } from '@/constants/Styles';
// import { AuthContext } from '@/contexts/AuthContext';
// import { useLocalSearchParams, useRouter} from 'expo-router';
// import React, { useContext, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Text,
//   Alert,
//   ActivityIndicator,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Image,
//   Platform,
// } from 'react-native';
// import * as SecureStore from 'expo-secure-store';

// const Login = () => {
//   const { type } = useLocalSearchParams<{ type: string }>();

//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { setIsSignedIn } = useContext(AuthContext);

//   setIsSignedIn(false);

//   const onSignInPress = async () => {
//     setLoading(true);
//     try {
//       // Implementa aquí tu lógica de autenticación
//       // Por ejemplo, realizar una solicitud a tu API
//       const response = await apiLogin(emailAddress, password);
//       if (response.success) {
//         await SecureStore.setItemAsync('userToken', response.token);
//         setIsSignedIn(true);
//         Alert.alert('Inicio de sesión exitoso');
//       } else {
//         Alert.alert('Credenciales incorrectas');
//       }
//     } catch (err) {
//       Alert.alert('Error al iniciar sesión');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSignUpPress = async () => {
//     setLoading(true);
//     router.replace('/(auth)/');
//     // try {
//     //   // Implementa aquí tu lógica de registro
//     //   const response = await apiRegister(emailAddress, password);
//     //   if (response.success) {
//     //     await SecureStore.setItemAsync('userToken', response.token);
//     //     setIsSignedIn(true);
//     //     Alert.alert('Cuenta creada exitosamente');
//     //   } else {
//     //     Alert.alert('Error al crear la cuenta');
//     //   }
//     // } catch (err) {
//     //   Alert.alert('Error al crear la cuenta');
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={70}
//       style={styles.container}>
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
//           placeholder="correo@ejemplo.com"
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

//       {type === 'login' ? (
//         <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignInPress}>
//           <Text style={styles.btnPrimaryText}>Iniciar Sesión</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignUpPress}>
//           <Text style={styles.btnPrimaryText}>Crear Cuenta</Text>
//         </TouchableOpacity>
//       )}
//     </KeyboardAvoidingView>
//   );
// };


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 20,
//     },
//     logo: {
//       width: 75,
//       height: 75,
//       alignSelf: 'center',
//       marginVertical: 80,
//     },
//     title: {
//       fontSize: 30,
//       marginBottom: 20,
//       fontWeight: 'bold',
//       alignSelf: 'center',
//     },
//     inputField: {
//       marginVertical: 4,
//       height: 50,
//       borderWidth: 1,
//       borderColor: Colors.brown,
//       borderRadius: 12,
//       padding: 10,
//       backgroundColor: '#fff',
//     },
//     btnPrimary: {
//       backgroundColor: Colors.brown,
//       marginVertical: 4,
//     },
//     btnPrimaryText: {
//       color: '#fff',
//       fontSize: 16,
//     },
//   });

// export default Login;

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { setIsSignedIn } = useContext(AuthContext);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSignedIn(true);
      router.replace('/(auth)/');
    }, 1000); // Simula un retraso de 1 segundo
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Image source={require('../assets/images/banorte_dark.png')} style={styles.logo} />

      <Text style={styles.title}>{type === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</Text>
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

      <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={handleAuth}>
        <Text style={styles.btnPrimaryText}>
          {type === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
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
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
