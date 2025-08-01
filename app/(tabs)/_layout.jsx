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
            case 'course':
              iconName = 'school';
              break;
            case 'games':
              iconName = 'sports-esports';
              break;
            default:
              iconName = 'dashboard';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 6,
          backgroundColor: colors.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
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
      <Tabs.Screen
        name="course"
        options={{
          title: 'Courses',
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
        }}
      />
      </Tabs>
    </AuthProvider>
  );
}