import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VerificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your 4-digit code</Text>
        
        <Text style={styles.label}>Code</Text>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            keyboardType="number-pad"
            placeholder="- - - -"
            maxLength={4}
            secureTextEntry={true} // Hiện dấu chấm bảo mật nếu cần
          />
        </View>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      {/* Nút tròn xanh sang trang tiếp theo */}
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    marginTop: 10
  },
  input: { fontSize: 22, letterSpacing: 10 },
  resendContainer: { marginTop: 25 },
  resendText: { color: '#53B175', fontSize: 18, fontWeight: '500' },
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

export default VerificationScreen;