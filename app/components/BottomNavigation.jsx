import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomNavigation() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.push('/')}
      >
        <Ionicons name="home-outline" size={24} color="#666" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.push('/courses/finance')}
      >
        <Ionicons name="school-outline" size={24} color="#666" />
        <Text style={styles.navText}>Courses</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.push('/games/budgethero')}
      >
        <Ionicons name="game-controller-outline" size={24} color="#666" />
        <Text style={styles.navText}>Games</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.push('/profile')}
      >
        <Ionicons name="person-outline" size={24} color="#666" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});