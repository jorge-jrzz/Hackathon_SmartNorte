import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false,
        title: "Index",
      }}/>
      <Stack.Screen name="login" options={{
        presentation: "modal",
      }}/>
    </Stack>
  );
}
