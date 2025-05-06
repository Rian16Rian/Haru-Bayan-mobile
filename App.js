import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import TabNavigator from './navigation/TabNavigator'; 
import CartScreen from './screens/CartScreen'; // Adjust path as needed


import MenuScreen from './screens/MenuScreen';


//all dish categories
import MainDish from './screens/categoriesmenu/MainDish';
import Noodles from './screens/categoriesmenu/Noodles';
import RiceDishes from './screens/categoriesmenu/RiceDishes';
import SoupsStews from './screens/categoriesmenu/SoupsStews';
import SideDishes from './screens/categoriesmenu/SideDishes';
import Appetizers from './screens/categoriesmenu/Appetizers';
import StreetFoodSnacks from './screens/categoriesmenu/StreetFoodSnacks';
import DessertsSweets from './screens/categoriesmenu/DessertsSweets';
import Beverages from './screens/categoriesmenu/Beverages';

import UserSignup from './screens/UserSignupScreen';
import UserLogin from './screens/UserLoginScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />

        <Stack.Screen name="MainDish" component={MainDish} />
        <Stack.Screen name="Noodles" component={Noodles} />
        <Stack.Screen name="RiceDishes" component={RiceDishes} />
        <Stack.Screen name="SoupsStews" component={SoupsStews} />
        <Stack.Screen name="SideDishes" component={SideDishes} />
        <Stack.Screen name="Appetizers" component={Appetizers} />
        <Stack.Screen name="StreetFoodSnacks" component={StreetFoodSnacks} />
        <Stack.Screen name="DessertsSweets" component={DessertsSweets} />
        <Stack.Screen name="Beverages" component={Beverages} />

        <Stack.Screen name ="UserSignup" component={UserSignup}/>
        <Stack.Screen name ="UserLogin" component={UserLogin}/>
        <Stack.Screen name ="MenuScreen" component={MenuScreen}/>
        <Stack.Screen name="Cart" component={CartScreen} />



        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
