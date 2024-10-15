import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
<<<<<<< HEAD
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
=======
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
>>>>>>> fork/main
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
<<<<<<< HEAD
=======
      <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons name="logo-google" size={16} style={styles.btnIcon} color={'#fff'} />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: '/login',
          params: { type: 'register' },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild>
        <TouchableOpacity>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color={'#fff'} />
          <Text style={styles.btnDarkText}>Sign up with email</Text>
        </TouchableOpacity>
      </Link>
>>>>>>> fork/main
      <Link
        href={{
          pathname: '/login',
          params: { type: 'login' },
        }}
<<<<<<< HEAD
        style={[defaultStyles.btn, styles.btnDark]}
        asChild>
        <TouchableOpacity>
          <Image 
                source={require('@/assets/images/banorte.png')} 
                style={[styles.btnIcon, { width: 20, height: 20 }]} 
            />
          <Text style={styles.btnDarkText}>Continuar con Banorte</Text>
        </TouchableOpacity>
      </Link>

      {/* <Link
        href={{
          pathname: '/login',
          params: { type: 'login' },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild>
        <TouchableOpacity>
          <Ionicons name="walk" size={20} style={styles.btnIcon} color={'#fff'} />
          <Text style={styles.btnDarkText}>Pase directo</Text>
        </TouchableOpacity>
      </Link> */}
=======
        style={[defaultStyles.btn, styles.btnOutline]}
        asChild>
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
>>>>>>> fork/main
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
<<<<<<< HEAD
    marginRight: 12,
    paddingRight: 32,
=======
    paddingRight: 6,
>>>>>>> fork/main
  },
});
export default BottomLoginSheet;
