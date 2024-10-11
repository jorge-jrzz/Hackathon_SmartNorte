import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';

const Page = () => {
    const { type } = useLocalSearchParams<{ type: string}>();
    const [loading, setLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('jorgeang33@gmail.com');
    const [password, setPassword] = useState('');

    const onSingUpPress = async () => {};
    const onSingInPress = async () => {};

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={styles.container}>
            {loading && 
            (<View style={defaultStyles.loadingOverlay}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
            )}
            <Image 
                source={require('../assets/images/banorte_dark.png')} 
                style={styles.logo}
            />

            <Text style={styles.title}>
                {type === 'login' ? 'Bienvenido de nuevo' : 'Crear cuenta'}
            </Text>

            <View style={{marginBottom: 30}}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize='none'
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />
                <TextInput
                    style={styles.inputField}
                    autoCapitalize='none'
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {type === 'login' ? (
                <TouchableOpacity onPress={onSingInPress} style={[defaultStyles.btn, styles.btnPrimary]}>
                    <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onSingUpPress} style={[defaultStyles.btn, styles.btnPrimary]}>
                    <Text style={styles.btnPrimaryText}>Crear cuenta</Text>
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    logo: {
      width: 75,
      height: 75,
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
      borderColor: Colors.brown,
      borderRadius: 12,
      padding: 10,
      backgroundColor: '#fff',
    },
    btnPrimary: {
      backgroundColor: Colors.brown,
      marginVertical: 4,
    },
    btnPrimaryText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default Page;
  