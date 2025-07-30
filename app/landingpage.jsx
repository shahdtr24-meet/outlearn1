import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={styles.out}>OUT</Text>
        <Text style={styles.learn}>LEARN</Text>
      </Text>

      <Text style={styles.tagline}>
        <Text style={styles.orange}>OUTDO. </Text>
        <Text style={styles.orange}>OUTGROW. </Text>
        <Text style={styles.orange}>OUTLEARN.</Text>
      </Text>

      <Text style={styles.subtext}>
        WE TEACH WHAT YOU <Text style={styles.blue}>DIDN'T</Text> LEARN IN SCHOOL,{"\n"}
        THE FUN WAY.
      </Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ALL RIGHTS ARE RESERVED TO OUTLEARN ©
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  out: {
    color: '#72AEE6', // Sky Blue
  },
  learn: {
    color: '#FDBD10', // Golden Yellow
  },
  tagline: {
    fontWeight: 'bold',
    color: '#6B3F27', // Dark Brown
    marginBottom: 10,
    fontSize: 16,
  },
  orange: {
    color: '#FDBD10',
  },
  subtext: {
    color: '#6B3F27',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'center',
  },
  blue: {
    color: '#72AEE6',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FDBD10',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#72AEE6',
  },
});

export default LandingPage;