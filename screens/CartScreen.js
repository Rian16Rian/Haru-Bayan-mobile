import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { Picker } from '@react-native-picker/picker';

const supabaseUrl = 'https://lngdoqimxolarajflobo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZ2RvcWlteG9sYXJhamZsb2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MjQ5MDQsImV4cCI6MjA2MDAwMDkwNH0.hDroH3E7cq-RHh8iGsbg5s1tdYVSHMI94ZSZXzoABic';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState('dine-in');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editQuantityModal, setEditQuantityModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('order').select('*');
    if (!error) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmOrder = async () => {
    // You can update order status in Supabase if needed here
    setModalVisible(false);
    setThankYouVisible(true);
  };

  const deleteOrder = async (id) => {
    await supabase.from('order').delete().eq('id', id);
    fetchOrders();
  };

  const updateQuantity = async () => {
    if (!newQuantity) return;
    await supabase.from('order').update({ quantity: parseInt(newQuantity) }).eq('id', selectedOrderId);
    setEditQuantityModal(false);
    setNewQuantity('');
    fetchOrders();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.dish_name}</Text>
      <Text style={styles.text}>Quantity: {item.quantity}</Text>
      <Text style={styles.text}>Price: ₱{item.price}</Text>
      <TouchableOpacity onPress={() => {
        setSelectedOrderId(item.id);
        setEditQuantityModal(true);
      }} style={styles.button}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => deleteOrder(item.id)} style={[styles.button, { backgroundColor: '#c0392b' }]}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>
      {loading ? <ActivityIndicator size="large" color="#9b001e" /> : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ gap: 10 }}
        />
      )}
      <TouchableOpacity style={styles.placeOrderBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.placeOrderText}>Place Order →</Text>
      </TouchableOpacity>

      {/* Confirm Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Your Orders to Confirm:</Text>
            <Picker
              selectedValue={selectedOrderType}
              onValueChange={(value) => setSelectedOrderType(value)}
              style={styles.dropdown}>
              <Picker.Item label="🍽️ Dine-In" value="dine-in" />
              <Picker.Item label="🥡 Takeout" value="takeout" />
            </Picker>
            <TouchableOpacity onPress={confirmOrder} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Thank You Modal */}
      <Modal visible={thankYouVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Thank You!</Text>
            <TouchableOpacity onPress={() => setThankYouVisible(false)} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Quantity Modal */}
      <Modal visible={editQuantityModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Quantity</Text>
            <TextInput
              value={newQuantity}
              onChangeText={setNewQuantity}
              placeholder="Enter new quantity"
              keyboardType="numeric"
              style={styles.input}
            />
            <TouchableOpacity onPress={updateQuantity} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditQuantityModal(false)} style={[styles.modalBtn, { backgroundColor: '#ccc' }]}> 
              <Text style={[styles.modalBtnText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 50, paddingHorizontal: 10 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#9b001e', marginBottom: 10, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, margin: 8, flex: 1, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#9b001e' },
  text: { fontSize: 14, marginVertical: 4, color: '#555' },
  button: { backgroundColor: '#9b001e', padding: 8, marginVertical: 5, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  placeOrderBtn: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#ce153a', padding: 14, borderRadius: 12, elevation: 4 },
  placeOrderText: { color: '#fff', fontWeight: 'bold' },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalBox: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '85%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#9b001e', marginBottom: 20 },
  dropdown: { width: '100%', height: 50, borderColor: '#9b001e', borderWidth: 1, borderRadius: 8, marginBottom: 20 },
  modalBtn: { backgroundColor: '#9b001e', padding: 12, borderRadius: 10, marginTop: 10, width: '100%', alignItems: 'center' },
  modalBtnText: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#9b001e', borderRadius: 8, padding: 10, width: '100%', marginBottom: 10 },
});
