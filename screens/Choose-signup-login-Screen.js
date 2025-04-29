import React from 'react';
import UserSignup from '../screens/UserSignupScreen';
import UserLogin from '../screens/UserLoginScreen';


import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function ChooseSignupLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/harulogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>HARU-BAYAN</Text>
        <Text style={styles.subtitle}>A Taste of Spring in Every Dish</Text>
      </View>

      <Text style={styles.welcome}>Welcome Back !</Text>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('UserLogin')}
      >
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('UserSignup')} // Navigate to UserSignup
        >
    <Text style={styles.signUpText}>SIGN UP</Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d0000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: -10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  signInButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpText: {
    color: '#b30000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
