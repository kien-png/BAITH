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

// 🔥 THÊM DÒNG NÀY
import { saveUser } from '../services/storageService';

const { width } = Dimensions.get('window');

const LoginScreen = ({ onLoginSuccess }) => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 THÊM HANDLE LOGIN
  const handleLogin = async () => {
    if (email && password) {
      const user = {
        email: email,
      };

      // 🔥 LƯU USER → QUAN TRỌNG NHẤT
      await saveUser(user);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="carrot" size={60} color="#F3603F" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Loging</Text>
        <Text style={styles.subtitle}>Enter your emails and password</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            placeholder="imshuvo97@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              secureTextEntry={secureText}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
            />
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

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* 🔥 SỬA Ở ĐÂY */}
        <TouchableOpacity 
          style={styles.loginButton}
          activeOpacity={0.8}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

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