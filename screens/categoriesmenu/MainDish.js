import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainDish = () => {
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);

      const { data, error } = await supabase
        .from('menu')
        .select(`
          id,
          price,
          description,
          available,
          recipes:recipe_id (
            name,
            category,
            image_url
          )
        `)
        .eq('recipes.category', 'Main Dish');

      if (error) {
        console.error('Error fetching menu:', error);
      } else {
        setRecipes(data);
      }
    };

    fetchData();
  }, []);

  const handleAddToOrderPress = (item) => {
    setSelectedItem(item);
    setSelectedQuantity('1');
    setModalVisible(true);
  };

  const handleConfirmOrder = async () => {
    if (!username) {
      Alert.alert(
        'Login Required',
        'Please login to confirm your order.',
        [{ text: 'OK', onPress: () => navigation.navigate('UserLogin') }]
      );
      setModalVisible(false);
      return;
    }

    const quantity = parseInt(selectedQuantity);
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    const total = selectedItem.price * quantity;

    // 🔍 Get customer_id from username
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .select('id')
      .eq('username', username)
      .single();

    if (customerError || !customerData) {
      alert('Customer not found.');
      setModalVisible(false);
      return;
    }

    const customer_id = customerData.id;

    try {
      const { error: insertError } = await supabase.from('customers_order').insert([
        {
          customer_id: customer_id,
          menu_item_id: selectedItem.id,
          quantity,
          total_price: total,
          status: 'pending',
        },
      ]);

      if (insertError) {
        alert('Failed to confirm order: ' + insertError.message);
      } else {
        alert('Order confirmed!');
        setModalVisible(false);
      }
    } catch (e) {
      alert('Unexpected error: ' + e.message);
    }
  };

  const renderItem = ({ item }) => {
    if (!item.recipes) return null;

    const { name, image_url } = item.recipes;
    const isAvailable = item.available;

    return (
      <View style={styles.card}>
        {image_url && (
          <Image
            source={{ uri: image_url }}
            style={[styles.image, !isAvailable && styles.unavailableImage]}
          />
        )}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₱{parseFloat(item.price).toFixed(2)}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={[styles.status, { color: isAvailable ? 'green' : 'red' }]}>
          {isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
        </Text>
        <TouchableOpacity
          style={[styles.button, !isAvailable && { backgroundColor: '#aaa' }]}
          disabled={!isAvailable}
          onPress={() => handleAddToOrderPress(item)}
        >
          <Text style={styles.buttonText}>Add to Order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Main Dish</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Quantity</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={selectedQuantity}
              onChangeText={setSelectedQuantity}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirmOrder}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MainDish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fdfdfd',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  unavailableImage: {
    opacity: 0.4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#b30000',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#9b001e',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#9b001e',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
