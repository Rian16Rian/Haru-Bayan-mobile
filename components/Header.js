// components/CustomHeader.js
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.header}>
      {/* Logo on the left */}
      <Image
        source={require('../assets/harulogo.png')}
        style={styles.logo}
      />

      {/* User icon and dropdown on the right */}
      <View style={styles.userContainer}>
        {/* Replace the MaterialIcons with your custom PNG image */}
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Image
            source={require('../assets/dropdown.png')} // Replace with your dropdown PNG file
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingTop: 30,
    elevation: 4,
  },
  logo: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
    marginTop: 10,
  },
  userContainer: {
    position: 'relative',
    marginTop: 10,
  },
  dropdownIcon: {
    width: 50, // Adjust the width as needed for your PNG
    height: 40, // Adjust the height as needed for your PNG
    resizeMode: 'contain', // Ensures the image scales correctly
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 6,
    zIndex: 1,
    width: 120, // Adjust the width to fit the dropdown items
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
});
