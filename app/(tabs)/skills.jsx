import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

export default function SkillsScreen() {
  const skills = [
    { name: "less phone usage", progress: 80, icon: "phone-android" },
    { name: "technical", progress: 70, icon: "code" },
    { name: "UI/UX Design", progress: 50, icon: "palette" },  
    { name: "Communication", progress: 75, icon: "merge-type" },
    { name: "Time managment", progress: 55, icon: "storage" },
  ];
  
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
            <MaterialIcons name="trending-up" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Your Skills</Text>
          </View>
          
          {skills.map((skill) => (
            <View key={skill.name} style={styles.skillCard}>
              <View style={styles.skillIconContainer}>
                <MaterialIcons name={skill.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${skill.progress}%` },
                        skill.progress > 70 ? { backgroundColor: colors.success } : {}
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{skill.progress}%</Text>
                </View>
              </View>
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
  skillCard: {
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
  skillIconContainer: {
    marginRight: 16,
    justifyContent: "center",
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
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
    backgroundColor: colors.primary,
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