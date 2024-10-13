import ChatMessage from '@/components/ChatMessage';
import MessageIdeas from '@/components/MessageIdeas';
import MessageInput from '@/components/MessageInput';
import { defaultStyles } from '@/constants/Styles';
import { Message, Role } from '@/utils/Interfaces';
import React, { useState, useContext } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';
import { AuthContext } from '@/contexts/AuthContext';

const NewChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [emailAddress, setEmailAddress] = useState('jorgeang33@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { setIsSignedIn } = useContext(AuthContext);

  const router = useRouter();

  const getCompletion = async (message: string) => {
    if (message.length === 0) {
      return;
    }

    console.log('Obteniendo completado:', message);

    // Agrega el mensaje del usuario y un mensaje vacío del bot
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, role: Role.User },
      { content: '...', role: Role.Bot }, // Indicador de que el bot está escribiendo
    ]);

    // Construye el cuerpo de la solicitud
    const requestBody = {
      query: message,
    };

    console.log('Cuerpo de la solicitud:', requestBody);

    // Si la petición tiene la palabra transferencia o transferir se activa el estado de animación y al terminar se desactiva
    if (message.includes('transferencia') || message.includes('transferir') || message.includes('Transferencia') || message.includes('Transferir')) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setIsSignedIn(true);
        }, 400); // Simula un retraso de 1 segundo
      }, 4000); // Simula un retraso de 4 segundos
    }

    try {
      // Realiza la solicitud a la API de OpenAI
      const response = await fetch('http://localhost:8000/multiagent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY, // Usa la clave de API
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error('Error en la respuesta de OpenAI:', response.statusText);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
        return;
      }

      const data = await response.json();

      const botMessageContent = data.message;

      // Actualiza el último mensaje (del bot) con la respuesta de OpenAI
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].content = botMessageContent;
        return updatedMessages;
      });
    } catch (error) {
      console.log(error);
      // Maneja el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const onAnimationFinish = () => {
    setShowAnimation(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSignedIn(true);
      router.replace('/(auth)/'); // Asegúrate de que esta ruta existe
    }, 400); // Simula un retraso de 1 segundo
  };

  return (
    <>
    <View style={defaultStyles.pageContainer}>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
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
          width: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSend={getCompletion} />
      </KeyboardAvoidingView>
    </View>

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
)}
</>
  );
}
const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  page: {
    flex: 1,
  },
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

export default NewChatScreen;


// -----------------------------------

// ** Con el modulo react-native-openai **

// // app/(auth)/(drawer)/(chat)/new.tsx
// import ChatMessage from '@/components/ChatMessage';
// import MessageIdeas from '@/components/MessageIdeas';
// import MessageInput from '@/components/MessageInput';
// import { defaultStyles } from '@/constants/Styles';
// import { Message, Role } from '@/utils/Interfaces';
// import React, { useEffect, useState } from 'react';
// import { FlashList } from '@shopify/flash-list';
// import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, Image } from 'react-native';
// import OpenAI from 'react-native-openai';


// const DUMMY_MESSAGES: Message[] = [
//   {
//     content: 'Hi',
//     role: Role.User,
//   }, 
//   {
//     content: 'How can I help you?',
//     role: Role.Bot,
//   },
//   {
//     content: 'I need help with my account este es un mensaje grande para mostrar como se va a estar acomodando el texto en este tipo de situaciopnes',
//     role: Role.User,
//   }
// ];

// const NewChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [height, setHeight] = useState(0);

//   const openAI = new OpenAI({,
//     apiKey: process.env.OPENAI_API_KEY,
//     organization: 'proj_HBm0hWokeockGoodyICFloHO',
//     host: 'api.openai.com',
//   });


//   const getCompletion = async (message: string) => {
//     console.log("Getting completion", message);
//     if ( message.length === 0 ) {
//     }

//     setMessages([
//       ...messages, 
//       { content: message, role: Role.User }, 
//       { role: Role.Bot, content: ''}
//     ]);

//     openAI.chat.stream({
//       messages: [
//         { 
//           role: 'user', 
//           content: message 
//         }
//       ], 
//       model: 'gpt-3.5-turbo',
//     })
//   };

//   useEffect(() => {
//     const handleMessage = (payload: any) => {
//       console.log('Recieved message', payload);
//       setMessages((messages) => {
//         const newMessage = payload.choices[0].delta.content;
//         if (newMessage) {
//           messages[messages.length - 1].content += newMessage;
//           return [...messages];
//         }

//         if (payload.choices[0]?.finishReason) { console.log('Stream finished')};
//         return messages
//       })
      
//     }

//     openAI.chat.addListener('onChatMessageReceived', handleMessage);

//     return () => {
//       openAI.chat.removeListener('onChatMessageReceived');
//     }
//   }, [openAI]);

//   const onLayout = (event: any) => {
//     const { height } = event.nativeEvent.layout;
//     setHeight(height);
//   };

//   return (
//     <View style={defaultStyles.pageContainer}>
//       <View style={{ flex: 1}} onLayout={onLayout}>
//         {messages.length === 0 && (
//           <View style={[styles.logoContainer, {marginTop: height / 2 - 100 }]}>
//             <Image source={require('@/assets/images/banorte.png')} style={styles.image} />
//           </View>  
//         )}
    
//       <FlashList
//         data={messages}
//         renderItem={({ item }) => <ChatMessage {...item} />}
//         estimatedItemSize={400}
//         contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
//         keyboardDismissMode="on-drag"
//       />

//       </View>
//       <KeyboardAvoidingView 
//       keyboardVerticalOffset={70}
//       style={{
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         width: '100%'
//       }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion}/>}
//         <MessageInput onShouldSend={getCompletion}/>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   logoContainer: {
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#000'
//   },
//   image: {
//     width: 30,
//     height: 30,
//     resizeMode: 'cover',
//   },
//   page: {
//     flex: 1,
//   },
// });

// export default NewChatScreen;