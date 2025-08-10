import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import { Dimensions, Platform } from 'react-native';
import colors from '../colors';
import AppTutorial from '../components/AppTutorial';

export default function TabLayout() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  // Calculate responsive dimensions
  const getResponsiveTabBarWidth = () => {
    // For smaller devices, use a larger percentage of the screen
    if (windowWidth < 375) return '95%';
    // For medium devices
    if (windowWidth < 768) return '90%';
    // For larger devices
    return '80%';
  };
  
 // Get numeric value without the % sign
  const getTabBarWidthValue = () => {
    const widthStr = getResponsiveTabBarWidth();
    return parseInt(widthStr.replace('%', ''));
  };
  
  return (
    <>
      <AppTutorial />
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
            case 'lobby':
              iconName = 'sports-esports';
              break;
            default:
              iconName = 'dashboard';
          }

          return (
            <MaterialIcons 
              name={iconName} 
              size={focused ? size + 6 : size + 2} 
              color={color} 
              style={{
                opacity: focused ? 1 : 0.8,
                transform: [{ scale: focused ? 1.1 : 1 }]
              }}
            />
          );
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.brown,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
          position: 'absolute',
          bottom: Platform.OS === 'web' ? 20 : 25,
          left: '50%',
          width: getResponsiveTabBarWidth(),
          ...Platform.select({
            web: {
              marginLeft: `-${getTabBarWidthValue() / 2}%`,
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            },
            default: {
              transform: [{ translateX: -(windowWidth * getTabBarWidthValue() / 100 / 2) }],
            },
          }),
        },
        tabBarItemStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          justifyContent: 'center',
          borderRadius: 20,
          margin: 5,
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 5,
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
    </>
  );
}