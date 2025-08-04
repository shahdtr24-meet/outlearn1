import { useEffect, useState } from 'react';
import { UserService } from '../services/userService';
import { useAuth } from './useAuth';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const { user } = useAuth();

  // Check tutorial status on mount
  useEffect(() => {
    const checkTutorialStatus = async () => {
      if (user?.uid) {
        try {
          const completed = await UserService.getTutorialStatus(user.uid);
          if (completed === null || completed === false) {
            setShowTutorial(true);
          }
        } catch (error) {
          console.error('Error checking tutorial status:', error);
          // Show tutorial by default if there's an error
          setShowTutorial(true);
        }
      }
    };

    checkTutorialStatus();
  }, [user]);

  const nextStep = () => {
    setTutorialStep(prev => prev + 1);
  };

  const completeTutorial = async () => {
    setShowTutorial(false);
    setTutorialStep(0);
    
    if (user?.uid) {
      try {
        await UserService.updateTutorialStatus(user.uid, true);
      } catch (error) {
        console.error('Error updating tutorial status:', error);
      }
    }
  };

  const resetTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const forceShowTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
  };

  return {
    showTutorial,
    tutorialStep,
    nextStep,
    completeTutorial,
    resetTutorial,
    forceShowTutorial,
  };
}; 