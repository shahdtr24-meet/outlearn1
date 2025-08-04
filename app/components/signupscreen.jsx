import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebaseConfig';

const RegisterScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    // Validation for registration
    if (!isLogin) {
      if (!fullName.trim()) {
        Alert.alert('Validation Error', 'Please enter your full name');
        return;
      }
      if (!userName.trim()) {
        Alert.alert('Validation Error', 'Please enter a username');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Validation Error', 'Passwords do not match');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Validation Error', 'Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Add user to Firestore with comprehensive profile
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          fullName: fullName.trim(),
          userName: userName.trim(),
          displayName: fullName.trim(),
          points: 0,
          level: 1,
          financeProgress: [],
          completedCourses: [],
          achievements: [],
          completedTutorial: false, // New users should see the tutorial
          streak: 1,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          completedTutorial: false, // Flag to show tutorial for new users
        });
      }

      // Navigate to the tabbed app screen after successful auth
      router.replace('/(tabs)');
    } catch (error) {
      let errorMessage = error.message;
      
      // Provide user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      }
      
      Alert.alert('Authentication Error', errorMessage);
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
        <Text style={styles.title}>{isLogin ? 'SIGN IN' : 'SIGN UP'}</Text>
        <Text style={styles.subtitle}>
          {isLogin 
            ? 'WELCOME BACK, GET STARTED' 
            : 'FILL OUT YOUR USER DETAILS TO GET STARTED PERSONALIZING YOUR EXPERIENCE'
          }
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="FULL NAME"
              placeholderTextColor="#999"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />
          )}

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="USER NAME"
              placeholderTextColor="#999"
              autoCapitalize="none"
              value={userName}
              onChangeText={setUserName}
            />
          )}

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

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="PASSWORD VERIFICATION"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleAuth} 
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'LOADING...' : 'SUBMIT'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footerText}>
            Already have an account? Sign in
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
    fontSize: 12,
    color: '#6B3F27',
    marginBottom: 40,
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 10,
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

export default RegisterScreen;