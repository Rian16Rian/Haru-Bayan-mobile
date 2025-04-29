import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import MenuScreen from '../screens/MenuScreen';
import UserScreen from '../screens/UserScreen';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = require('../assets/buttons/home.png');
            } else if (route.name === 'Service') {
              iconSource = require('../assets/buttons/support.png');
            } else if (route.name === 'Menu') {
              iconSource = require('../assets/buttons/menu.png');
            } else if (route.name === 'User') {
              iconSource = require('../assets/buttons/user.png');
            }

            return (
              <Image
                source={iconSource}
                style={{
                  width: size,
                  height: size,
                  tintColor: color, // icon tint follows active/inactive color
                }}
              />
            );
          },
          // Inactive (not clicked) icon and label color is white
          tabBarInactiveTintColor: '#FFFFFF',
          // Active (clicked) icon and label color is light red
          tabBarActiveTintColor: '#FFD1D1',
          header: () => <Header />,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: {
            fontSize: 11,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Service" component={ServiceScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    borderRadius: 25,
    height: 58,
    backgroundColor: '#800000', // firebrick red
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    overflow: 'hidden',
  },
});
