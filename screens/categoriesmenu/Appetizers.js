import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../AuthContext'; // Adjust path as needed


const Appetizers = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth(); // ✅ get user

  // ✅ Add this to debug user value
  useEffect(() => {
    console.log("Appetizers screen - user:", user);
  }, [user]);

  useEffect(() => {
    const fetchMenu = async () => {
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
        .eq('recipes.category', 'Appetizers');

      if (error) {
        console.error("Error fetching menu:", error);
      } else {
        setRecipes(data);
      }
    };

    fetchMenu();
  }, []);


  const handleAddToOrder = async (item) => {
    if (!user) {
      alert('Please log in to add items to your order.');
      return;
    }
  
    try {
      const { error } = await supabase.from('orders').insert([
        {
          user_id: user.id,
          menu_id: item.id, // or however your menu is related
          quantity: 1, // Default to 1, you can customize this
          status: 'pending', // Optional, depends on your schema
        },
      ]);
  
      if (error) {
        console.error('Add to order failed:', error);
        alert('Something went wrong adding to order.');
      } else {
        alert('Item added to order!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };
  

  const renderItem = ({ item }) => {
    if (!item.recipes) return null;
  
    const { name, image_url } = item.recipes;
    const fullImageUrl = image_url || null;
    const isAvailable = item.available; // update from is_available if needed
  
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
  onPress={() => handleAddToOrder(item)}
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
        <Text style={styles.headerTitle}>Appetizers</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
    opacity: 0.3, // visually looks like gray/dimmed
  },
  
});

export default Appetizers;
