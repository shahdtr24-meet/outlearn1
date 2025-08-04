import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import NotificationModal from '../components/NotificationModal';
import ProfileHeader from '../components/ProfileHeader';
import { opportunityCostLessons } from '../data/opportunity-cost';
import { getLevelProgress, isLevelCompleted, isLevelUnlocked, resetProgress } from '../services/levelProgress';

const { width } = Dimensions.get('window');

export default function OpportunityCostLevels() {
  const [progress, setProgress] = useState({ completedLevels: [], currentLevel: 1 });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  useEffect(() => {
    loadProgress();
  }, []);

  // Refresh progress when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, [])
  );



  const loadProgress = async () => {
    try {
      const levelProgress = await getLevelProgress();
      setProgress(levelProgress);
    } catch (error) {
      console.log('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const levels = opportunityCostLessons.levels?.map((level, index) => {
    const levelNumber = level.level;
    const unlocked = isLevelUnlocked(levelNumber, progress);
    const completed = isLevelCompleted(levelNumber, progress);
    
    let status = 'locked';
    if (completed) {
      status = 'completed';
    } else if (unlocked) {
      status = 'unlocked';
    }

    return {
      id: levelNumber,
      title: level.title,
      status,
      type: index === 0 ? 'start' : index === (opportunityCostLessons.levels?.length || 0) - 1 ? 'end' : 'middle',
    };
  }) || [];

  const navigateToLevel = (levelNumber, status) => {
    if (status === 'locked') {
      setNotification({
        visible: true,
        type: 'failure',
        title: 'Level Locked',
        message: 'Complete the previous level to unlock this one!',
      });
      return;
    }

    // Navigate to the opportunity cost level explanation page
    router.push(`/courses/opportunity-cost-level?id=${levelNumber}`);
  };

  const handleRefresh = () => {
    loadProgress();
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, visible: false });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ProfileHeader />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading levels...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
    if (index === (levels?.length || 0) - 1) return null;

    const nextLevel = levels[index + 1];
    const isCompleted = level.status === 'completed';
    const isNextUnlocked = nextLevel.status === 'unlocked' || nextLevel.status === 'completed';

    return (
      <View style={[
        styles.pathSegment,
        isCompleted || isNextUnlocked ? styles.completedPath : styles.lockedPath
      ]} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.navigationRow}>
          <TouchableOpacity onPress={() => router.push('/courses/finance-skills')}>
            <Text style={styles.backButton}> ⬅️ Back to Skills</Text>
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleRefresh}>
              <Text style={styles.refreshButton}>🔄 Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
              await resetProgress();
              loadProgress();
            }}>
              <Text style={styles.resetButton}>🗑️ Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{opportunityCostLessons.skillName}</Text>
          <Text style={styles.subtitle}>
            {opportunityCostLessons.skillDescription}
          </Text>
        </View>

        <View style={styles.levelsContainer}>
          {levels?.map((level, index) => (
            <View key={level.id} style={styles.levelRow}>
              <TouchableOpacity
                style={styles.levelCard}
                onPress={() => navigateToLevel(level.id, level.status)}
                activeOpacity={level.status !== 'locked' ? 0.7 : 1}
              >
                {renderLevelIcon(level)}
                <View style={styles.levelContent}>
                  <Text style={[
                    styles.levelTitle,
                    level.status === 'locked' && styles.lockedText
                  ]}>
                    Level {level.id}
                  </Text>
                  <Text style={[
                    styles.levelSubtitle,
                    level.status === 'locked' && styles.lockedText
                  ]}>
                    {level.title}
                  </Text>
                </View>
              </TouchableOpacity>
              {renderWigglyPath(level, index)}
            </View>
          ))}
        </View>
      </ScrollView>
      
      <NotificationModal
        visible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onContinue={handleNotificationClose}
        onTryAgain={handleNotificationClose}
        onGoBack={handleNotificationClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  refreshButton: {
    fontSize: 14,
    color: colors.primary,
  },
  resetButton: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  levelsContainer: {
    alignItems: 'center',
  },
  levelRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelIconContainer: {
    marginRight: 16,
  },
  levelContent: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  levelSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  lockedText: {
    color: colors.border,
  },
  levelSegment: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  completedSegment: {
    backgroundColor: '#4CAF50',
  },
  unlockedSegment: {
    backgroundColor: colors.primary,
  },
  lockedSegment: {
    backgroundColor: colors.border,
  },
  pathSegment: {
    width: 4,
    height: 30,
    borderRadius: 2,
    marginVertical: 10,
  },
  completedPath: {
    backgroundColor: '#4CAF50',
  },
  lockedPath: {
    backgroundColor: colors.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
}); 