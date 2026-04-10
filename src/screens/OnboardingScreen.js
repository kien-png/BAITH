import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
// Sử dụng icon cà rốt trắng tạm thời
import { FontAwesome5 } from '@expo/vector-icons';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Sử dụng tên file ảnh là trang2.jpg như bạn đã đặt */}
      <ImageBackground 
        source={require('../../assets/trang2.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          
          {/* Logo cà rốt trắng */}
          <FontAwesome5 name="carrot" size={50} color="white" style={styles.icon} />
          
          <Text style={styles.title}>Welcome{"\n"}to our store</Text>
          <Text style={styles.subtitle}>Ger your groceries in as fast as one hour</Text>
          
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingHorizontal: 30,
    paddingBottom: 90,
    alignItems: 'center',
    // Tạo độ mờ nhẹ ở dưới để chữ trắng nổi bật trên nền ảnh
    backgroundColor: 'rgba(0,0,0,0.15)', 
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 55,
  },
  subtitle: {
    color: 'rgba(252, 252, 252, 0.7)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#53B175',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 19,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;