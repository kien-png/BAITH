import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SignUpScreen = () => {
  const [secureText, setSecureText] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="carrot" size={60} color="#F3603F" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Afsar Hossen Shuvo" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} placeholder="imshuvo97@gmail.com" keyboardType="email-address" />
            <Ionicons name="checkmark" size={20} color="#53B175" />
          </View>
          <View style={styles.line} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} secureTextEntry={secureText} placeholder="••••••••" />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy.</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sing Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity><Text style={styles.linkText}>Singup</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', width: width },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  content: { paddingHorizontal: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725' },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginTop: 5, marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '600' },
  input: { fontSize: 18, color: '#181725', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center' },
  line: { height: 1, backgroundColor: '#E2E2E2', width: '100%' },
  termsContainer: { marginTop: 10 },
  termsText: { fontSize: 14, color: '#7C7C7C', lineHeight: 22 },
  linkText: { color: '#53B175', fontWeight: '600' },
  signUpButton: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  signUpText: { color: 'white', fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { fontSize: 14, fontWeight: '600', color: '#181725' }
});

export default SignUpScreen;