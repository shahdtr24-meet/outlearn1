// import { MaterialIcons } from '@expo/vector-icons';
// import { collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ProfileHeader from '../components/ProfileHeader';
// import { db } from '../../firebaseConfig';
// import { useAuth } from '../../hooks/useAuth';
// import { UserService } from '../../services/userService';
// import colors from '../colors';

// const { width } = Dimensions.get('window');

// const CommunityScreen = () => {
//   const { user, userProfile } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPosting, setIsPosting] = useState(false);

//   // Fetch posts on component mount
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Function to fetch posts from Firestore
//   const fetchPosts = async () => {
//     try {
//       setIsLoading(true);
//       const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
//       const querySnapshot = await getDocs(postsQuery);
      
//       const postsData = [];
//       querySnapshot.forEach((doc) => {
//         postsData.push({
//           id: doc.id,
//           ...doc.data(),
//           // Convert Firestore timestamp to JS Date
//           createdAt: doc.data().createdAt?.toDate() || new Date(),
//         });
//       });
      
//       setPosts(postsData);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to create a new post
//   const handleCreatePost = async () => {
//     if (!newPostContent.trim() || !user) return;
    
//     try {
//       setIsPosting(true);
//       await UserService.createCommunityPost(
//         user.uid,
//         userProfile?.displayName || user.email || 'Anonymous',
//         newPostContent.trim()
//       );
      
//       // Clear input and refresh posts
//       setNewPostContent('');
//       await fetchPosts();
//     } catch (error) {
//       console.error('Error creating post:', error);
//     } finally {
//       setIsPosting(false);
//     }
//   };

//   // Function to like/unlike a post
//   const handleToggleLike = async (postId) => {
//     if (!user) return;
    
//     try {
//       await UserService.togglePostLike(postId, user.uid);
//       // Refresh posts to update like count
//       await fetchPosts();
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   // Format date for display
//   const formatDate = (date) => {
//     if (!date) return '';
    
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / (1000 * 60));
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
    
//     return date.toLocaleDateString();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ProfileHeader />
      
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidingView}
//       >
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Community</Text>
//           <Text style={styles.headerSubtitle}>Connect with other learners</Text>
//         </View>
        
//         <View style={styles.content}>
//           {/* New Post Input */}
//           <View style={styles.newPostContainer}>
//             <View style={styles.avatarContainer}>
//               <Text style={styles.avatarText}>
//                 {userProfile?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
//               </Text>
//             </View>
            
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Share something with the community..."
//                 placeholderTextColor={colors.textLight}
//                 multiline
//                 value={newPostContent}
//                 onChangeText={setNewPostContent}
//               />
              
//               <TouchableOpacity 
//                 style={[styles.postButton, !newPostContent.trim() && styles.postButtonDisabled]}
//                 onPress={handleCreatePost}
//                 disabled={!newPostContent.trim() || isPosting}
//               >
//                 {isPosting ? (
//                   <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                   <Text style={styles.postButtonText}>Post</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           {/* Posts List */}
//           {isLoading ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color={colors.primary} />
//               <Text style={styles.loadingText}>Loading posts...</Text>
//             </View>
//           ) : (
//             <ScrollView style={styles.postsContainer}>
//               {posts.length === 0 ? (
//                 <View style={styles.emptyContainer}>
//                   <MaterialIcons name="forum" size={48} color={colors.textLight} />
//                   <Text style={styles.emptyText}>No posts yet. Be the first to share!</Text>
//                 </View>
//               ) : (
//                 posts.map((post) => (
//                   <View key={post.id} style={styles.postCard}>
//                     <View style={styles.postHeader}>
//                       <View style={styles.postUser}>
//                         <View style={styles.postAvatar}>
//                           <Text style={styles.postAvatarText}>{post.avatar || 'A'}</Text>
//                         </View>
//                         <View>
//                           <Text style={styles.postUsername}>{post.user || 'Anonymous'}</Text>
//                           <Text style={styles.postTime}>{formatDate(post.createdAt)}</Text>
//                         </View>
//                       </View>
//                     </View>
                    
//                     <Text style={styles.postContent}>{post.content}</Text>
                    
//                     <View style={styles.postFooter}>
//                       <TouchableOpacity 
//                         style={styles.likeButton} 
//                         onPress={() => handleToggleLike(post.id)}
//                       >
//                         <MaterialIcons 
//                           name={post.likedBy?.includes(user?.uid) ? "favorite" : "favorite-border"} 
//                           size={20} 
//                           color={post.likedBy?.includes(user?.uid) ? colors.primary : colors.textLight} 
//                         />
//                         <Text 
//                           style={[styles.likeCount, post.likedBy?.includes(user?.uid) && styles.likedText]}
//                         >
//                           {post.likes || 0}
//                         </Text>
//                       </TouchableOpacity>
                      
//                       <TouchableOpacity style={styles.commentButton}>
//                         <MaterialIcons name="chat-bubble-outline" size={18} color={colors.textLight} />
//                         <Text style={styles.commentText}>Comment</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))
//               )}
//               <View style={styles.bottomSpacing} />
//             </ScrollView>
//           )}
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAF9',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 20,
//     paddingTop: 15,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 5,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)',
//   },
//   content: {
//     flex: 1,
//     padding: 15,
//   },
//   newPostContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: 'rgba(44, 62, 80, 0.1)',
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   inputContainer: {
//     flex: 1,
//   },
//   input: {
//     backgroundColor: 'rgba(114, 174, 230, 0.1)',
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 80,
//     color: colors.text,
//     fontSize: 14,
//     textAlignVertical: 'top',
//   },
//   postButton: {
//     backgroundColor: colors.primary,
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     alignSelf: 'flex-end',
//     marginTop: 10,
//   },
//   postButtonDisabled: {
//     backgroundColor: 'rgba(114, 174, 230, 0.5)',
//   },
//   postButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: colors.textLight,
//     fontSize: 14,
//   },
//   postsContainer: {
//     flex: 1,
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 40,
//   },
//   emptyText: {
//     marginTop: 10,
//     color: colors.textLight,
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   postCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: 'rgba(44, 62, 80, 0.1)',
//   },
//   postHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   postUser: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   postAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   postAvatarText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   postUsername: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: colors.text,
//   },
//   postTime: {
//     fontSize: 12,
//     color: colors.textLight,
//   },
//   postContent: {
//     fontSize: 14,
//     color: colors.text,
//     lineHeight: 20,
//     marginBottom: 15,
//   },
//   postFooter: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(44, 62, 80, 0.1)',
//     paddingTop: 10,
//   },
//   likeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   likeCount: {
//     marginLeft: 5,
//     fontSize: 14,
//     color: colors.textLight,
//   },
//   likedText: {
//     color: colors.primary,
//   },
//   commentButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   commentText: {
//     marginLeft: 5,
//     fontSize: 14,
//     color: colors.textLight,
//   },
//   bottomSpacing: {
//     height: 70,
//   },
// });

// export default CommunityScreen;