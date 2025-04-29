import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

export default function ChooseSignupLogin({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/temple.jpg')} // Use your actual image path
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

          <Text style={styles.welcome}>Welcome Back!</Text>

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
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // semi-transparent white
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
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
});
