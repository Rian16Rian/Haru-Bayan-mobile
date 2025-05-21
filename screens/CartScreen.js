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
  Modal,
  Pressable,
} from 'react-native';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function OrderCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderType, setOrderType] = useState(null);
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
        .eq('customer_id', userId)
        .eq('status', 'pending'); // ✅ Only fetch pending

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

  const confirmPlaceOrder = () => {
    setShowModal(true);
  };

  const submitFinalOrder = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('username', username)
        .single();

      if (customerError) {
        Alert.alert('Error', customerError.message);
        return;
      }
      const userId = customer.id;

      const { data: orders, error: cartError } = await supabase
        .from('customers_order')
        .select('id, total_price')
        .eq('customer_id', userId)
        .eq('status', 'pending');

      if (cartError) {
        Alert.alert('Error', cartError.message);
        return;
      }

      if (!orders || orders.length === 0) {
        Alert.alert('Cart is empty', 'Please add items to your cart before placing an order.');
        return;
      }

      for (const order of orders) {
        const { error } = await supabase
          .from('place_order')
          .insert([
            {
              cart_id: order.id,
              total_amount: order.total_price,
              delivery_type: orderType,
              order_status: 'pending',
            },
          ]);

        if (error) console.error('Insert error:', error.message);
      }

      // ✅ Update status of customer orders to confirmed
      const { error: updateStatusError } = await supabase
        .from('customers_order')
        .update({ status: 'confirmed' })
        .eq('customer_id', userId)
        .eq('status', 'pending');

      if (updateStatusError) {
        Alert.alert('Warning', 'Order placed, but failed to update order status.');
      }

      Alert.alert('Success', 'Order placed successfully!');
      setShowModal(false);
      setOrderType(null);
      fetchCart();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
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
            onPress={() => handleQuantityChange(item.id, item.quantity + 1, item.menu_item.id)}
          >
            <Text style={styles.buttonText}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1, item.menu_item.id)}
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

      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose Order Type</Text>
            <View style={styles.optionRow}>
              <Pressable
                style={[
                  styles.optionButton,
                  orderType === 'Dine-in' && styles.selectedOption,
                ]}
                onPress={() => setOrderType('Dine-in')}
              >
                <Text style={styles.optionText}>Dine-in</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.optionButton,
                  orderType === 'Take-out' && styles.selectedOption,
                ]}
                onPress={() => setOrderType('Take-out')}
              >
                <Text style={styles.optionText}>Take-out</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={[styles.confirmBtn, !orderType && { opacity: 0.6 }]}
              onPress={submitFinalOrder}
              disabled={!orderType}
            >
              <Text style={styles.confirmText}>Confirm Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, marginTop: 20, fontWeight: 'bold', color: '#9b001e', marginBottom: 20, textAlign: 'center' },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff1f3', borderRadius: 10, padding: 10, marginBottom: 15, elevation: 2 },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 18, fontWeight: '600', color: '#333' },
  itemQty: { fontSize: 14, marginTop: 2, color: '#555' },
  itemPrice: { fontSize: 14, color: '#777' },
  totalPrice: { fontSize: 14, fontWeight: 'bold', color: '#9b001e' },
  actionButtons: { flexDirection: 'row', marginTop: 6, gap: 6 },
  adjustButton: { backgroundColor: '#e5e5e5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  deleteButton: { backgroundColor: '#ff4d4d', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd' },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#9b001e' },
  orderButton: { backgroundColor: '#9b001e', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  orderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#999' },
  modalWrapper: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#fff', padding: 20, width: '85%', borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  optionRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  optionButton: { backgroundColor: '#eee', padding: 12, borderRadius: 8 },
  selectedOption: { backgroundColor: '#9b001e' },
  optionText: { color: '#000', fontWeight: 'bold' },
  confirmBtn: { backgroundColor: '#9b001e', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, marginBottom: 10 },
  confirmText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: '#555', marginTop: 10 },
});
