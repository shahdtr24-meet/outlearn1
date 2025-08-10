import { addDoc, arrayUnion, collection, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export class UserService {
  /**
   * Get user's tutorial completion status
   */
  static async getTutorialStatus(userId) {
    if (!userId) throw new Error('User ID is required');
    
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().completedTutorial;
      }
      return null;
    } catch (error) {
      console.error('Error getting tutorial status:', error);
      throw error;
    }
  }

  /**
   * Update user's tutorial completion status
   */
  static async updateTutorialStatus(userId, completed = true) {
    if (!userId) throw new Error('User ID is required');
    
    try {
      await updateDoc(doc(db, 'users', userId), {
        completedTutorial: completed,
        lastActive: serverTimestamp(),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating tutorial status:', error);
      throw error;
    }
  }
  /**
   * Update user progress for a specific course
   */
  static async updateCourseProgress(userId, courseType, level) {
    if (!userId) throw new Error('User ID is required');
    
    const userRef = doc(db, 'users', userId);
    const progressField = `${courseType}Progress`;
    
    try {
      // Get current progress
      const userDoc = await getDoc(userRef);
      let currentProgress = [];
      let currentLevel = 1;
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        currentProgress = userData[progressField] || [];
        currentLevel = userData.level || 1;
      }
      
      // Add level if not already completed
      if (!currentProgress.includes(level)) {
        // Calculate points based on level difficulty
        const basePoints = 10;
        const levelMultiplier = Math.max(1, level * 0.5); // Higher levels give more points
        const pointsEarned = Math.round(basePoints * levelMultiplier);
        
        // Update user data
        const updateData = {
          [progressField]: arrayUnion(level),
          points: increment(pointsEarned),
          lastActive: serverTimestamp(),
        };
        
        // Check if this completion should level up the user
        const userData = userDoc.exists() ? userDoc.data() : { points: 0 };
        const currentPoints = userData.points || 0;
        const newTotalPoints = currentPoints + pointsEarned;
        const newLevel = this.calculateLevel(newTotalPoints);
        
        // If user leveled up, update the level field
        if (newLevel > currentLevel) {
          updateData.level = newLevel;
        }
        
        await updateDoc(userRef, updateData);
        
        // Return success with points earned and level up information
        return { 
          success: true, 
          pointsEarned, 
          leveledUp: newLevel > currentLevel,
          newLevel: newLevel > currentLevel ? newLevel : null 
        };
      }
      
      return { success: false, message: 'Level already completed' };
    } catch (error) {
      console.error('Error updating course progress:', error);
      throw error;
    }
  }

  /**
   * Add achievement to user profile
   */
  static async addAchievement(userId, achievement) {
    if (!userId) throw new Error('User ID is required');
    
    const userRef = doc(db, 'users', userId);
    
    try {
      await updateDoc(userRef, {
        achievements: arrayUnion({
          ...achievement,
          earnedAt: serverTimestamp(),
        }),
        points: increment(achievement.points || 50),
        lastActive: serverTimestamp(),
      });
      
      return { success: true, pointsEarned: achievement.points || 50 };
    } catch (error) {
      console.error('Error adding achievement:', error);
      throw error;
    }
  }

  /**
   * Create a community post linked to the user
   */
  static async createCommunityPost(userId, userDisplayName, content) {
    if (!userId) throw new Error('User ID is required');
    
    try {
      await addDoc(collection(db, 'posts'), {
        userId: userId,
        user: userDisplayName,
        avatar: userDisplayName[0]?.toUpperCase() || 'U',
        content: content,
        likes: 0,
        likedBy: [], // Array to track who liked the post
        createdAt: serverTimestamp(),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error creating community post:', error);
      throw error;
    }
  }

  /**
   * Like/unlike a community post
   */
  static async togglePostLike(postId, userId) {
    if (!userId || !postId) throw new Error('User ID and Post ID are required');
    
    const postRef = doc(db, 'posts', postId);
    
    try {
      const postDoc = await getDoc(postRef);
      if (!postDoc.exists()) throw new Error('Post not found');
      
      const postData = postDoc.data();
      const likedBy = postData.likedBy || [];
      const hasLiked = likedBy.includes(userId);
      
      if (hasLiked) {
        // Unlike the post
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: likedBy.filter(id => id !== userId),
        });
      } else {
        // Like the post
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
        });
      }
      
      return { success: true, liked: !hasLiked };
    } catch (error) {
      console.error('Error toggling post like:', error);
      throw error;
    }
  }

  /**
   * Get user's personal dashboard data
   */
  static async getUserDashboardData(userId) {
    if (!userId) throw new Error('User ID is required');
    
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (!userDoc.exists()) {
        return null;
      }
      
      const userData = userDoc.data();
      
      return {
        profile: userData,
        totalProgress: {
          finance: userData.financeProgress?.length || 0,
          // Add other course types here
        },
        recentAchievements: userData.achievements?.slice(-3) || [],
        level: this.calculateLevel(userData.points || 0),
      };
    } catch (error) {
      console.error('Error fetching user dashboard data:', error);
      throw error;
    }
  }

  /**
   * Calculate user level based on points
   */
  static calculateLevel(points) {
    if (points < 100) return 1;
    if (points < 300) return 2;
    if (points < 600) return 3;
    if (points < 1000) return 4;
    return Math.floor(points / 200) + 1;
  }

  /**
   * Update user's last active timestamp and manage streak
   */
  static async updateLastActive(userId) {
    if (!userId) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const lastActive = userData.lastActive?.toDate();
        const lastStreakUpdate = userData.lastStreakUpdate?.toDate();
        const currentStreak = userData.streak || 0;
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        let newStreak = currentStreak;
        let streakUpdated = false;
        let loginDates = userData.loginDates || [];
        
        // Convert Firestore timestamps to regular dates
        const convertedLoginDates = loginDates.map(date => {
          if (date.toDate) return date.toDate().toISOString().split('T')[0];
          return date;
        });
        
        // Today's date in YYYY-MM-DD format
        const todayStr = today.toISOString().split('T')[0];
        
        // If last active date exists
        if (lastActive) {
          const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
          const daysSinceLastActive = Math.floor((today - lastActiveDay) / (1000 * 60 * 60 * 24));
          
          // If user was last active yesterday, increment streak
          if (daysSinceLastActive === 1) {
            newStreak += 1;
            streakUpdated = true;
          } 
          // If user was last active today, maintain streak
          else if (daysSinceLastActive === 0) {
            // Keep current streak, but only add today's date if not already logged in today
            if (!convertedLoginDates.includes(todayStr)) {
              loginDates.push(todayStr);
            }
          } 
          // If user missed a day or more, reset streak to 1
          else if (daysSinceLastActive > 1) {
            newStreak = 1;
            streakUpdated = true;
          }
        } else {
          // First time user is active
          newStreak = 1;
          streakUpdated = true;
        }
        
        // Add today's date to login dates if not already there
        if (!convertedLoginDates.includes(todayStr)) {
          loginDates.push(todayStr);
        }
        
        // Keep only the last 30 days of login history
        if (loginDates.length > 30) {
          loginDates = loginDates.slice(loginDates.length - 30);
        }
        
        const updateData = {
          lastActive: serverTimestamp(),
          streak: newStreak,
          loginDates: loginDates
        };
        
        // Only update lastStreakUpdate if the streak value changed
        if (streakUpdated) {
          updateData.lastStreakUpdate = serverTimestamp();
          
          // Award points for streak milestones
          if (newStreak > 0 && newStreak % 5 === 0) {
            // Award bonus points for every 5 days of streak
            const streakBonus = 25 * (newStreak / 5);
            updateData.points = increment(streakBonus);
          }
        }
        
        await updateDoc(userRef, updateData);
        return newStreak;
      } else {
        // If user document doesn't exist, create it with streak of 1
        const todayStr = new Date().toISOString().split('T')[0];
        await setDoc(userRef, {
          lastActive: serverTimestamp(),
          streak: 1,
          lastStreakUpdate: serverTimestamp(),
          loginDates: [todayStr],
          points: 0
        });
        return 1;
      }
    } catch (error) {
      console.error('Error updating last active and streak:', error);
      return null;
    }
  }
  
  /**
   * Get user's current streak
   */
  static async getUserStreak(userId) {
    if (!userId) return 0;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().streak || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error getting user streak:', error);
      return 0;
    }
  }
  
  /**
   * Get user's login history
   */
  static async getUserLoginHistory(userId) {
    if (!userId) return [];
    
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const loginDates = userData.loginDates || [];
        
        // Convert Firestore timestamps to date strings if needed
        return loginDates.map(date => {
          if (date.toDate) return date.toDate().toISOString().split('T')[0];
          return date;
        });
      }
      return [];
    } catch (error) {
      console.error('Error getting user login history:', error);
      return [];
    }
  }
}