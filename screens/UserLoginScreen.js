import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.11:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem('username', username);
        if (data.supabase_token) {
          await AsyncStorage.setItem('token', data.supabase_token);
        }
        Alert.alert('Success', data.message);
        navigation.navigate('Welcome'); // or the screen name where user should go
      
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/temple.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image source={require('../assets/harulogo.png')} style={styles.logo} />
          <Text style={styles.title}>HARU-BAYAN</Text>
          <Text style={styles.subtitle}>A Taste of Spring in Every Dish</Text>
          <Text style={styles.welcome}>Welcome Back!</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserSignup')}>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;


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
  formContainer: {
    width: 280,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9b001e',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#9b001e',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#f7c6d7',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  footerLink: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
