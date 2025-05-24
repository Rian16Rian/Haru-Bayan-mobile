import { useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const UserSignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://harubayan-backend.onrender.com/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: fullName,
          email: email,
          password: password,
          re_password: confirmPassword,
        }),
      });

const data = await response.json();
console.log('Signup response:', data);  // 🔍 Add this line

      if (response.ok) {
        navigation.navigate('OtpVerificationScreen', { username: fullName });
      } else {
        Alert.alert('Signup Failed', data.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Network request failed');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/temple.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/harulogo.png')}
              style={styles.logo}
            />
            <Text style={styles.logoText}>HARU-BAYAN</Text>
          </View>

          <Text style={styles.signupLabel}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.createAccountLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserSignupScreen;

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
  formContainer: {
    width: 300, // Width of the form container (same for input fields and button)
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // semi-transparent white
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    alignItems: 'center', // Center the contents
  },
  logoContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#b30000', // Color changed to match the "Create Account" label
    marginTop: 10,
    textAlign: 'center',
  },
  signupLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222', // Color changed to match "HARU-BAYAN" text
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#9b001e',
    fontSize: 16,
    width: '100%', // Ensures all input fields are the same width
  },
  button: {
    backgroundColor: '#9b001e',
    paddingVertical: 18, // Increased padding for a bigger button
    paddingHorizontal: 30, // Added horizontal padding to make it wider
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '100%', // Makes the button the same width as the input fields
  },
  buttonText: {
    fontSize: 16, // Increased font size
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
    color: '#333',
  },
  
  createAccountLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e91e63',
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
});
