import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'purchase_management_progress';

export const getLevelProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem(PROGRESS_KEY);
    return progress ? JSON.parse(progress) : { completedLevels: [], currentLevel: 1 };
  } catch (error) {
    console.log('Error getting level progress:', error);
    return { completedLevels: [], currentLevel: 1 };
  }
};

export const markLevelCompleted = async (levelNumber) => {
  try {
    const progress = await getLevelProgress();
    const updatedProgress = {
      ...progress,
      completedLevels: [...new Set([...progress.completedLevels, levelNumber])],
      currentLevel: Math.max(progress.currentLevel, levelNumber + 1)
    };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
    return updatedProgress;
  } catch (error) {
    console.log('Error marking level completed:', error);
    return null;
  }
};

export const resetProgress = async () => {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
    return { completedLevels: [], currentLevel: 1 };
  } catch (error) {
    console.log('Error resetting progress:', error);
    return null;
  }
};

export const isLevelUnlocked = (levelNumber, progress) => {
  if (levelNumber === 1) return true;
  return progress.completedLevels.includes(levelNumber - 1);
};

export const isLevelCompleted = (levelNumber, progress) => {
  return progress.completedLevels.includes(levelNumber);
}; 