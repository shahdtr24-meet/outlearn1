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

export default function Course() {
  // Level progress state - you can modify this based on user's actual progress
  // completed: user has finished this level
  // unlocked: level is available to play
  // locked: level is not yet available
  const levels = [
    { id: 1, status: 'completed', type: 'coins' }, // First level is always unlocked
    { id: 2, status: 'unlocked', type: 'coins' },   // Unlocked because level 1 is completed
    { id: 3, status: 'locked', type: 'coins' },     // Locked because level 2 not completed
    { id: 4, status: 'locked', type: 'coins' },     // Locked because level 3 not completed
  ];

  const navigateToLevel = (levelNumber, status) => {
    if (status === 'locked') {
      alert('Complete the previous level to unlock this one!');
      return;
    }

    // Navigate to the appropriate level explanation page
    if (levelNumber === 1) {
      router.push(`/courses/bef?id=${levelNumber}`);
    } else if (levelNumber === 2) {
      router.push(`/courses/level2?id=${levelNumber}`);
    } else if (levelNumber === 3) {
      router.push(`/courses/level3?id=${levelNumber}`);
    } else if (levelNumber === 4) {
      router.push(`/courses/level4?id=${levelNumber}`);
    } else {
      // For any future levels
      alert(`Level ${levelNumber} explanation not available yet`);
    }
  };

  const renderLevelIcon = (level) => {
    switch (level.status) {
      case 'completed':
        return (
          <Ionicons 
            name="checkmark-circle" 
            size={32} 
            color="#4CAF50" 
          />
        );
      case 'unlocked':
        if (level.type === 'coins') {
          return (
            <View style={styles.coinsIcon}>
              <View style={styles.coin1} />
              <View style={styles.coin2} />
              <View style={styles.coin3} />
            </View>
          );
        }
        break;
      case 'locked':
      default:
        return (
          <Ionicons 
            name="lock-closed" 
            size={24} 
            color="#7C4D33" 
          />
        );
    }
  };

  const getLevelCircleStyle = (status) => {
    switch (status) {
      case 'completed':
        return [styles.levelCircle, styles.completedLevel];
      case 'unlocked':
        return [styles.levelCircle, styles.unlockedLevel];
      case 'locked':
      default:
        return [styles.levelCircle, styles.lockedLevel];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ProfileHeader />

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.push('/course')}>
          <Text style={styles.sectionTitle}> ⬅️go back</Text>
        </TouchableOpacity>

        {/* Learning Path */}
        <View style={styles.pathContainer}>
          {levels.map((level, index) => (
            <View key={level.id} style={styles.levelContainer}>
              {/* Connecting Line */}
              {index < levels.length - 1 && (
                <View style={[
                  styles.connectingLine,
                  level.status === 'completed' ? styles.completedLine : styles.defaultLine
                ]} />
              )}
              
              {/* Level Circle */}
              <TouchableOpacity
                style={getLevelCircleStyle(level.status)}
                onPress={() => navigateToLevel(level.id, level.status)}
                activeOpacity={level.status !== 'locked' ? 0.7 : 1}
              >
                {renderLevelIcon(level)}
              </TouchableOpacity>

              {/* Level Number */}
              <Text style={[
                styles.levelNumber,
                level.status === 'completed' && styles.completedLevelNumber,
                level.status === 'locked' && styles.lockedLevelNumber
              ]}>
                Level {level.id}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
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
    fontSize: 17,
    fontWeight: '400',
    color: '#5DA8E1',
    textAlign: 'left',
    fontFamily: 'System',
    marginBottom: 40,
    marginLeft: 10,
  },
  pathContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  connectingLine: {
    position: 'absolute',
    top: 74,
    width: 4,
    height: 80,
    backgroundColor: 'transparent',
    borderLeftWidth: 3,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  defaultLine: {
    borderLeftColor: '#7C4D33',
  },
  completedLine: {
    borderLeftColor: '#4CAF50',
  },
  levelCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  completedLevel: {
    backgroundColor: '#E8F5E8', // Light green background for completed
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  unlockedLevel: {
    backgroundColor: '#F5B125',
  },
  lockedLevel: {
    backgroundColor: '#E0E0E0', // Gray background for locked levels
    opacity: 0.6,
  },
  levelNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  completedLevelNumber: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  lockedLevelNumber: {
    color: '#999',
  },
  coinsIcon: {
    width: 40,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coin1: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    left: 5,
    top: 5,
    borderWidth: 2,
    borderColor: '#F3F0EC',
  },
  coin2: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    right: 8,
    top: 0,
    borderWidth: 2,
    borderColor: '#F3F0EC',
  },
  coin3: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    left: 12,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#F3F0EC',
  },
  bottomSpacing: {
    height: 40,
  },
});