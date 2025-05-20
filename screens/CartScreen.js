import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function OrderCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCart();
    const unsubscribe = navigation.addListener('focus', fetchCart);
    return unsubscribe;
  }, []);

  async function fetchCart() {
    setLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        Alert.alert('Error', 'User not logged in');
        setLoading(false);
        return;
      }

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('username', username)
        .single();

      if (customerError) {
        Alert.alert('Error', customerError.message);
        setLoading(false);
        return;
      }

      const userId = customer.id;

      const { data, error } = await supabase
        .from('customers_order')
        .select(`
          id,
          quantity,
          total_price,
          menu_item:menu (
            id,
            price,
            recipes (
              name,
              image_url
            )
          )
        `)
        .eq('customer_id', userId);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setCartItems(data);
        const total = data.reduce((acc, item) => acc + item.total_price, 0);
        setTotalAmount(total);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (itemId) => {
    const { error } = await supabase.from('customers_order').delete().eq('id', itemId);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      fetchCart();
    }
  };

  const handleQuantityChange = async (itemId, newQuantity, menuId) => {
    if (newQuantity < 1) {
      handleDelete(itemId);
      return;
    }

    const { data: menuItem } = await supabase
      .from('menu')
      .select('price')
      .eq('id', menuId)
      .single();

    const newTotal = menuItem.price * newQuantity;

    const { error } = await supabase
      .from('customers_order')
      .update({
        quantity: newQuantity,
        total_price: newTotal,
      })
      .eq('id', itemId);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      fetchCart();
    }
  };

  const confirmPlaceOrder = async () => {
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to place your order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const username = await AsyncStorage.getItem('username');
              if (!username) {
                Alert.alert('Error', 'User not logged in');
                return;
              }

              // Get user id
              const { data: customer, error: customerError } = await supabase
                .from('customers')
                .select('id')
                .eq('username', username)
                .single();

              if (customerError) {
                Alert.alert('Error', customerError.message);
                return;
              }

              // Delete all orders for this user
              const { error } = await supabase
                .from('customers_order')
                .delete()
                .eq('customer_id', customer.id);

              if (error) {
                Alert.alert('Error', error.message);
              } else {
                Alert.alert('Order Placed', 'Thank you for your order!');
                fetchCart(); // refresh cart to show empty
              }
            } catch (err) {
              Alert.alert('Error', err.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.menu_item.recipes.image_url }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.menu_item.recipes.name}</Text>
        <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
        <Text style={styles.itemPrice}>₱{item.menu_item.price.toFixed(2)}</Text>
        <Text style={styles.totalPrice}>Total: ₱{item.total_price.toFixed(2)}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() =>
              handleQuantityChange(item.id, item.quantity + 1, item.menu_item.id)
            }
          >
            <Text style={styles.buttonText}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() =>
              handleQuantityChange(item.id, item.quantity - 1, item.menu_item.id)
            }
          >
            <Text style={styles.buttonText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#9b001e" />
      ) : cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>₱{totalAmount.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.orderButton} onPress={confirmPlaceOrder}>
            <Text style={styles.orderText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#9b001e',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff1f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemQty: {
    fontSize: 14,
    marginTop: 2,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#777',
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9b001e',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  adjustButton: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9b001e',
  },
  orderButton: {
    backgroundColor: '#9b001e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  orderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#999',
  },
});
