import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/userService';
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';
// Firestore imports
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebaseConfig';

// Utility function to format time ago
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommunityScreen() {
  const { userId, userProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  
  // Real-time listener for posts
  useEffect(() => {
    if (!userId) return;
    
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        try {
          const fetchedPosts = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            };
          });
      setPosts(fetchedPosts);
      // Seed logic: if no posts, add 3 random posts from 3 users
      if (fetchedPosts.length === 0) {
        const seedUsers = [
          {
            user: "Alice Chen",
            avatar: "A",
            sentences: [
              "Just completed a breathing course! 🎉",
              "Excited to start a new project with the community!",
              "Anyone up for a weekend study session?"
            ]
          },
          {
            user: "Robert Kim",
            avatar: "R",
            sentences: [
              "Looking for teammates on the new project challenge. Anyone interested?",
              "Shared a great resource for learning skills on Youtube!",
              "Does anyone have tips for time management?"
            ]
          },
          {
            user: "Sophia Lee",
            avatar: "S",
            sentences: [
              "Just discovered a great resource for learning skills on Youtube. Highly recommend!",
              "Finished my first course today! Feeling accomplished.",
              "Who else is attending the upcoming skills workshop?"
            ]
          }
        ];
        // Use Promise.all to handle async operations properly
        Promise.all(
          seedUsers.map(async (user) => {
            const randomSentence = user.sentences[Math.floor(Math.random() * user.sentences.length)];
            const randomLikes = Math.floor(Math.random() * 16) + 5; // 5-20 likes
            return addDoc(collection(db, "posts"), {
              user: user.user,
              avatar: user.avatar,
              content: randomSentence,
              likes: randomLikes,
              createdAt: serverTimestamp()
            });
          })
        ).catch(error => {
          console.error('Error seeding posts:', error);
        });
      }
    } catch (error) {
      console.error('Error processing posts snapshot:', error);
      setPosts([]); // Set empty array on error
    }
  },
  (error) => {
    console.error('Error listening to posts:', error);
    setPosts([]); // Set empty array on error
  }
);

return unsubscribe;
}, [userId]);

  const addPost = async () => {
    if (newPost.trim() !== "" && userId) {
      try {
        const displayName = userProfile?.displayName || 'User';
        await UserService.createCommunityPost(userId, displayName, newPost);
        setNewPost("");
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const likePost = async (postId) => {
    if (userId) {
      try {
        await UserService.togglePostLike(postId, userId);
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
      
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="groups" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Community</Text>
          </View>
          
          <View style={styles.postInputContainer}>
            <TextInput
              style={styles.postInput}
              placeholder="Share something with the community..."
              placeholderTextColor={colors.textLight}
              value={newPost}
              onChangeText={setNewPost}
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.postButton,
                !newPost.trim() && styles.postButtonDisabled
              ]}
              onPress={addPost}
              disabled={!newPost.trim()}
            >
              <MaterialIcons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                  <Text style={styles.postAvatarText}>{post.avatar}</Text>
                </View>
                <View style={styles.postHeaderInfo}>
                  <Text style={styles.postUsername}>{post.user}</Text>
                  <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              <TouchableOpacity 
                style={styles.likeButton}
                onPress={() => likePost(post.id)}
              >
                <MaterialIcons name="favorite" size={20} color={colors.primary} />
                <Text style={styles.likeCount}>{post.likes}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 8,
  },
  postInputContainer: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    minHeight: 20,
  },
  postButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    alignSelf: "flex-end",
  },
  postButtonDisabled: {
    backgroundColor: colors.textLight,
  },
  postCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  postAvatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  postHeaderInfo: {
    flex: 1,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  postTime: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.textLight,
  },
}); 