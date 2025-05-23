import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../../lib/supabase';

const SideDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMenu = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);

      const { data, error } = await supabase
        .from("menu")
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
        .eq('recipes.category', 'Side Dishes');

      if (error) {
        console.error("Error fetching menu:", error);
      } else {
        setRecipes(data);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToOrderPress = (item) => {
    setSelectedItem(item);
    setSelectedQuantity('1');
    setModalVisible(true);
  };

  const handleConfirmOrder = async () => {
    if (!username) {
      Alert.alert('Login Required', 'Please login to confirm your order.', [
        { text: 'OK', onPress: () => navigation.navigate('UserLogin') },
      ]);
      setModalVisible(false);
      return;
    }

    const quantity = parseInt(selectedQuantity);
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    const total = selectedItem.price * quantity;

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
          customer_id,
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
            onError={() => console.log('Image failed to load:', image_url)}
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
        <Text style={styles.headerTitle}>Side Dishes</Text>
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
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmOrder}>
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

export default SideDishes;

// Same styles + modal styles
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
    backgroundColor: '#e63946',
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
