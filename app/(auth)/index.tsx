// app/(auth)/index.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a la sección autenticada!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
  },
});

export default AuthHome;
