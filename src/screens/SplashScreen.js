import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <View style={styles.logoContainer}>
        {/* Icon cà rốt màu trắng */}
        <FontAwesome5 name="carrot" size={55} color="white" style={styles.icon} />
        
        <View style={styles.textWrapper}>
          <Text style={styles.logoText}>nectar</Text>
          <Text style={styles.sloganText}>online groceries</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175', // Màu xanh chuẩn Figma
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
    // Xoay nhẹ icon nếu muốn giống củ cà rốt trong ảnh hơn
    transform: [{ rotate: '-15deg' }] 
  },
  textWrapper: {
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 65,
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 65,
  },
  sloganText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 3,
    marginTop: -5,
    textTransform: 'uppercase', // In hoa giống mẫu
  },
});

export default SplashScreen;