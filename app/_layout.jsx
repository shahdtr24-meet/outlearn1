import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { AuthProvider } from '../hooks/useAuth';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Warning: Failed prop type',
  'Non-serializable values were found in the navigation state',
]);

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="landingpage" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="games" />
        <Stack.Screen name="profile" />
      </Stack>
    </AuthProvider>
  );
}