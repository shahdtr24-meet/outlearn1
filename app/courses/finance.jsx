// File: app/finance/index.js

import { useRouter } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileHeader from '../components/ProfileHeader';

export default function FinanceIntroLanding() {
  const router = useRouter();

  const handleStartCourse = () => {
    router.push("/courses/finance-skills");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Financial Literacy Course</Text>
        <Text style={styles.subtitle}>
          Learn how to manage your money, budget wisely, and make smart financial decisions.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleStartCourse}>
          <Text style={styles.buttonText}>Start Course</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#FFB347",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
