import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import colors from '../colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    
    // Navigate to the main app
    router.replace('/(tabs)');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Out</Text>
          <Text style={styles.logoOrange}>Learn</Text>
        </Text>
      </View>
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>
          <Text style={styles.titleBrown}>SIGN </Text>
          <Text style={styles.titleOrange}>IN</Text>
        </Text>
        <Text style={styles.subtitle}>Welcome back! Enter your credentials to continue</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email:"
            placeholderTextColor="#F3F0EC"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password:"
            placeholderTextColor="#F3F0EC"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.toggleText}>DON'T HAVE AN ACCOUNT? SIGN UP</Text>
        </TouchableOpacity>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          all rights are reserved to outlearn Ⓒ
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.welcomeBackground,
    padding: 0,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    fontSize: 17,
    fontWeight: 'normal',
  },
  logoBlue: {
    color: colors.outBlue,
  },
  logoOrange: {
    color: colors.outOrange,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 55,
    marginBottom: 10,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  titleBrown: {
    color: '#7C4D33', // Brown color
  },
  titleOrange: {
    color: colors.outOrange,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 30,
    color: colors.outBlue,
    textAlign: 'center',
    maxWidth: 300,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 54,
    backgroundColor: colors.outOrange,
    borderRadius: 27,
    paddingHorizontal: 24,
    color: '#F3F0EC', // Light color for text
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 146,
    height: 35,
    backgroundColor: '#7C4D33', // Brown color
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#F3F0EC', // Light color
    fontSize: 19,
    fontWeight: '400',
  },
  toggleText: {
    color: '#F5B125', // Yellow color
    fontSize: 12,
    fontWeight: '400',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: colors.outBlue,
    fontSize: 9,
    fontWeight: '400',
  },
});

export default LoginScreen;
