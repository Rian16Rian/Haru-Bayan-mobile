import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OptionButton({ icon, label }) {
  return (
    <TouchableOpacity style={styles.optionButton}>
      <Ionicons name={icon} size={40} color="white" />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: '#9b001e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    marginTop: 5,
  },
});
