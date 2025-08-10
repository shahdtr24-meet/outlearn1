// File: app/finance/index.js

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

export default function FinanceIntroLanding() {
  const router = useRouter();

  const goback = () => {
      router.push('/course');
  };
  const handleStartCourse = () => {
    router.push("/courses/finance-skills");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
       <TouchableOpacity onPress={goback} style={styles.backButton}>
  <MaterialIcons name="arrow-back" size={24} color={colors.text} />
  <Text style={styles.buttonText}>Go Back</Text>
</TouchableOpacity>

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
  backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
},

buttonText: {
  fontSize: 16,
  marginLeft: 8,
  color: colors.primary,
  fontWeight: '500',
},

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
