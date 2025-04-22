import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'; // Import Image component
import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import MenuScreen from '../screens/MenuScreen';
import UserScreen from '../screens/UserScreen';
import CustomHeader from '../components/Header'; // Import your header component

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
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
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
        tabBarActiveTintColor: '#8B0000',
        tabBarInactiveTintColor: 'gray',
        header: () => <CustomHeader />, // Add the CustomHeader globally here
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Service" component={ServiceScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
