import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import SplashScreen from './src/screens/SplashScreen'; 
import OnboardingScreen from './src/screens/OnboardingScreen'; 
import SignInScreen from './src/screens/SignInScreen'; 
import NumberScreen from './src/screens/NumberScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import LocationScreen from './src/screens/LocationScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <View style={{ width }}><SplashScreen /></View>
        <View style={{ width }}><OnboardingScreen /></View>
        <View style={{ width }}><SignInScreen /></View>
        <View style={{ width }}><NumberScreen /></View>
        <View style={{ width }}><VerificationScreen /></View>
        <View style={{ width }}><LocationScreen /></View>
        <View style={{ width }}><LoginScreen /></View>
        <View style={{ width }}><SignUpScreen /></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});