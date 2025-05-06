import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation(); // Hook for navigation

  return (
    <View style={styles.header}>
      {/* Logo on the left */}
      <Image
        source={require('../assets/harulogo.png')}
        style={styles.logo}
      />

      {/* Shopping Cart icon on the right */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Cart')} // Navigate to Cart screen
      >
        <Image
          source={require('../assets/cart.png')} // Replace with your cart icon
          style={styles.cartIcon}
        />
      </TouchableOpacity>
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
  iconContainer: {
    marginTop: 10,
  },
  cartIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
