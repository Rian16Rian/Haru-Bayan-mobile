import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

const MainDish = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from("menu")
        .select(`
          id,
          price,
          description,
          recipes:recipe_id (
            name,
            category,
            image_url
          )
        `)
        .eq('recipes.category', 'Main Dish');

      if (error) {
        console.error("Error fetching menu:", error);
      } else {
        setRecipes(data);
      }
    };

    fetchMenu();
  }, []);

  const renderItem = ({ item }) => {
    if (!item.recipes) return null;

    const { name, image_url } = item.recipes;

    const fullImageUrl = image_url || null;

    return (
      <View style={styles.card}>
        {fullImageUrl && (
          <Image
            source={{ uri: fullImageUrl }}
            style={styles.image}
            onError={() => console.log('Image failed to load:', fullImageUrl)}
          />
        )}
        <Text style={styles.name}>{String(name)}</Text>
        <Text style={styles.price}>₱{parseFloat(item.price).toFixed(2)}</Text>
        <Text style={styles.description}>{String(item.description)}</Text>
        <TouchableOpacity style={styles.button}>
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
});

export default MainDish;