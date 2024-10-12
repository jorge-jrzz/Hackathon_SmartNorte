import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Link, useNavigation, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useDrawerStatus } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: '#fff', paddingBottom: 16 }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.grey} />
          <TextInput
            style={styles.input} 
            placeholder="Buscar" 
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>
    <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }} {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    
    <View style={{ padding: 16, paddingBottom: bottom }}>
      <Image source={{ uri: 'https://avatars.githubusercontent.com/u/84686708?v=4'}} style={styles.avatar} />
      <Text style={styles.userName}>Jorge Juárez</Text>
    </View>
    </View>
  );
};

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} style={{ marginLeft: 16 }}>
            <FontAwesome6 name="grip-lines" size={28} color={Colors.grey}/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        overlayColor: 'rgba(0, 0, 0, 0.2)',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: dimensions.width * 0.86 },
      }}
      >
        <Drawer.Screen
          name="(chat)/new"
          getId={() => Math.random().toString()}
          options={{
            title: 'Maya',
            drawerIcon: () => (
              <View style={[styles.item, { backgroundColor: '#000' }]}>
                <Image source={require('@/assets/images/logo_white.png')} style={styles.btnImage} />
              </View>
            ),
            headerRight: () => (
              <Link href={'/(auth)/(drawer)/(chat)/new'} push asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.grey}
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
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
  }
});

export default Layout;
