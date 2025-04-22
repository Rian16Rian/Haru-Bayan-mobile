import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const StreetFoodSnacks = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', 'Street Food & Snacks');
      if (!error) setRecipes(data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Street Food & Snacks</Text>
      </View>

      {/* Recipe List */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,      // for safe‑area on top
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // center title
    marginBottom: 20,
    position: 'relative',      // allow absolute backButton
  },
  backButton: {
    position: 'absolute',
    left: 16,                  // match container padding
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default StreetFoodSnacks;
