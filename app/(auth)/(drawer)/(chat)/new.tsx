// app/(auth)/(drawer)/(chat)/new.tsx
import ChatMessage from '@/components/ChatMessage';
import MessageIdeas from '@/components/MessageIdeas';
import MessageInput from '@/components/MessageInput';
import { defaultStyles } from '@/constants/Styles';
import { Message, Role } from '@/utils/Interfaces';
import React, { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, Image } from 'react-native';

const DUMMY_MESSAGES: Message[] = [
  {
    content: 'Hello',
    role: Role.Bot,
  },
  {
    content: 'Hi',
    role: Role.User,
  }, 
  {
    content: 'How can I help you?',
    role: Role.Bot,
  },
  {
    content: 'I need help with my account este es un mensaje grande para mostrar como se va a estar acomodando el texto en este tipo de situaciopnes',
    role: Role.User,
  }
];

const NewChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [height, setHeight] = useState(0);
  const getCompletion = async (message: string) => {
    console.log(message);
  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  }

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={{ flex: 1}} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, {marginTop: height / 2 - 100 }]}>
            <Image source={require('@/assets/images/banorte.png')} style={styles.image} />
          </View>  
        )}
    
      <FlashList
        data={messages}
        renderItem={({ item }) => <ChatMessage {...item} />}
        estimatedItemSize={400}
        contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
        keyboardDismissMode="on-drag"
      />

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
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion}/>}
        <MessageInput onShouldSend={getCompletion}/>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    // backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000'
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  page: {
    flex: 1,
  },
});

export default NewChatScreen;
