import React from 'react';
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
import BeveragesScreen from './src/screens/BeveragesScreen'; // <<-- PHẢI THÊM DÒNG NÀY

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Cấu trúc Tab Bar
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#53B175', // Màu xanh chuẩn
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
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Ionicons name="cart-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Favourite" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Ionicons name="heart-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Account" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Feather name="user" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

// 2. Luồng cuộn trang (IntroFlow)
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
      <View style={{ width }}><LoginScreen onLoginSuccess={() => navigation.replace('MainApp')} /></View>
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroFlow} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Beverages" component={BeveragesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}