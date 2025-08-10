import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withSequence, withRepeat } from 'react-native-reanimated';
import colors from '../colors';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/userService';

export default function BottomNavigation() {
  const [activeItem, setActiveItem] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const { user, userProfile } = useAuth();
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [loginStats, setLoginStats] = useState([]);
  
  // Animation values for each nav item
  const homeScale = useSharedValue(1);
  const coursesScale = useSharedValue(1);
  const gamesScale = useSharedValue(1);
  const profileScale = useSharedValue(1);
  const streakRotate = useSharedValue(0);
  
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          // Update last active and get current streak
          await UserService.updateLastActive(user.uid);
          const currentStreak = await UserService.getUserStreak(user.uid);
          setStreak(currentStreak || 0);
          
          // Get user points and calculate level
          if (userProfile) {
            const points = userProfile.points || 0;
            const userLevel = UserService.calculateLevel(points);
            setLevel(userLevel);
            
            // Get actual login history
            const loginHistory = await UserService.getUserLoginHistory(user.uid);
            
            // Convert login history to the format needed for the calendar
            const today = new Date();
            const stats = [];
            
            // Create an array of the last 30 days
            for (let i = 0; i < 30; i++) {
              const date = new Date(today);
              date.setDate(today.getDate() - i);
              const dateStr = date.toISOString().split('T')[0];
              
              stats.push({
                date: dateStr,
                loggedIn: loginHistory.includes(dateStr)
              });
            }
            
            setLoginStats(stats);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    fetchUserData();
  }, [user?.uid, userProfile]);
  
  // Streak flame animation
  useEffect(() => {
    // Streak flame animation
    streakRotate.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 300 }),
        withTiming(5, { duration: 300 })
      ),
      -1, // Infinite repeat
      true // Reverse
    );
  }, []);
  
  const handlePress = (route, scale) => {
    // Animate the button
    scale.value = withSpring(1.2, { damping: 10 }, () => {
      scale.value = withSpring(1);
    });
    
    // Navigate to the route
    router.push(route);
  };
  
  const handleHover = (item) => {
    setActiveItem(item);
  };
  
  const handleHoverExit = () => {
    setActiveItem(null);
  };
  
  // Animated styles for each nav item
  const homeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: homeScale.value }]
  }));
  
  const coursesStyle = useAnimatedStyle(() => ({
    transform: [{ scale: coursesScale.value }]
  }));
  
  const gamesStyle = useAnimatedStyle(() => ({
    transform: [{ scale: gamesScale.value }]
  }));
  
  const profileStyle = useAnimatedStyle(() => ({
    transform: [{ scale: profileScale.value }]
  }));
  
  const streakAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${streakRotate.value}deg` }]
  }));
  
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  return (
    <View style={[styles.container, { width: windowWidth * 0.9 }]}>
      <Animated.View style={[styles.navItemContainer, homeStyle]}>
        <TouchableOpacity 
          style={[styles.navItem, activeItem === 'home' && styles.activeNavItem]} 
          onPress={() => handlePress('/', homeScale)}
          onMouseEnter={() => Platform.OS === 'web' && handleHover('home')}
          onMouseLeave={() => Platform.OS === 'web' && handleHoverExit()}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="home-outline" size={24} color={activeItem === 'home' ? colors.primary : '#fff'} />
          </View>
          <Text style={[styles.navText, activeItem === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View style={[styles.navItemContainer, coursesStyle]}>
        <TouchableOpacity 
          style={[styles.navItem, activeItem === 'courses' && styles.activeNavItem]} 
          onPress={() => handlePress('/courses/finance', coursesScale)}
          onMouseEnter={() => Platform.OS === 'web' && handleHover('courses')}
          onMouseLeave={() => Platform.OS === 'web' && handleHoverExit()}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="school-outline" size={24} color={activeItem === 'courses' ? colors.primary : '#fff'} />
          </View>
          <Text style={[styles.navText, activeItem === 'courses' && styles.activeNavText]}>Courses</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View style={[styles.navItemContainer, gamesStyle]}>
        <TouchableOpacity 
          style={[styles.navItem, activeItem === 'games' && styles.activeNavItem]} 
          onPress={() => handlePress('/games/budgethero', gamesScale)}
          onMouseEnter={() => Platform.OS === 'web' && handleHover('games')}
          onMouseLeave={() => Platform.OS === 'web' && handleHoverExit()}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="game-controller-outline" size={24} color={activeItem === 'games' ? colors.primary : '#fff'} />
          </View>
          <Text style={[styles.navText, activeItem === 'games' && styles.activeNavText]}>Games</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View style={[styles.navItemContainer, profileStyle]}>
        <TouchableOpacity 
          style={[styles.navItem, activeItem === 'profile' && styles.activeNavItem]} 
          onPress={() => handlePress('/profile', profileScale)}
          onMouseEnter={() => Platform.OS === 'web' && handleHover('profile')}
          onMouseLeave={() => Platform.OS === 'web' && handleHoverExit()}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="person-outline" size={24} color={activeItem === 'profile' ? colors.primary : '#fff'} />
          </View>
          <Text style={[styles.navText, activeItem === 'profile' && styles.activeNavText]}>Profile</Text>
          
          {/* Level Badge */}
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Streak Badge */}
      <TouchableOpacity 
        style={styles.streakBadge}
        onPress={toggleCalendar}
      >
        <Animated.View style={streakAnimatedStyle}>
          <MaterialIcons name="local-fire-department" size={20} color="white" />
        </Animated.View>
        <Text style={styles.streakText}>{streak}</Text>
      </TouchableOpacity>
      
      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <View 
            style={styles.calendarContainer}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Login Streak</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.streakInfoContainer}>
              <View style={styles.streakInfoItem}>
                <MaterialIcons name="local-fire-department" size={24} color={colors.primary} />
                <Text style={styles.streakInfoText}>Current Streak: {streak} days</Text>
              </View>
              <View style={styles.streakInfoItem}>
                <MaterialIcons name="calendar-today" size={24} color={colors.primary} />
                <Text style={styles.streakInfoText}>Last Login: Today</Text>
              </View>
            </View>
            
            <Text style={styles.calendarSubtitle}>Your Activity</Text>
            
            <View style={styles.calendarGrid}>
              {loginStats.map((stat, index) => (
                <View key={index} style={styles.calendarDay}>
                  <View 
                    style={[
                      styles.dayIndicator, 
                      stat.loggedIn ? styles.dayLoggedIn : styles.dayMissed
                    ]}
                  />
                  <Text style={styles.dayText}>
                    {new Date(stat.date).getDate()}
                  </Text>
                  <Text style={styles.monthText}>
                    {new Date(stat.date).toLocaleString('default', { month: 'short' })}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.brown,
    paddingVertical: 15,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  levelBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  levelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  streakBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  streakText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 10,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  calendarSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    marginBottom: 15,
  },
  streakInfoContainer: {
    backgroundColor: 'rgba(114, 174, 230, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  streakInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakInfoText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '13.5%', // ~7 days per row with spacing
    aspectRatio: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dayIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 4,
  },
  dayLoggedIn: {
    backgroundColor: colors.primary,
  },
  dayMissed: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },
  monthText: {
    fontSize: 9,
    color: colors.textLight,
  },
  navItemContainer: {
    marginHorizontal: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: '#fff',
    transform: [{scale: 1.05}],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#fff',
    fontWeight: '500',
  },
  activeNavText: {
    color: colors.brown,
    fontWeight: 'bold',
  },
});