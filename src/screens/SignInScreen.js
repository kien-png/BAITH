import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Ảnh nền rau củ phía trên */}
      <Image 
        source={require('../../assets/trang3.jpg')} 
        style={styles.topImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

        {/* 2. Ô nhập số điện thoại với quốc kỳ */}
        <View style={styles.inputSection}>
          <View style={styles.countryPicker}>
            <Image 
              source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
              style={styles.flag} 
            />
            <Text style={styles.countryCode}>+880</Text>
          </View>
          <TextInput 
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter mobile number"
          />
        </View>

        <Text style={styles.connectText}>Or connect with social media</Text>

        {/* 3. Nút Google */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#5383EC' }]}>
          <FontAwesome name="google" size={24} color="white" style={styles.icon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* 4. Nút Facebook */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4A66AC', marginTop: 20 }]}>
          <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topImage: {
    width: '100%',
    height: 300,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
    lineHeight: 35,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 15,
    marginTop: 30,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  flag: {
    width: 25,
    height: 18,
    borderRadius: 2,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    color: '#181725',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  connectText: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 14,
    marginVertical: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 19,
    width: '100%',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 30,
  },
  socialText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignInScreen;