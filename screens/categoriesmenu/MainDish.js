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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

const MainDish = () => {
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  // get userData from route params (or however you pass user info)
  const userData = route.params?.userData || null;

  useEffect(() => {
    const fetchMenu = async () => {
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

    fetchMenu();
  }, []);

  const handleAddToOrderPress = (item) => {
    setSelectedItem(item);
    setSelectedQuantity('1'); // reset quantity to 1 each time
    setModalVisible(true);
  };

  const handleConfirmOrder = async () => {
    if (!userData) {
      alert('You need to login or create an account first to confirm your order.');
      setModalVisible(false);
      navigation.navigate('UserLogin');  // redirect to Login screen
      return;
    }

    const customer_id = userData.id;
    const quantity = parseInt(selectedQuantity);
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    const total = selectedItem.price * quantity;

    try {
      const { data, error } = await supabase
        .from('customers_order')
        .insert([
          {
            customer_id,
            menu_item_id: selectedItem.id,
            quantity,
            total_price: total,
            status: 'pending',
          },
        ]);

      if (error) {
        alert(`Failed to add order: ${error.message}`);
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
    const fullImageUrl = image_url || null;
    const isAvailable = item.available;

    return (
      <View style={styles.card}>
        {fullImageUrl && (
          <Image
            source={{ uri: fullImageUrl }}
            style={[styles.image, !isAvailable && styles.unavailableImage]}
            onError={() => console.log('Image failed to load:', fullImageUrl)}
          />
        )}
        <Text style={styles.name}>{String(name)}</Text>
        <Text style={styles.price}>₱{parseFloat(item.price).toFixed(2)}</Text>
        <Text style={styles.description}>{String(item.description)}</Text>
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

      {/* Modal for Quantity */}
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
              maxLength={3}
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#aaa' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#e63946' }]}
                onPress={handleConfirmOrder}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#e63946',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  status: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
  },
  unavailableImage: {
    opacity: 0.3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainDish;
