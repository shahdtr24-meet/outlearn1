// import { MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useState } from 'react';
// import {
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import colors from '../colors';
// import ProfileHeader from '../components/ProfileHeader';

// const { width } = Dimensions.get('window');

// const skillCategories = [
//   {
//     id: 'finance',
//     title: 'Financial Skills',
//     icon: 'account-balance',
//     skills: [
//       { id: 'budget', name: 'Budgeting', progress: 65, level: 2 },
//       { id: 'invest', name: 'Investing', progress: 30, level: 1 },
//       { id: 'save', name: 'Saving', progress: 80, level: 3 },
//     ],
//   },
//   {
//     id: 'career',
//     title: 'Career Skills',
//     icon: 'work',
//     skills: [
//       { id: 'resume', name: 'Resume Building', progress: 45, level: 1 },
//       { id: 'interview', name: 'Interview Skills', progress: 20, level: 1 },
//       { id: 'network', name: 'Networking', progress: 10, level: 1 },
//     ],
//   },
//   {
//     id: 'life',
//     title: 'Life Skills',
//     icon: 'psychology',
//     skills: [
//       { id: 'time', name: 'Time Management', progress: 55, level: 2 },
//       { id: 'stress', name: 'Stress Management', progress: 40, level: 1 },
//       { id: 'comm', name: 'Communication', progress: 60, level: 2 },
//     ],
//   },
// ];

// export default function SkillsScreen() {
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   const toggleCategory = (categoryId) => {
//     if (expandedCategory === categoryId) {
//       setExpandedCategory(null);
//     } else {
//       setExpandedCategory(categoryId);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ProfileHeader />

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <Text style={styles.pageTitle}>My Skills</Text>

//         {skillCategories.map((category) => (
//           <View key={category.id} style={styles.categoryContainer}>
//             <TouchableOpacity
//               style={styles.categoryHeader}
//               onPress={() => toggleCategory(category.id)}
//             >
//               <View style={styles.categoryTitleContainer}>
//                 <MaterialIcons name={category.icon} size={24} color={colors.primary} />
//                 <Text style={styles.categoryTitle}>{category.title}</Text>
//               </View>
//               <MaterialIcons
//                 name={expandedCategory === category.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
//                 size={24}
//                 color={colors.text}
//               />
//             </TouchableOpacity>

//             {expandedCategory === category.id && (
//               <View style={styles.skillsContainer}>
//                 {category.skills.map((skill) => (
//                   <View key={skill.id} style={styles.skillCard}>
//                     <View style={styles.skillInfo}>
//                       <Text style={styles.skillName}>{skill.name}</Text>
//                       <View style={styles.levelBadge}>
//                         <Text style={styles.levelText}>Level {skill.level}</Text>
//                       </View>
//                     </View>
//                     <View style={styles.progressContainer}>
//                       <View style={styles.progressBar}>
//                         <View
//                           style={[styles.progressFill, { width: `${skill.progress}%` }]}
//                         />
//                       </View>
//                       <Text style={styles.progressText}>{skill.progress}%</Text>
//                     </View>
//                     <TouchableOpacity
//                       style={styles.practiceButton}
//                       onPress={() => {
                        
//                         if (category.id === 'finance' && skill.id === 'budget') {
//                           router.push('/courses/levelorg');
//                         } else {
//                           router.push(`//${skill.id}`);
//                         }
//                       }}
//                     >
//                       <Text style={styles.practiceButtonText}>Practice</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))}

//         <View style={styles.recommendedSection}>
//           <Text style={styles.recommendedTitle}>Recommended Skills</Text>
//           <View style={styles.recommendedContainer}>
//             {[
//               { id: 'tax', name: 'Tax Planning', icon: 'receipt-long' },
//               { id: 'leadership', name: 'Leadership', icon: 'groups' },
//               { id: 'negotiation', name: 'Negotiation', icon: 'handshake' },
//             ].map((skill) => (
//               <TouchableOpacity key={skill.id} style={styles.recommendedCard}>
//                 <View style={styles.recommendedIcon}>
//                   <MaterialIcons name={skill.icon} size={28} color={colors.primary} />
//                 </View>
//                 <Text style={styles.recommendedName}>{skill.name}</Text>
//                 <MaterialIcons name="add-circle" size={24} color={colors.primary} />
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <View style={styles.bottomSpacing} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingBottom: 70, // Add padding to account for tab bar on mobile
//   },
//   content: {
//     flex: 1,
//     padding: 15,
//     paddingBottom: 30,
//   },
//   pageTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: colors.text,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   categoryContainer: {
//     marginBottom: 15,
//     backgroundColor: colors.card,
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(44, 62, 80, 0.1)',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   categoryTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: colors.text,
//     marginLeft: 10,
//   },
//   skillsContainer: {
//     padding: 15,
//     paddingTop: 0,
//   },
//   skillCard: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(44, 62, 80, 0.1)',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   skillInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   skillName: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: colors.text,
//   },
//   levelBadge: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   levelText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   progressBar: {
//     flex: 1,
//     height: 8,
//     backgroundColor: 'rgba(114, 174, 230, 0.2)',
//     borderRadius: 4,
//     marginRight: 10,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: colors.primary,
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 12,
//     color: colors.textLight,
//     width: 40,
//     textAlign: 'right',
//   },
//   practiceButton: {
//     backgroundColor: colors.secondary,
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     alignSelf: 'flex-start',
//   },
//   practiceButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   recommendedSection: {
//     marginTop: 20,
//     marginBottom: 15,
//   },
//   recommendedTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 15,
//   },
//   recommendedContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   recommendedCard: {
//     backgroundColor: colors.card,
//     borderRadius: 12,
//     padding: 15,
//     width: '48%',
//     marginBottom: 15,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(44, 62, 80, 0.1)',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   recommendedIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(114, 174, 230, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   recommendedName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: colors.text,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   bottomSpacing: {
//     height: 50,
//   },
// });