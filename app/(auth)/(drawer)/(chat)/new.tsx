// app/(auth)/(drawer)/(chat)/new.tsx
import MessageInput from '@/components/MessageInput';
import { defaultStyles } from '@/constants/Styles';
import React from 'react';
import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const NewChatScreen = () => {
  const getCompletion = async (message: string) => {
    console.log(message);
  }

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={{ flex: 1}}>
        <Text>DUMMY Content</Text>
        {/* <ScrollView>
          {Array.from({length: 100}).map((_, index) => (
            <Text key={index}>{index}</Text>
          ))}
        </ScrollView> */}
      </View>
      <KeyboardAvoidingView 
      keyboardVerticalOffset={70}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MessageInput onShouldSend={getCompletion}/>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewChatScreen;
