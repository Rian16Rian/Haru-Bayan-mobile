import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OtpVerificationScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(false);

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://192.168.1.11:8000/api/auth/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Your account has been verified!');
        navigation.navigate('UserLogin');
      } else {
        Alert.alert('Verification Failed', data.error || 'Invalid OTP.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Network request failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendCooldown(true);

      const response = await fetch('http://192.168.1.11:8000/api/auth/resend-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
      } else {
        Alert.alert('Failed to Resend', data.error || 'Please try again later.');
      }

      // Cooldown for 30 seconds
      setTimeout(() => setResendCooldown(false), 30000);
    } catch (error) {
      console.error('OTP resend error:', error);
      Alert.alert('Error', 'Network request failed');
      setResendCooldown(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP</Text>
      <Text style={styles.subText}>We sent a code to: {username}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.resendButton, resendCooldown && styles.resendButtonDisabled]}
        onPress={handleResendOtp}
        disabled={resendCooldown}
      >
        <Text style={styles.resendText}>
          {resendCooldown ? 'Please wait...' : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#9b001e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9b001e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: '#9b001e',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
