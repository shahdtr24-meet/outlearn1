import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { useAuth } from '../hooks/useAuth';
import { UserService } from '../services/userService';
import colors from './colors';

export default function ProfileScreen() {
  
  const { user, userProfile, loading } = useAuth();
  const [streak, setStreak] = useState(0);
  const [loadingStreak, setLoadingStreak] = useState(true);
  const [stats, setStats] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loginStats, setLoginStats] = useState([]);
  
  const displayName = userProfile?.displayName || user?.email || 'User';
  const points = userProfile?.points || 0;
  const level = UserService.calculateLevel(points);
  
  // Sample goals data (you can replace this with actual user goals from your service)
  const goals = [
    { id: "1", title: "Master Breathing Techniques", progress: 70, icon: "self-improvement" },
    { id: "2", title: "Read 3 Technical Books", progress: 30, icon: "menu-book" },
    { id: "3", title: "Improve UI Design Skills", progress: 50, icon: "design-services" },
  ];
  
  // Update last active and get streak when component mounts
  useEffect(() => {
    const updateUserActivity = async () => {
      // Always set the Welcome achievement first
      const welcomeAchievement = { 
        id: "welcome", 
        title: "Welcome Aboard!", 
        icon: "account-circle", 
        date: user?.metadata?.creationTime ? 
          new Date(user.metadata.creationTime).toLocaleDateString() : 
          "Recent",
        description: "Successfully registered and opened the app",
        isSpecial: true
      };

      if (user?.uid) {
        try {
          // Update last active and get updated streak
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
          
          // Get user stats
          const dashboardData = await UserService.getUserDashboardData(user.uid);
          if (dashboardData) {
            // Create stats array from dashboard data
            const userStats = [
              { 
                id: "1", 
                title: "Courses Completed", 
                value: String(dashboardData.totalProgress.finance || 0), 
                icon: "school" 
              },
              { 
                id: "2", 
                title: "Games Played", 
                value: String(userProfile?.gamesPlayed || 0), 
                icon: "sports-esports" 
              },
              { 
                id: "3", 
                title: "Community Posts", 
                value: String(userProfile?.posts?.length || 0), 
                icon: "forum" 
              },
            ];
            setStats(userStats);
            
            // Build achievements array starting with welcome achievement
            let allAchievements = [welcomeAchievement];
            
            if (dashboardData.recentAchievements && dashboardData.recentAchievements.length > 0) {
              const serverAchievements = dashboardData.recentAchievements.map((achievement, index) => {
                const date = achievement.earnedAt?.toDate ? 
                  achievement.earnedAt.toDate().toLocaleDateString() : 
                  'Recent';
                  s
                return {
                  id: String(index + 2),
                  title: achievement.title || 'Achievement',
                  icon: achievement.icon || 'emoji-events',
                  date: date
                };
              });
              allAchievements = [...allAchievements, ...serverAchievements];
            } else {
              // Add default achievements
              const defaultAchievements = [
                { id: "2", title: "First Login", icon: "emoji-events", date: "Recent" },
                { id: "3", title: "Fast Learner", icon: "speed", date: "Feb 22, 2025" },
                { id: "4", title: "Top Innovator", icon: "lightbulb", date: "Jan 15, 2025" },
              ];
              allAchievements = [...allAchievements, ...defaultAchievements];
            }
            
            setAchievements(allAchievements);
          } else {
            // If no dashboard data, just set welcome + defaults
            setAchievements([
              welcomeAchievement,
              { id: "2", title: "First Login", icon: "emoji-events", date: "Recent" },
              { id: "3", title: "Fast Learner", icon: "speed", date: "Feb 22, 2025" },
            ]);
          }
        } catch (error) {
          console.error('Error updating user activity:', error);
          // Always include welcome achievement even on error
          setAchievements([
            welcomeAchievement,
            { id: "2", title: "First Login", icon: "emoji-events", date: "Recent" },
           
          ]);
        } finally {
          setLoadingStreak(false);
        }
      } else {
        setLoadingStreak(false);
        // Set achievements even when no user
        setAchievements([
          welcomeAchievement,
          { id: "2", title: "First Login", icon: "emoji-events", date: "Recent" },
        ]);
      }
    };
    
    updateUserActivity();
  }, [user?.uid]);
  
  // Animation values
  const levelScale = useSharedValue(1);
  const streakRotate = useSharedValue(0);
  const badgeOpacity = useSharedValue(0);
  
  // Trigger animations on component mount
  useEffect(() => {
    // Level number animation
    levelScale.value = withSequence(
      withTiming(1.3, { duration: 500 }),
      withTiming(1, { duration: 300 })
    );
    
    // Streak flame animation
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
  const levelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: levelScale.value }]
  }));
  
  const streakAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${streakRotate.value}deg` }]
  }));
  
  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeOpacity.value }]
  }));

  // Helper function to create circular progress for goals
  const renderCircularProgress = (progress, size = 60) => {
    const radius = (size - 6) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return (
      <View style={[styles.circularProgress, { width: size, height: size }]}>
        <View style={styles.progressBackground} />
        <View style={[styles.progressForeground, { 
          transform: [{ rotate: `${(progress / 100) * 360}deg` }] 
        }]} />
        <View style={styles.progressCenter}>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} /> {/* Empty view for alignment */}
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profilePhotoContainer}>
            <View style={styles.profilePhoto}>
              <Text style={styles.profilePhotoText}>{displayName ? displayName[0].toUpperCase() : 'U'}</Text>
            </View>
          </View>
          
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          
          {/* Level and Streak Section */}
          <View style={styles.statsRow}>
            {/* Level */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>LEVEL</Text>
              <Animated.Text style={[styles.statValue, levelAnimatedStyle]}>{level}</Animated.Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(points % 200) / 2}%` }]} />
              </View>
              <Text style={styles.statSubtext}>{points} points</Text>
            </View>
            
            {/* Streak */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>STREAK</Text>
              {loadingStreak ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <TouchableOpacity 
                  style={styles.streakContainer}
                  onPress={() => setShowCalendar(true)}
                >
                  <Animated.View style={streakAnimatedStyle}>
                    <MaterialIcons name="local-fire-department" size={32} color={colors.primary} />
                  </Animated.View>
                  <Text style={styles.statValue}>{streak}</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.statSubtext}>login streak</Text>
            </View>
          </View>
        </View>

        {/* Goals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="flag" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Current Goals</Text>
          </View>
          
          <View style={styles.circularItemsContainer}>
            {goals.map((goal, index) => (
              <Animated.View 
                key={goal.id} 
                style={[styles.circularGoalCard, badgeAnimatedStyle, { animationDelay: index * 100 }]}
              >
                <View style={styles.circularProgressContainer}>
                  <View style={styles.circularProgressBackground}>
                    <View 
                      style={[
                        styles.circularProgressFill,
                        {
                          transform: [{ rotate: `${(goal.progress / 100) * 360 - 90}deg` }]
                        }
                      ]}
                    />
                  </View>
                  <View style={styles.circularProgressCenter}>
                    <MaterialIcons name={goal.icon} size={20} color={colors.primary} />
                  </View>
                </View>
                <Text style={styles.circularProgressPercentage}>{goal.progress}%</Text>
                <Text style={styles.circularItemTitle}>{goal.title}</Text>
              </Animated.View>
            ))}
          </View>
        </View>
        
        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
          ) : stats.length > 0 ? (
            stats.map((stat) => (
              <View key={stat.id} style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <MaterialIcons name={stat.icon} size={24} color={colors.primary} />
                </View>
                <View style={styles.statItemContent}>
                  <Text style={styles.statItemTitle}>{stat.title}</Text>
                  <Text style={styles.statItemValue}>{stat.value}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyStateText}>No stats available yet</Text>
          )}
        </View>
        
        {/* Achievements Section */}
       <View style={styles.section}>
  <View style={styles.sectionHeader}>
    <MaterialIcons name="emoji-events" size={24} color={colors.primary} />
    <Text style={styles.sectionTitle}>Achievements</Text>
  </View>

  {loading ? (
    <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
  ) : (
    <View style={styles.circularItemsContainer}>
      {achievements.length > 0 ? (
        achievements.map((achievement, index) => (
          <Animated.View 
            key={achievement.id} 
            style={[
              styles.circularGoalCard, // Reuse goal card styling
              badgeAnimatedStyle, 
              { animationDelay: index * 100 }
            ]}
          >
            {/* Shared circular icon container */}
            <View style={styles.circularProgressContainer}>
              <View style={styles.circularProgressBackground} />
              <View style={styles.circularProgressCenter}>
                <MaterialIcons name={achievement.icon} size={20} color={colors.primary} />
              </View>
              {/* Optional special badge */}
              {achievement.isSpecial && (
                <View style={styles.specialBadge}>
                  <MaterialIcons name="star" size={12} color={colors.primary} />
                </View>
              )}
            </View>
            <Text style={styles.circularProgressPercentage}>{achievement.date}</Text>
            <Text style={styles.circularItemTitle}>{achievement.title}</Text>
          </Animated.View>
        ))
      ) : (
        <Text style={styles.emptyStateText}>Complete activities to earn achievements!</Text>
      )}
    </View>
  )}

        </View>
      </ScrollView>
      
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 70, // Add padding to account for tab bar on mobile
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePhotoContainer: {
    marginBottom: 15,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(44, 62, 80, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profilePhotoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: 'rgba(44, 62, 80, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  statSubtext: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 5,
  },
  progressBar: {
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(114, 174, 230, 0.2)',
    borderRadius: 3,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 5,
  },
  // Circular Items Container
 circularItemsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 10,
},

  // Circular Goals Styles
  circularGoalCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    minWidth: 100,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(44, 62, 80, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circularProgressContainer: {
    width: 60,
    height: 60,
    position: 'relative',
    marginBottom: 8,
  },
  circularProgressBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'rgba(114, 174, 230, 0.2)',
    position: 'absolute',
  },
  circularProgressFill: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.primary,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
  },
  circularProgressCenter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'white',
    position: 'absolute',
    top: 4,
    left: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  // Circular Achievements Styles
  circularAchievementCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    minWidth: 100,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(44, 62, 80, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialAchievementCard: {
    borderColor: colors.primary,
    borderWidth: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  circularAchievementIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(114, 174, 230, 0.3)',
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  specialAchievementIcon: {
    backgroundColor: '#4CAF50', // Green for special achievement
    borderColor: '#81C784',
  },
  specialBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  // Shared Circular Item Styles
  circularItemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 3,
    lineHeight: 14,
  },
  circularItemDate: {
    fontSize: 9,
    color: colors.textLight,
    textAlign: 'center',
  },
  // Original Stats Section
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(107, 63, 39, 0.1)',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(253, 189, 16, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItemTitle: {
    fontSize: 14,
    color: colors.text,
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  emptyStateText: {
    textAlign: 'center',
    color: colors.textLight,
    fontStyle: 'italic',
    marginVertical: 20,
    fontSize: 14,
  },
});