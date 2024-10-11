import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RootLayout() {
  const router = useRouter();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Index",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}