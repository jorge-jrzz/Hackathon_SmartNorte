import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)" // This is the name of the page and must match the url from root
        options={{ headerShown: false, headerTitle: 'Home' }}
      />
    </Stack>
  );
}

export default Layout;