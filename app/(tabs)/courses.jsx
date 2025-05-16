import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

const courses = [
  {
    id: 'finance',
    title: 'Financial Management',
    icon: 'attach-money',
    description: 'Learn about interest rates, investments, and financial decision making',
    progress: 30,
    color: '#2ecc71',
  },
  {
    id: 'dilemma',
    title: 'Dilemma Management',
    icon: 'psychology',
    description: 'Master the art of handling complex decisions and ethical dilemmas',
    progress: 0,
    color: '#e74c3c',
  },
  {
    id: 'social',
    title: 'Social Skills',
    icon: 'groups',
    description: 'Improve your communication and interpersonal relationships',
    progress: 0,
    color: '#3498db',
  },
];

export default function CoursesScreen() {
  const router = useRouter();

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
          
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => router.push(`/courses/${course.id}`)}
            >
              <View style={[styles.courseIconContainer, { backgroundColor: course.color }]}>
                <MaterialIcons name={course.icon} size={32} color="white" />
              </View>
              <View style={styles.courseContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${course.progress}%`, backgroundColor: course.color }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{course.progress}%</Text>
                </View>
              </View>
            </TouchableOpacity>
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