import React from 'react';
import { View, Text } from 'react-native';

// Utility functions for safe error handling

export const safeAsyncOperation = async (operation, fallback = null) => {
  try {
    return await operation();
  } catch (error) {
    console.error('Safe async operation failed:', error);
    return fallback;
  }
};

export const safeFirebaseOperation = async (operation, fallback = null) => {
  try {
    return await operation();
  } catch (error) {
    console.error('Firebase operation failed:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'permission-denied') {
      console.error('Permission denied - user may not be authenticated');
    } else if (error.code === 'unavailable') {
      console.error('Firebase service unavailable');
    } else if (error.code === 'network-request-failed') {
      console.error('Network request failed');
    }
    
    return fallback;
  }
};

export const safeJSONParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse failed:', error);
    return fallback;
  }
};

export const safeArrayOperation = (array, operation, fallback = []) => {
  try {
    if (!Array.isArray(array)) {
      console.warn('Expected array but got:', typeof array);
      return fallback;
    }
    return operation(array);
  } catch (error) {
    console.error('Array operation failed:', error);
    return fallback;
  }
};

export const safeObjectAccess = (obj, path, fallback = null) => {
  try {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === null || current === undefined) {
        return fallback;
      }
      current = current[key];
    }
    
    return current !== undefined ? current : fallback;
  } catch (error) {
    console.error('Object access failed:', error);
    return fallback;
  }
};

// Higher-order component for error boundary
export const withErrorBoundary = (Component) => {
  return class extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Component error boundary:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>
              Something went wrong with this component. Please try refreshing.
            </Text>
          </View>
        );
      }

      return <Component {...this.props} />;
    }
  };
};