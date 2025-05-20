import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ChooseSignupLogin({ navigation }) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://192.168.41.12:8000/api/logout/', { method: 'POST' });
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('token');
      setUsername(null);
      Alert.alert('Success', 'You have been logged out.');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/temple.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image
            source={require('../assets/harulogo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>HARU-BAYAN</Text>
          <Text style={styles.subtitle}>A Taste of Spring in Every Dish</Text>

          <Text style={styles.welcome}>
            {username ? `Welcome back, ${username}!` : 'Welcome Back!'}
          </Text>

          {!username ? (
            <>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => navigation.navigate('UserLogin')}
              >
                <Text style={styles.signInText}>LOG IN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => navigation.navigate('UserSignup')}
              >
                <Text style={styles.signUpText}>SIGN UP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: '85%',
    alignItems: 'center',
    elevation: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b30000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#444',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 30,
  },
  signInButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  signInText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#8b0000',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
