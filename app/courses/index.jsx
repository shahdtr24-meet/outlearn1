import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CoursesIndex() {
  useEffect(() => {
    // Redirect to the finance course by default
    router.replace('/courses/finance');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecting to courses...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAF9',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
}); 