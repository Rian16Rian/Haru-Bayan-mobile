import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './navigation/TabNavigator';
import CartScreen from './screens/CartScreen'; // Adjust path as needed
import OtpVerificationScreen from './screens/OtpVerificationScreen';
import WelcomeScreen from './screens/WelcomeScreen';


import MenuScreen from './screens/MenuScreen';


//all dish categories
import Appetizers from './screens/categoriesmenu/Appetizers';
import Beverages from './screens/categoriesmenu/Beverages';
import DessertsSweets from './screens/categoriesmenu/DessertsSweets';
import MainDish from './screens/categoriesmenu/MainDish';
import Noodles from './screens/categoriesmenu/Noodles';
import RiceDishes from './screens/categoriesmenu/RiceDishes';
import SideDishes from './screens/categoriesmenu/SideDishes';
import SoupsStews from './screens/categoriesmenu/SoupsStews';
import StreetFoodSnacks from './screens/categoriesmenu/StreetFoodSnacks';

import UserLogin from './screens/UserLoginScreen';
import UserSignup from './screens/UserSignupScreen';


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
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        <Stack.Screen name ="UserLogin" component={UserLogin}/>
        <Stack.Screen name ="MenuScreen" component={MenuScreen}/>
        <Stack.Screen name="Cart" component={CartScreen} />



        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
