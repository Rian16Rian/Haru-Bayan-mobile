import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, Text, Image, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';

const { width } = Dimensions.get('window');

const carouselItems = [
  {
    image: require('../assets/screen1.jpg'),
    caption: '"Bringing the heart of Japan to every Filipino plate—one authentic bite at a time."',
  },
  {
    image: require('../assets/screen2.jpg'),
    caption: '"Experience the rich taste of authentic Japanese cuisine."',
  },
  {
    image: require('../assets/screen3.jpg'),
    caption: '"Savor every bite. The flavors of Japan, now closer than ever."',
  },
  {
    image: require('../assets/screen4.jpg'),
    caption: '"Tradition in every bite. Passion in every dish."',
  },
];

export default function HomeScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Gibutang na ang renderCarouselItem sulod sa HomeScreen para magamit ang navigation
  const renderCarouselItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.overlay} />
      <View style={styles.carouselContent}>
        <Text style={styles.carouselCaption}>{item.caption}</Text>
        <TouchableOpacity
          style={styles.orderNowBtn}
          onPress={() => navigation.navigate('Menu')} // ✅ Mo-navigate na ni sa Menu screen
        >
          <Text style={styles.orderNowText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselItems.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // Auto-swipe every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  return (
    <ScrollView style={styles.container}>
      {/* 🖼️ Carousel */}
      <FlatList
        ref={flatListRef}
        data={carouselItems}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderCarouselItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />

      {/* 🍽️ Dine-In & Delivery Buttons */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => navigation.navigate('Menu')}
        >
          <Image source={require('../assets/dine.png')} style={styles.optionImage} />
          <Text style={styles.optionText}>DINE IN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => navigation.navigate('Menu')}
        >
          <Image source={require('../assets/delivery.png')} style={styles.optionImage} />
          <Text style={styles.optionText}>DELIVERY</Text>
        </TouchableOpacity>
      </View>

      {/* 🧡 About Haru Bayan */}
      <View style={styles.strongTextBox}>
        <Text style={styles.strongText}>
          Haru Bayan is a technology-driven fusion of digital & Filipino-inspired dining culture,
          offering an immersive food experience through dine-in and delivery services.
        </Text>
      </View>

      {/* 🍣 Sushi Image */}
      <Image source={require('../assets/sushi.jpg')} style={styles.sushiImage} />
    </ScrollView>
  );
}
