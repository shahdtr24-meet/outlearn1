import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Go to the tabbed app screen after login
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>OUTLEARN</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>SIGN IN</Text>
        <Text style={styles.subtitle}>WELCOME BACK, GET STARTED</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleAuth} disabled={loading}>
          <Text style={styles.submitButtonText}>
            {loading ? 'LOADING...' : 'SUBMIT'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.footerText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#72AEE6', // Updated to match landing page
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6B3F27', // Dark Brown for text
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B3F27',
    marginBottom: 60,
    letterSpacing: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#FDBD10', // Golden Yellow for inputs
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  submitButton: {
    backgroundColor: '#8B4513', // Brown for button
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    minWidth: 120,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#72AEE6', // Sky Blue for footer text
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;