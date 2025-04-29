import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const UserScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/sakura.jpg')}
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/harulogo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>HARU-BAYAN</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.createAccountLabel}>CREATE YOUR ACCOUNT</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#888"
          />

          {/* Signup Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('UserLogin')}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Already have account? */}
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserLogin')}>
            <Text style={styles.createAccountLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: -15,
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    width: 280,
    marginTop: 10,
  },
  createAccountLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: '#9b001e',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#9b001e',
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#f7c6d7',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  createAccountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 5,
  },
  createAccountLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e91e63',
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
});
