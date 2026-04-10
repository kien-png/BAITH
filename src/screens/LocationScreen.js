import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LocationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Ảnh minh họa bản đồ */}
       // Thay đổi từ uri sang require ảnh nội bộ
<Image 
  source={require('../../assets/map.png')} 
  style={styles.mapImage}
  resizeMode="contain"
/>

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.description}>
          Switch on your location to stay in tune with what’s happening in your area
        </Text>
        
        {/* Phần chọn Zone */}
        <View style={styles.selectGroup}>
          <Text style={styles.label}>Your Zone</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Banasree</Text>
            <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        {/* Phần chọn Area */}
        <View style={styles.selectGroup}>
          <Text style={styles.label}>Your Area</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.placeholderText}>Types of your area</Text>
            <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        {/* Nút Submit */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', width: width },
  backButton: { padding: 20 },
  content: { paddingHorizontal: 25, alignItems: 'center' },
  mapImage: { width: 220, height: 170, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#181725' },
  description: { 
    fontSize: 15, 
    color: '#7C7C7C', 
    textAlign: 'center', 
    marginTop: 15, 
    lineHeight: 22,
    paddingHorizontal: 10
  },
  selectGroup: { width: '100%', marginTop: 30 },
  label: { color: '#7C7C7C', fontSize: 16, fontWeight: '600' },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 15,
    marginTop: 5
  },
  dropdownText: { fontSize: 18, color: '#181725' },
  placeholderText: { fontSize: 18, color: '#B1B1B1' },
  submitButton: {
    backgroundColor: '#53B175',
    width: '100%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  submitText: { color: 'white', fontSize: 18, fontWeight: '600' }
});

export default LocationScreen;