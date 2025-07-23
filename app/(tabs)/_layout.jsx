import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import { AuthProvider } from '../../hooks/useAuth';
import colors from '../colors';

export default function TabLayout() {
  return (
    <AuthProvider>
      <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'index':
              iconName = 'dashboard';
              break;
            case 'skills':
              iconName = 'trending-up';
              break;
            case 'community':
              iconName = 'groups';
              break;
            default:
              iconName = 'dashboard';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 6,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
        }}
      />
      </Tabs>
    </AuthProvider>
  );
} 