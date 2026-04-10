import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [secureText, setSecureText] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Logo Cà rốt VÀNG */}
      <View style={styles.logoContainer}>
        {/* Đã cập nhật màu icon cà rốt sang màu vàng đậm (#F3603F) giống hình ảnh */}
        <MaterialCommunityIcons name="carrot" size={60} color="#F3603F" />
      </View>

      <View style={styles.content}>
        {/* Tiêu đề (Giữ nguyên lỗi typo 'Loging' như thiết kế) */}
        <Text style={styles.title}>Loging</Text>
        <Text style={styles.subtitle}>Enter your emails and password</Text>

        {/* 2. Ô nhập Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            placeholder="imshuvo97@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* 3. Ô nhập Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              secureTextEntry={secureText}
              placeholder="••••••••"
            />
            {/* Nút ẩn/hiện mật khẩu */}
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons 
                name={secureText ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#7C7C7C" 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>

        {/* 4. Quên mật khẩu */}
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* 5. Nút Log In MÀU XANH */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        {/* 6. Chuyển sang Sign Up (Giữ nguyên lỗi typo 'Singup' như thiết kế) */}
        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Singup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', width: width },
  logoContainer: { alignItems: 'center', marginTop: 30, marginBottom: 50 },
  content: { paddingHorizontal: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725' },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginTop: 10, marginBottom: 30 },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '600' },
  input: { 
    fontSize: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2', 
    paddingVertical: 10,
    color: '#181725'
  },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  line: { height: 1, backgroundColor: '#E2E2E2', width: '100%' },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 5 },
  forgotText: { color: '#181725', fontSize: 14 },
  loginButton: {
    backgroundColor: '#53B175',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  loginText: { color: 'white', fontSize: 18, fontWeight: '600' },
  signupContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 25 
  },
  noAccountText: { fontSize: 14, fontWeight: '600', color: '#181725' },
  signupText: { fontSize: 14, fontWeight: '600', color: '#53B175' }
});

export default LoginScreen;