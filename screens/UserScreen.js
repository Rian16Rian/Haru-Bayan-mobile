import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const UserScreen = () => {
  return (
    <ImageBackground 
      source={require('../assets/sakura.jpg')} // Ensure this path is correct
      style={styles.background} 
      resizeMode="cover" // Ensures the image covers the full screen
    >
      <View style={styles.container}>
        {/* Centered Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/harulogo.png')} // Ensure this path is correct
            style={styles.logo}
          />
          <Text style={styles.logoText}>HARU-BAYAN</Text>
        </View>

        {/* Create Account Form */}
        <View style={styles.formContainer}>
          <Text style={styles.createAccountLabel}>CREATE ACCOUNT</Text>
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
          />

          {/* Create Account Button */}
          <TouchableOpacity style={styles.button} onPress={() => alert('Create Account')}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Already have an account? */}
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Navigate to Login')}>
            <Text style={styles.createAccountLink}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background takes up the full screen
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
    fontSize: 28, // Larger than CREATE ACCOUNT label
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    width: 320, // Fixed width for form (doesn't stretch across full screen)
    marginTop: 10,
  },
  createAccountLabel: {
    fontSize: 18, // Smaller than logo text
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left', // Align the label to the left
  },
  input: {
    backgroundColor: '#fff',
    padding: 16, // Increased padding for larger input fields
    marginBottom: 14, // Adjust spacing between inputs
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#9b001e',
    fontSize: 18, // Larger font sie for inputs
  },
  button: {
    backgroundColor: '#9b001e',
    paddingVertical: 18, // Larger padding for the button
    borderRadius: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20, // Larger button text
    fontWeight: '600',
    color: '#f7c6d7',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 18,
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
