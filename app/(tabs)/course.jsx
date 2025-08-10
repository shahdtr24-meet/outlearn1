import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';

const { width } = Dimensions.get('window');

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      
      <ProfileHeader />

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
       

        <View style={styles.coursesContainer}>
          {/* Unlocked Course */}
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => router.push('/courses/finance')}
            activeOpacity={0.8}
          >
            <View style={styles.courseIcon} />
            <Text style={styles.courseTitle}>Finances </Text>
          </TouchableOpacity>

          {/* Locked Courses */}
          <View style={styles.lockedCourseCard}>
            <Ionicons name="lock-closed" size={24} color="#7C4D33" />
          </View>

          <View style={styles.lockedCourseCard}>
            <Ionicons name="lock-closed" size={24} color="#7C4D33" />
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  header: {
    backgroundColor: '#F5B125',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 116,
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5B125',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#F3F0EC',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    elevation: 4,
    position: 'relative',
  },
  profilePersonIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  personHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFC549',
    position: 'absolute',
    top: 8,
  },
  personBody: {
    width: 28,
    height: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#FFC549',
    position: 'absolute',
    bottom: 6,
  },
  profileInfo: {
    marginLeft: 18,
  },
  username: {
    fontSize: 15,
    fontWeight: '400',
    color: '#F3F0EC',
    fontFamily: 'System',
  },
  levelText: {
    fontSize: 8,
    fontWeight: '400',
    color: '#F3F0EC',
    fontFamily: 'System',
    marginTop: 4,
  },
  streakSection: {
    alignItems: 'center',
    paddingRight: 10,
  },
  streakNumber: {
    fontSize: 13,
    fontWeight: '400',
    color: '#F3F0EC',
    fontFamily: 'System',
    marginBottom: 8,
  },
  flameContainer: {
    width: 24,
    height: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flameMain: {
    width: 20,
    height: 26,
    backgroundColor: '#F3F0EC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: 'absolute',
  },
  flameInner: {
    width: 12,
    height: 16,
    backgroundColor: '#F5B125',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    top: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#7C4D33',
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 40,
  },
  coursesContainer: {
    gap: 27,
  },
  courseCard: {
    backgroundColor: '#FFC549',
    borderRadius: 47,
    height: 94,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  courseIcon: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: '#F5B125',
    marginRight: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#F3F0EC',
    fontFamily: 'System',
  },
  lockedCourseCard: {
    backgroundColor: '#F5B125',
    borderRadius: 47,
    height: 94,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    backgroundColor: '#F5B125',
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
    paddingBottom: 8,
  },
  navIconsLeft: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navGridContainer: {
    width: 44,
    height: 44,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  navGridIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#F3F0EC',
    borderRadius: 4,
  },
  navGridIconTopLeft: {
    backgroundColor: '#F3F0EC',
  },
  navGridIconTopRight: {
    backgroundColor: '#F3F0EC',
  },
  navGridIconBottomLeft: {
    backgroundColor: '#F3F0EC',
  },
  navGridIconBottomRight: {
    backgroundColor: '#F3F0EC',
  },
  navCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  peopleIconContainer: {
    width: 40,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  person1: {
    width: 18,
    height: 24,
    position: 'absolute',
    left: 0,
    alignItems: 'center',
  },
  personHead1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F3F0EC',
    marginBottom: 2,
  },
  personBody1: {
    width: 14,
    height: 12,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: '#F3F0EC',
  },
  person2: {
    width: 18,
    height: 24,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  personHead2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F3F0EC',
    marginBottom: 2,
  },
  personBody2: {
    width: 14,
    height: 12,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: '#F3F0EC',
  },
  navRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ribbonContainer: {
    width: 32,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ribbonStar: {
    width: 20,
    height: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starCenter: {
    width: 8,
    height: 8,
    backgroundColor: '#F3F0EC',
    borderRadius: 4,
    position: 'absolute',
  },
  starPoint1: {
    width: 3,
    height: 8,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    top: -4,
    borderRadius: 1.5,
  },
  starPoint2: {
    width: 3,
    height: 8,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    bottom: -4,
    borderRadius: 1.5,
  },
  starPoint3: {
    width: 8,
    height: 3,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    left: -4,
    borderRadius: 1.5,
  },
  starPoint4: {
    width: 8,
    height: 3,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    right: -4,
    borderRadius: 1.5,
  },
  starPoint5: {
    width: 6,
    height: 6,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  ribbonTails: {
    position: 'absolute',
    bottom: -8,
    flexDirection: 'row',
    width: 16,
    justifyContent: 'space-between',
  },
  ribbonTailLeft: {
    width: 6,
    height: 10,
    backgroundColor: '#F3F0EC',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 1,
  },
  ribbonTailRight: {
    width: 6,
    height: 10,
    backgroundColor: '#F3F0EC',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 3,
  },
  bottomSpacing: {
    height: 40,
  },
});
