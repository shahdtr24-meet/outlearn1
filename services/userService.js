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
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        // Update existing user document
        await updateDoc(userRef, {
          completedTutorial: completed,
          lastActive: serverTimestamp(),
        });
      } else {
        // Create new user document
        await setDoc(userRef, {
          completedTutorial: completed,
          lastActive: serverTimestamp(),
          points: 0,
          streak: 1,
          achievements: [],
        });
      }
      
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
      
      if (userDoc.exists()) {
        currentProgress = userDoc.data()[progressField] || [];
      }
      
      // Add level if not already completed
      if (!currentProgress.includes(level)) {
        await updateDoc(userRef, {
          [progressField]: arrayUnion(level),
          points: increment(10), // Award 10 points per level completion
          lastActive: serverTimestamp(),
        });
        
        return { success: true, pointsEarned: 10 };
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
   * Update user's last active timestamp and always set streak to 1
   */
  static async updateLastActive(userId) {
    if (!userId) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        // Always set streak to 1
        const updateData = {
          lastActive: serverTimestamp(),
          streak: 1,
          lastStreakUpdate: serverTimestamp()
        };
        
        await updateDoc(userRef, updateData);
        return updateData.streak;
      } else {
        // If user document doesn't exist, create it with streak of 1
        await setDoc(userRef, {
          lastActive: serverTimestamp(),
          streak: 1,
          lastStreakUpdate: serverTimestamp(),
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
   * Get user's current streak - always returns 1
   */
  static async getUserStreak(userId) {
    // Always return 1 regardless of database value
    return 1;
  }

  /**
   * Create or update user document with default values
   */
  static async createUserDocument(userId, userData = {}) {
    if (!userId) throw new Error('User ID is required');
    
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create new user document with default values
        await setDoc(userRef, {
          points: 0,
          level: 1,
          streak: 1,
          achievements: [],
          completedTutorial: false,
          lastActive: serverTimestamp(),
          createdAt: serverTimestamp(),
          ...userData,
        });
        
        return { success: true, created: true };
      }
      
      return { success: true, created: false };
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  /**
   * Reset tutorial for existing users
   */
  static async resetTutorial(userId) {
    if (!userId) throw new Error('User ID is required');
    
    try {
      await updateDoc(doc(db, 'users', userId), {
        completedTutorial: false,
        lastActive: serverTimestamp(),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error resetting tutorial:', error);
      throw error;
    }
  }
}