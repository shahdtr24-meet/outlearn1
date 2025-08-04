import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import ProfileHeader from '../components/ProfileHeader';

export default function Course() {
  const [progress, setProgress] = useState(1);
  const totalLevels = 4;

  const loadProgress = async () => {
    const stored = await AsyncStorage.getItem('courseProgress');
    if (stored) {
      setProgress(parseInt(stored));
    } else {
      await AsyncStorage.setItem('courseProgress', '1');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  const levels = Array.from({ length: totalLevels }, (_, i) => {
    const id = i + 1;
    let status = 'locked';
    if (progress >= id + 1) status = 'completed';
    else if (progress === id) status = 'unlocked';
    else if (id === 1) status = 'unlocked'; // First level always unlocked
    return { id, status, type: 'coins' };
  });

  const getAnimationStyle = (isUnlocked) => {
    const scale = useSharedValue(0.7);
    const opacity = useSharedValue(0);

    useEffect(() => {
      if (isUnlocked) {
        scale.value = withSpring(1, { damping: 10 });
        opacity.value = withTiming(1, { duration: 500 });
      }
    }, [isUnlocked]);

    return useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));
  };

  const navigateToLevel = (levelNumber, status) => {
    if (status === 'locked') {
      alert('Complete the previous level to unlock this one!');
      return;
    }

    const routeMap = {
      1: '/courses/bef',
      2: '/courses/level2',
      3: '/courses/level3',
      4: '/courses/level4',
    };

    if (routeMap[levelNumber]) {
      router.push(`${routeMap[levelNumber]}?id=${levelNumber}`);
    } else {
      alert(`Level ${levelNumber} explanation not available yet`);
    }
  };

  const renderLevelIcon = (level) => {
    switch (level.status) {
      case 'completed':
        return <Ionicons name="checkmark-circle" size={32} color="#fff" />;
      case 'unlocked':
        return <Ionicons name="logo-bitcoin" size={28} color="#fff" />;
      case 'locked':
      default:
        return <Ionicons name="lock-closed" size={24} color="#fff" />;
    }
  };

  const progressPercent = Math.min((progress - 1) / totalLevels, 1) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.push('/course')}>
          <Text style={styles.sectionTitle}>⬅️ Go back</Text>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progressPercent)}% Complete</Text>
        </View>

        {/* Level Path */}
        <View style={styles.pathContainer}>
          {levels.map((level, index) => {
            const animationStyle = getAnimationStyle(level.status === 'unlocked');

            return (
              <View key={level.id} style={styles.levelContainer}>
                {index < levels.length - 1 && <View style={styles.connectingLine} />}

                <Animated.View style={[styles.levelCircle, animationStyle]}>
                  <TouchableOpacity
                    onPress={() => navigateToLevel(level.id, level.status)}
                    activeOpacity={level.status !== 'locked' ? 0.7 : 1}
                  >
                    {renderLevelIcon(level)}
                  </TouchableOpacity>
                </Animated.View>

                <Text style={[
                  styles.levelNumber,
                  level.status === 'locked' && styles.lockedLevelNumber,
                  level.status === 'completed' && styles.completedLevelNumber,
                ]}>
                  Level {level.id}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Debug / Reset Button */}
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.setItem('courseProgress', '1');
          setProgress(1);
        }} style={{ alignSelf: 'center', marginBottom: 30 }}>
          <Text style={{ color: 'gray' }}>🔄 Reset Progress</Text>
        </TouchableOpacity>

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
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#5DA8E1',
    marginBottom: 20,
    marginLeft: 10,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 14,
    color: '#333',
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
    borderLeftWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#7C4D33',
    zIndex: 0,
  },
  levelCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5B125',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
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
  bottomSpacing: {
    height: 40,
  },
});
