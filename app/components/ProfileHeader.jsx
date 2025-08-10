import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/userService';
import colors from '../colors';

export default function ProfileHeader() {
  const { user, userProfile, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [streak, setStreak] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loginStats, setLoginStats] = useState([]);

  const displayName = userProfile?.displayName || user?.email || 'User';
  const points = userProfile?.points || 0;
  const level = UserService.calculateLevel(points);
  
  // Update last active timestamp when component mounts
  useEffect(() => {
    const updateActivity = async () => {
      if (user?.uid) {
        try {
          // Update last active and get current streak
          await UserService.updateLastActive(user.uid);
          const currentStreak = await UserService.getUserStreak(user.uid);
          setStreak(currentStreak || 0);
          
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
        } catch (error) {
          console.error('Error updating activity:', error);
        }
      }
    };
    
    updateActivity();
  }, [user?.uid]);
  
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const streakRotate = useSharedValue(0);
  const badgeOpacity = useSharedValue(0);
  
  // Initialize animations
  useEffect(() => {
    // Streak flame animation - match the profile page animation
    streakRotate.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 300 }),
        withTiming(5, { duration: 300 })
      ),
      -1, // Infinite repeat
      true // Reverse
    );
    
    // Badge animation
    badgeOpacity.value = withTiming(1, { duration: 800 });
  }, []);
  
  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  
  const streakAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${streakRotate.value}deg` }]
  }));
  
  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeOpacity.value }]
  }));

  const handleSave = async () => {
    if (user && inputValue.trim()) {
      await updateProfile(user, { displayName: inputValue });
      await updateDoc(doc(db, 'users', user.uid), { displayName: inputValue });
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login'); // This will take you to the root (index) page
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator color="#fff" style={{ margin: 20 }} />;
  }

  // Handle profile navigation with animation
  const navigateToProfile = () => {
    // Animate the header when clicked
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    // Navigate to profile page
    setTimeout(() => {
      router.push('/profile');
    }, 200);
  };
  
  return (
    <TouchableOpacity 
      style={styles.header}
      activeOpacity={0.9}
      onPress={navigateToProfile}
    >
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
      <Animated.View style={[styles.headerContent, animatedStyle]}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profilePhotoText}>{displayName ? displayName[0].toUpperCase() : 'U'}</Text>
          </View>
          <View>
            {editing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={styles.input}
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Enter name"
                  placeholderTextColor="#fff"
                />
                <TouchableOpacity onPress={handleSave} style={{ marginLeft: 8 }}>
                  <MaterialIcons name="check" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditing(false)} style={{ marginLeft: 4 }}>
                  <MaterialIcons name="close" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.headerName}>{displayName}</Text>
                <Text style={[styles.headerSubtitle, {marginTop: 2}]}>Tap to view profile</Text>
              </View>
            )}
            <Text style={styles.headerSubtitle}>Level {level}</Text>
          </View>
        </View>
        
        <View style={styles.badgesContainer}>
          {/* Streak Badge */}
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Animated.View style={[styles.pointsBadge, badgeAnimatedStyle, { marginLeft: 8, backgroundColor: colors.secondary }]}>
            <Animated.View style={streakAnimatedStyle}>
              <MaterialIcons name="local-fire-department" size={20} color="white" />
            </Animated.View>
            <Text style={styles.pointsText}>{streak}</Text>
          </Animated.View>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
            handleSignOut();
          }} 
          style={styles.signOutBtn}
        >
          <MaterialIcons name="logout" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.primary,
    fontFamily: "'Nunito', 'Roboto', sans-serif",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(44, 62, 80, 0.2)", // Using dark blue with opacity
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profilePhotoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  badgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  pointsBadge: {
    flexDirection: "row",
    
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pointsText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 80,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  signOutBtn: {
    marginLeft: 16,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const userName = "Matar";
export const userAvatar = "M";