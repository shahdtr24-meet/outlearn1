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
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

const { width } = Dimensions.get('window');

export default function Course() {
  // Level progress state
  const levels = [
    { id: 1, status: 'completed', type: 'start' },
    { id: 2, status: 'unlocked', type: 'middle' },
    { id: 3, status: 'locked', type: 'middle' },
    { id: 4, status: 'locked', type: 'end' },
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
          <View style={styles.levelIconContainer}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        );
      case 'unlocked':
        if (level.type === 'start') {
          return (
            <View style={styles.levelIconContainer}>
              <Ionicons name="play-circle" size={32} color={colors.primary} />
            </View>
          );
        } else if (level.type === 'end') {
          return (
            <View style={styles.levelIconContainer}>
              <Ionicons name="trophy" size={28} color={colors.primary} />
            </View>
          );
        } else {
          return (
            <View style={styles.levelIconContainer}>
              <Ionicons name="ellipse" size={24} color={colors.primary} />
            </View>
          );
        }
      case 'locked':
      default:
        return (
          <View style={styles.levelIconContainer}>
            <Ionicons name="lock-closed" size={20} color={colors.border} />
          </View>
        );
    }
  };

  const getLevelSegmentStyle = (level) => {
    const baseStyle = [styles.levelSegment];
    
    switch (level.status) {
      case 'completed':
        baseStyle.push(styles.completedSegment);
        break;
      case 'unlocked':
        baseStyle.push(styles.unlockedSegment);
        break;
      case 'locked':
      default:
        baseStyle.push(styles.lockedSegment);
        break;
    }

    return baseStyle;
  };

  const renderWigglyPath = (level, index) => {
    // No connecting lines - levels will be positioned in zigzag pattern
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.push('/course')}>
          <Text style={styles.sectionTitle}> ⬅️ Go back to courses</Text>
        </TouchableOpacity>

        {/* Level Journey Title */}
        <View style={styles.gameTitleContainer}>
          <Text style={styles.gameTitle}>Financial Learning Journey</Text>
          <Text style={styles.gameSubtitle}>Master your financial skills step by step!</Text>
        </View>

        {/* Wiggly Level Path */}
        <View style={styles.levelPathContainer}>
          {levels.map((level, index) => (
            <View key={level.id} style={styles.levelContainer}>
                             {/* Level Segment */}
               <TouchableOpacity
                 style={[
                   getLevelSegmentStyle(level),
                   index % 2 === 0 ? styles.levelRight : styles.levelLeft
                 ]}
                 onPress={() => navigateToLevel(level.id, level.status)}
                 activeOpacity={level.status !== 'locked' ? 0.7 : 1}
               >
                 {renderLevelIcon(level)}
               </TouchableOpacity>

              {/* Level Info */}
              <View style={styles.levelInfo}>
                <Text style={[
                  styles.levelNumber,
                  level.status === 'completed' && styles.completedLevelNumber,
                  level.status === 'locked' && styles.lockedLevelNumber
                ]}>
                  Level {level.id}
                </Text>
                <Text style={styles.levelType}>
                  {level.type === 'start' ? 'Getting Started' :
                   level.type === 'end' ? 'Final Challenge' :
                   'Learning Step'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Level Progress Stats */}
        <View style={styles.levelStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Locked</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.blue,
    textAlign: 'left',
    fontFamily: 'System',
    marginBottom: 20,
    marginLeft: 10,
  },
  gameTitleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    textShadow: `0px 0px 10px ${colors.primary}`,
  },
  gameSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  levelPathContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
    width: 300,
  },
  levelRight: {
    marginLeft: 60,
  },
  levelLeft: {
    marginRight: 60,
  },
  // Removed path-related styles since we're not using connecting lines
  levelSegment: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 8,
    zIndex: 1,
    borderWidth: 3,
  },
  completedSegment: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    boxShadow: `0px 0px 8px ${colors.success}80`,
  },
  unlockedSegment: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    boxShadow: `0px 0px 8px ${colors.primary}4D`,
  },
  lockedSegment: {
    backgroundColor: colors.textLight,
    borderColor: colors.border,
    opacity: 0.6,
  },
  levelIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  levelInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  levelNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  completedLevelNumber: {
    color: colors.success,
    fontWeight: 'bold',
  },
  lockedLevelNumber: {
    color: colors.textLight,
  },
  levelType: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  levelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  bottomSpacing: {
    height: 40,
  },
});