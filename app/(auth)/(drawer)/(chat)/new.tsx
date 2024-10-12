// app/(auth)/(drawer)/(chat)/new.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de Nuevo Chat</Text>
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
    fontSize: 22,
  },
});

export default NewChatScreen;
