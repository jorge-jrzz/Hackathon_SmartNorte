import { Drawer } from 'expo-router/drawer';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(chat)/new" // This is the name of the page and must match the url from root
          options={{
            title: 'Nuevo chat',
            drawerIcon: () => (
              <View style={[styles.item, {backgroundColor: '#000'}]}>
                <Image
                  source={require('@/assets/images/logo_wite.png')}
                  style={styles.btnImage}
                />
              </View>
            ),
            headerRight: () => (
              <Link href="/(auth)/(drawer)/(chat)/new" push asChild>
                <Text style={{color: '#000'}}>Cancelar</Text>
              </Link>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.input,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundImage: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
});

export default Layout;
