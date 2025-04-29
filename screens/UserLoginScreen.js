import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/sakura.jpg')} // Make sure the path is correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/harulogo.png')} // Your logo
            style={styles.logo}
          />
          <Text style={styles.logoText}>HARU-BAYAN</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.loginLabel}>LOGIN</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
          />

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuScreen')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserSignup')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginTop: -10,
  },
  formContainer: {
    width: 320,
  },
  loginLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 3,
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
