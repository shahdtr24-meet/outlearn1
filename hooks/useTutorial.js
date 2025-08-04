import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { UserService } from '../services/userService';

/**
 * Custom hook to manage the app tutorial state
 */
export function useTutorial() {
  const { user, userProfile } = useAuth();
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check if tutorial should be shown when user profile is loaded
  useEffect(() => {
    const checkTutorialStatus = async () => {
      if (user?.uid) {
        try {
          // If completedTutorial is explicitly false, show the tutorial
          // If undefined (new user) or null, also show the tutorial
          const shouldShowTutorial = 
            userProfile?.completedTutorial === false || 
            userProfile?.completedTutorial === undefined;
          
          setShowTutorial(shouldShowTutorial);
        } catch (error) {
          console.error('Error checking tutorial status:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkTutorialStatus();
  }, [user, userProfile]);

  // Complete the tutorial
  const completeTutorial = async () => {
    if (user?.uid) {
      try {
        await UserService.updateTutorialStatus(user.uid, true);
        setShowTutorial(false);
      } catch (error) {
        console.error('Error completing tutorial:', error);
      }
    } else {
      setShowTutorial(false);
    }
  };

  // Reset the tutorial (for testing)
  const resetTutorial = async () => {
    if (user?.uid) {
      try {
        await UserService.updateTutorialStatus(user.uid, false);
        setShowTutorial(true);
        setTutorialStep(0);
      } catch (error) {
        console.error('Error resetting tutorial:', error);
      }
    }
  };

  // Go to next tutorial step
  const nextStep = () => {
    setTutorialStep(prev => prev + 1);
  };

  // Go to previous tutorial step
  const prevStep = () => {
    setTutorialStep(prev => Math.max(0, prev - 1));
  };

  // Go to specific tutorial step
  const goToStep = (step) => {
    setTutorialStep(step);
  };

  return {
    showTutorial,
    tutorialStep,
    loading,
    completeTutorial,
    resetTutorial,
    nextStep,
    prevStep,
    goToStep,
  };
}