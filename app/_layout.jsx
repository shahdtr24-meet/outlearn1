import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthProvider } from '../hooks/useAuth';
import CrashPreventionService from '../services/crashPrevention';

// Global Error Boundary
class GlobalErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
    
    // You can log this to a crash reporting service
    // crashlytics().recordError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>
            The app encountered an unexpected error. Please restart the app.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function RootLayout() {
  useEffect(() => {
    // Initialize crash prevention service
    CrashPreventionService.init();
  }, []);

  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="courses" />
        </Stack>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});