import { MaterialIcons } from "@expo/vector-icons";
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

export default function Index() {
  const goals = [
    { id: "1", title: "Master Breathing Techniques", progress: 70, icon: "self-improvement" },
    { id: "2", title: "Read 3 Technical Books", progress: 30, icon: "menu-book" },
    { id: "3", title: "Improve UI Design Skills", progress: 50, icon: "design-services" },
  ];

  const achievements = [
    { id: "1", title: "Excellence Award", icon: "star", date: "Mar 10, 2025" },
    { id: "2", title: "Fast Learner", icon: "speed", date: "Feb 22, 2025" },
    { id: "3", title: "Top Innovator", icon: "lightbulb", date: "Jan 15, 2025" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
      
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Goals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="flag" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Current Goals</Text>
          </View>
          
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <MaterialIcons name={goal.icon} size={24} color={colors.primary} />
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${goal.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{goal.progress}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="emoji-events" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementIconContainer}>
                  <MaterialIcons name={achievement.icon} size={24} color="white" />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            ))}
          </ScrollView>
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
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
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
  goalContent: {
    flex: 1,
    marginLeft: 16,
  },
  goalTitle: {
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
  achievementsContainer: {
    paddingVertical: 8,
    paddingRight: 8,
  },
  achievementCard: {
    width: 140,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    marginBottom: 6,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
});