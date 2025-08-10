import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import NotificationModal from '../components/NotificationModal';
import OpportunityCostQuiz from '../components/OpportunityCostQuiz';
import { getLevel } from '../data/purchase-management';
import { markLevelCompleted } from '../services/purchaseManagementProgress';
import { UserService } from '../../services/userService';
import { getAuth } from 'firebase/auth';

export default function PurchaseManagementQuizPage() {
  const { id } = useLocalSearchParams();
  const levelId = Array.isArray(id) ? id[0] : id || '1';
  const level = getLevel(parseInt(levelId));
  const [notification, setNotification] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  if (!level) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Level not found</Text>
      </SafeAreaView>
    );
  }

  const handleQuizComplete = async (result) => {
    if (result.success) {
      // Mark the level as completed
      await markLevelCompleted(parseInt(levelId));
      
      // Update user progress in Firebase
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        // Update last active and streak
        await UserService.updateLastActive(user.uid);
        
        // Award XP based on level completion
        const difficulty = parseInt(levelId);
        const { pointsEarned, leveledUp } = await UserService.updateCourseProgress(user.uid, 'purchase-management', difficulty);
        
        // Get current streak
        const streak = await UserService.getUserStreak(user.uid);
        
        setNotification({
          visible: true,
          type: 'success',
          title: 'Congratulations! 🎉',
          message: `You completed Level ${levelId} with a score of ${result.score}!\n\n+${pointsEarned} XP earned!${leveledUp ? '\n🎊 You leveled up! 🎊' : ''}\n🔥 Current streak: ${streak} days`,
        });
      } else {
        setNotification({
          visible: true,
          type: 'success',
          title: 'Congratulations! 🎉',
          message: `You completed Level ${levelId} with a score of ${result.score}!`,
        });
      }
    } else {
      setNotification({
        visible: true,
        type: 'failure',
        title: 'Level Failed',
        message: 'You ran out of hearts. Don\'t worry, you can try again!',
      });
    }
  };

  const handleContinue = () => {
    setNotification({ ...notification, visible: false });
    router.push('/courses/purchase-management-levels');
  };

  const handleTryAgain = () => {
    setNotification({ ...notification, visible: false });
    router.replace(`/courses/purchase-management-quiz?id=${levelId}`);
  };

  const handleGoBack = () => {
    setNotification({ ...notification, visible: false });
    router.push('/courses/purchase-management-levels');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#F3F0EC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Level {levelId}</Text>
        <View style={styles.placeholder} />
      </View>

      <OpportunityCostQuiz 
        level={level}
        onComplete={handleQuizComplete}
      />
      
      <NotificationModal
        visible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onContinue={handleContinue}
        onTryAgain={handleTryAgain}
        onGoBack={handleGoBack}
      />
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
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F3F0EC',
  },
  placeholder: {
    width: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
});