import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';

// --- IMPORT CÁC TRANG ---
import SplashScreen from './src/screens/SplashScreen'; 
import OnboardingScreen from './src/screens/OnboardingScreen'; 
import SignInScreen from './src/screens/SignInScreen'; 
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen'; 
import ExploreScreen from './src/screens/ExploreScreen'; 
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import BeveragesScreen from './src/screens/BeveragesScreen'; 
import DairyEggScreen from './src/screens/Dairy_egg'; 
import FilterScreen from './src/screens/FilterScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import AccountScreen from './src/screens/AccountScreen'; 

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ===== TAB =====
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#53B175',
        tabBarInactiveTintColor: '#181725',
        tabBarStyle: { height: 70, paddingBottom: 10 },
      }}
    >
      <Tab.Screen 
        name="Shop" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Ionicons name="storefront-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ tabBarIcon: ({color}) => <Feather name="search" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ tabBarIcon: ({color}) => <Ionicons name="cart-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ tabBarIcon: ({color}) => <Ionicons name="bag-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Favourite" 
        component={FavouriteScreen}
        options={{ tabBarIcon: ({color}) => <Ionicons name="heart-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{ tabBarIcon: ({color}) => <Feather name="user" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

// ===== INTRO FLOW =====
const IntroFlow = ({ navigation }) => {
  const scrollRef = React.useRef(null);

  const scrollToPage = (pageIndex) => {
    scrollRef.current?.scrollTo({ x: pageIndex * width, animated: true });
  };

  return (
    <ScrollView 
      ref={scrollRef}
      horizontal 
      pagingEnabled 
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ width }}><SplashScreen onNext={() => scrollToPage(1)} /></View>
      <View style={{ width }}><OnboardingScreen onNext={() => scrollToPage(2)} /></View>
      <View style={{ width }}><SignInScreen onNext={() => scrollToPage(3)} /></View>
      <View style={{ width }}>
        <LoginScreen onLoginSuccess={() => navigation.replace('MainApp')} />
      </View>
    </ScrollView>
  );
};

// ===== APP =====
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroFlow} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Beverages" component={BeveragesScreen} />
        <Stack.Screen name="DairyEgg" component={DairyEggScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}