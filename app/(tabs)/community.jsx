import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

export default function CommunityScreen() {
  const [posts, setPosts] = useState([
    { id: "1", user: "Alice Chen", avatar: "A", content: "Just completed a breathing course! 🎉", likes: 12, time: "2h ago" },
    { id: "2", user: "Robert Kim", avatar: "R", content: "Looking for teammates on the new project challenge. Anyone interested?", likes: 8, time: "4h ago" },
    { id: "3", user: "Sophia Lee", avatar: "S", content: "Just discovered a great resource for learning skills on Youtube. Highly recommend!", likes: 15, time: "6h ago" },
    { id: "4", user: "David Wang", avatar: "D", content: "Anyone attending the upcoming skills workshop next weekend?", likes: 5, time: "1d ago" },
  ]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([
        { 
          id: Date.now().toString(), 
          user: "Matar", 
          avatar: "M",
          content: newPost, 
          likes: 0, 
          time: "Just now" 
        }, 
        ...posts
      ]);
      setNewPost("");
    }
  };

  const likePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
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
                  <Text style={styles.postTime}>{post.time}</Text>
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