import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
<<<<<<< HEAD
import { View, StyleSheet, Platform, Alert } from 'react-native';
=======
import { View, StyleSheet } from 'react-native';
>>>>>>> fork/main
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
<<<<<<< HEAD
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
=======
>>>>>>> fork/main

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type Props = {
  onShouldSend: (message: string) => void;
};

const MessageInput = ({ onShouldSend }: Props) => {
  const [message, setMessage] = useState('');
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);

<<<<<<< HEAD
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

=======
>>>>>>> fork/main
  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const expandButtonStyle = useAnimatedStyle(() => {
<<<<<<< HEAD
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );
=======
    const opacityInterpolation = interpolate(expanded.value, [0, 1], [1, 0], Extrapolation.CLAMP);
    const widthInterpolation = interpolate(expanded.value, [0, 1], [30, 0], Extrapolation.CLAMP);
>>>>>>> fork/main

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
<<<<<<< HEAD
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );
=======
    const widthInterpolation = interpolate(expanded.value, [0, 1], [0, 100], Extrapolation.CLAMP);
>>>>>>> fork/main
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });

  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  const onSend = () => {
    onShouldSend(message);
    setMessage('');
  };

<<<<<<< HEAD
  const startRecording = async () => {
    try {
      // Solicitar permisos de audio
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permiso requerido', 'Se requieren permisos de audio para grabar.');
        return;
      }

      // Configurar las opciones de grabación
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Iniciar la grabación
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        // Guardar el archivo en FileSystem.documentDirectory + 'audios/'
        const directory = FileSystem.documentDirectory + 'audios/';
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

        const fileName = `audio_${Date.now()}.m4a`;
        const filePath = directory + fileName;

        await FileSystem.moveAsync({
          from: uri,
          to: filePath,
        });

        console.log('Archivo de audio guardado en:', filePath);

        // Llama a la función de transcripción
        const transcription = await transcribeAudio(filePath);

        if (transcription) {
          // Puedes manejar la transcripción aquí, por ejemplo, enviarla como mensaje
          onShouldSend(transcription);
        } else {
          console.error('No se pudo obtener la transcripción.');
        }
      }
    } catch (error) {
      console.error('Error al detener la grabación:', error);
    }
  };

  const transcribeAudio = async (filePath: string) => {
    try {
      // Verifica que el archivo existe
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        console.error('El archivo no existe en la ruta:', filePath);
        return;
      }

      // Crea el objeto de archivo para FormData
      const fileUri = fileInfo.uri;
      const fileName = filePath.split('/').pop();

      const file = {
        uri: fileUri,
        type: 'audio/m4a', // Ajusta el tipo MIME según el formato de tu archivo
        name: fileName || 'audio.m4a',
      };

      // Construye FormData
      const formData = new FormData();
      formData.append('file', file as any); // 'as any' para evitar problemas de tipo
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'text');

      // Realiza la solicitud a la API de OpenAI
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.EXPO_PUBLIC_OPENAI_API_KEY
          // No agregues 'Content-Type', fetch establecerá el encabezado correctamente
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta de OpenAI:', errorData);
        return;
      }

      const transcription = await response.text(); // Como 'response_format' es 'text'

      console.log('Transcripción:', transcription);
      return transcription;
    } catch (error) {
      console.error('Error al transcribir el audio:', error);
    }
  };

  return (
    <BlurView
      intensity={90}
      tint="extraLight"
      style={{ paddingBottom: bottom, paddingTop: 10 }}
    >
=======
  const onSelectCard = (text: string) => {
    onShouldSend(text);
  };

  return (
    <BlurView intensity={90} tint="extraLight" style={{ paddingBottom: bottom, paddingTop: 10 }}>
>>>>>>> fork/main
      <View style={styles.row}>
        <ATouchableOpacity onPress={expandItems} style={[styles.roundBtn, expandButtonStyle]}>
          <Ionicons name="add" size={24} color={Colors.grey} />
        </ATouchableOpacity>

        <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
            <Ionicons name="camera-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ImagePicker.launchImageLibraryAsync()}>
            <Ionicons name="image-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name="folder-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </Animated.View>

        <TextInput
<<<<<<< HEAD
          ref={inputRef}
          placeholder="Mensaje"
=======
          autoFocus
          ref={inputRef}
          placeholder="Message"
>>>>>>> fork/main
          style={styles.messageInput}
          onFocus={collapseItems}
          onChangeText={onChangeText}
          value={message}
          multiline
        />
        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons name="arrow-up-circle" size={24} color={Colors.grey} />
          </TouchableOpacity>
        ) : (
<<<<<<< HEAD
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <FontAwesome5
              name="microphone"
              size={24}
              color={isRecording ? Colors.green : Colors.grey}
            />
=======
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
>>>>>>> fork/main
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

<<<<<<< HEAD

=======
>>>>>>> fork/main
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
<<<<<<< HEAD

export default MessageInput;


// -----------------------------

// **** Antiguo componente (sin speech recognition) ****

// import Colors from '@/constants/Colors';
// import { Ionicons } from '@expo/vector-icons';
// import { View, StyleSheet } from 'react-native';
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useRef, useState } from 'react';
// import { BlurView } from 'expo-blur';
// import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';

// const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// export type Props = {
//   onShouldSend: (message: string) => void;
// };

// const MessageInput = ({ onShouldSend }: Props) => {
//   const [message, setMessage] = useState('');
//   const { bottom } = useSafeAreaInsets();
//   const expanded = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   const expandItems = () => {
//     expanded.value = withTiming(1, { duration: 400 });
//   };

//   const collapseItems = () => {
//     expanded.value = withTiming(0, { duration: 400 });
//   };

//   const expandButtonStyle = useAnimatedStyle(() => {
//     const opacityInterpolation = interpolate(expanded.value, [0, 1], [1, 0], Extrapolation.CLAMP);
//     const widthInterpolation = interpolate(expanded.value, [0, 1], [30, 0], Extrapolation.CLAMP);

//     return {
//       opacity: opacityInterpolation,
//       width: widthInterpolation,
//     };
//   });

//   const buttonViewStyle = useAnimatedStyle(() => {
//     const widthInterpolation = interpolate(expanded.value, [0, 1], [0, 100], Extrapolation.CLAMP);
//     return {
//       width: widthInterpolation,
//       opacity: expanded.value,
//     };
//   });

//   const onChangeText = (text: string) => {
//     collapseItems();
//     setMessage(text);
//   };

//   const onSend = () => {
//     onShouldSend(message);
//     setMessage('');
//   };

//   const onSelectCard = (text: string) => {
//     onShouldSend(text);
//   };

//   return (
//     <BlurView intensity={90} tint="extraLight" style={{ paddingBottom: bottom, paddingTop: 10 }}>
//       <View style={styles.row}>
//         <ATouchableOpacity onPress={expandItems} style={[styles.roundBtn, expandButtonStyle]}>
//           <Ionicons name="add" size={24} color={Colors.grey} />
//         </ATouchableOpacity>

//         <Animated.View style={[styles.buttonView, buttonViewStyle]}>
//           <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
//             <Ionicons name="camera-outline" size={24} color={Colors.grey} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => ImagePicker.launchImageLibraryAsync()}>
//             <Ionicons name="image-outline" size={24} color={Colors.grey} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
//             <Ionicons name="folder-outline" size={24} color={Colors.grey} />
//           </TouchableOpacity>
//         </Animated.View>

//         <TextInput
//           autoFocus
//           ref={inputRef}
//           placeholder="Message"
//           style={styles.messageInput}
//           onFocus={collapseItems}
//           onChangeText={onChangeText}
//           value={message}
//           multiline
//         />
//         {message.length > 0 ? (
//           <TouchableOpacity onPress={onSend}>
//             <Ionicons name="arrow-up-circle" size={24} color={Colors.grey} />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity>
//             <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
//           </TouchableOpacity>
//         )}
//       </View>
//     </BlurView>
//   );
// };
=======
export default MessageInput;
>>>>>>> fork/main
