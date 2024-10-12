// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Drawer } from 'expo-router/drawer';

import { Stack } from "expo-router";

// const Layout = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer>
//         <Drawer.Screen
//           name="index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: 'Home',
//             title: 'overview',
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// };

// export default Layout;

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