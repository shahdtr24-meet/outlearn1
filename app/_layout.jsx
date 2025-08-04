import { Stack } from 'expo-router';
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Warning: Failed prop type',
  'Non-serializable values were found in the navigation state',
  'Route "./data/opportunity-cost.js" is missing the required default export',
  'Route "./data/risk-management.js" is missing the required default export',
  'Route "./data/purchase-management.js" is missing the required default export',
  'Route "./data/cv-writing.js" is missing the required default export',
  'Route "./services/levelProgress.js" is missing the required default export',
  'Route "./services/riskManagementProgress.js" is missing the required default export',
  'Route "./services/purchaseManagementProgress.js" is missing the required default export',
  'Route "./services/cvWritingProgress.js" is missing the required default export',
  'No route named "courses" exists in nested children',
  'Warning: AsyncStorage has been extracted from react-native',
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: componentWillMount has been renamed',
  'Warning: componentWillUpdate has been renamed',
  'Warning: Can\'t perform a React state update on an unmounted component',
  'Warning: Failed to load resource',
  'Warning: Each child in a list should have a unique "key" prop',
  'Warning: TextInput: `onChangeText` is deprecated',
  'Warning: ViewPropTypes will be removed',
  'Warning: ColorPropType will be removed',
  'Warning: EdgeInsetsPropType will be removed',
  'Warning: PointPropType will be removed',
]);

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="landingpage" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="courses" />
    </Stack>
  );
}