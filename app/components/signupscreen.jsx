import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebaseConfig';

const RegisterScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!isLogin && password.length < 6) {
      return Alert.alert('Weak Password', 'Password should contain at least 6 characters.');
    }

    try {
      setLoading(true);

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, 'users', userCredential.user.uid), {
          userName: userName.trim(),
          email: email.trim(),
          createdAt: new Date().toISOString(),
          level: 1,
          points: 0,
          completedTutorial: false,
        });
      }

      router.replace('/(tabs)');
    } catch (error) {
      let message = 'Something went wrong. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Incorrect email or password.';
      }
      Alert.alert(isLogin ? 'Login Error' : 'Sign Up Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        <Text style={styles.titleBrown}>{isLogin ? 'SIGN ' : 'SIGN '}</Text>
        <Text style={styles.titleGold}>{isLogin ? 'IN' : 'UP'}</Text>
      </Text>

      <Text style={styles.subtitle}>
        {isLogin
          ? 'Welcome back! Enter your credentials to continue'
          : 'Fill out your info to get a better personalized experience'}
      </Text>

      {/* Input Fields */}
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="USER NAME:"
          placeholderTextColor="#72AEE6"
          value={userName}
          onChangeText={setUserName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Gmail:"
        placeholderTextColor="#72AEE6"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password:"
        placeholderTextColor="#72AEE6"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Password Note */}
      {!isLogin && (
        <Text style={styles.passwordNote}>*password should contain 6+ characters</Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Submit'}</Text>
      </TouchableOpacity>

      {/* Switch to Login/Signup */}
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleBrown: {
    color: '#6B3F27',
  },
  titleGold: {
    color: '#FDBD10',
  },
  subtitle: {
    fontSize: 14,
    color: '#72AEE6',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#72AEE6',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 14,
    marginBottom: 20,
    color: '#333',
  },
  passwordNote: {
    fontSize: 12,
    color: '#FDBD10',
    marginBottom: 30,
    textAlign: 'left',
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#6B3F27',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    color: '#72AEE6',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
