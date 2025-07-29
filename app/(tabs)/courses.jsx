import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from '../../firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

const courses = [
  {
    id: 'finance',
    title: 'Financial Management',
    icon: 'attach-money',
    description: 'Learn about interest rates, investments, and financial decision making',
    color: '#2ecc71',
    levels: 10,
  },
  {
    id: 'dilemma',
    title: 'Dilemma Management',
    icon: 'psychology',
    description: 'Master the art of handling complex decisions and ethical dilemmas',
    color: '#e74c3c',
    levels: 1,
  },
  {
    id: 'social',
    title: 'Social Skills',
    icon: 'groups',
    description: 'Improve your communication and interpersonal relationships',
    color: '#3498db',
    levels: 1,
  },
];

export default function CoursesScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const [financeProgress, setFinanceProgress] = useState([]);

  useEffect(() => {
    if (!userId) return;
    
    const progressRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(progressRef, (docSnap) => {
      if (docSnap.exists()) {
        const completed = docSnap.data().financeProgress || [];
        setFinanceProgress(completed);
      } else {
        setFinanceProgress([]);
      }
    });
    return unsubscribe;
  }, [userId]);

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
            <MaterialIcons name="school" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Available Courses</Text>
          </View>
          
          {courses.map((course) => {
            let progress = 0;
            let locked = false;
            if (course.id === 'finance') {
              progress = Math.round((financeProgress.length / course.levels) * 100);
            } else {
              // Lock other courses until finance is complete
              locked = financeProgress.length < courses[0].levels;
            }
            return (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.courseCard,
                  locked && { opacity: 0.5 }
                ]}
                onPress={() => !locked && router.push(`/courses/${course.id}`)}
                disabled={locked}
              >
                <View style={[styles.courseIconContainer, { backgroundColor: course.color }]}>
                  <MaterialIcons name={course.icon} size={32} color="white" />
                  {locked && (
                    <MaterialIcons
                      name="lock"
                      size={28}
                      color="#fff"
                      style={{ position: 'absolute', bottom: 8, right: 8 }}
                    />
                  )}
                </View>
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseDescription}>{course.description}</Text>
                  {course.id === 'finance' && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${progress}%`, backgroundColor: course.color }
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>{progress}%</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
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
  courseCard: {
    flexDirection: "row",
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
  courseIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textLight,
    width: 38,
  },
});