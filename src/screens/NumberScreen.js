import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NumberScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile number</Text>
        
        <Text style={styles.label}>Mobile Number</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.countrySection}>
            {/* Dùng ảnh quốc kỳ trong assets nếu có, hoặc dùng link tạm */}
            <Image 
              source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
              style={styles.flag} 
            />
            <Text style={styles.countryCode}>+880</Text>
          </View>
          
          <TextInput 
            style={styles.input}
            keyboardType="phone-pad" // Hiện bàn phím số
            placeholder="0123456789"
          />
        </View>
      </View>

      {/* Nút tròn xanh sang trang tiếp */}
      <TouchableOpacity style={styles.nextButton}>
        <Ionicons name="chevron-forward" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', width: width },
  backButton: { padding: 20 },
  content: { paddingHorizontal: 25, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  label: { color: '#7C7C7C', fontSize: 16, fontWeight: '600' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    marginTop: 10
  },
  countrySection: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  flag: { width: 25, height: 18, marginRight: 10 },
  countryCode: { fontSize: 18, color: '#181725' },
  input: { flex: 1, fontSize: 18 },
  nextButton: {
    position: 'absolute',
    right: 25,
    bottom: 50,
    backgroundColor: '#53B175',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default NumberScreen;