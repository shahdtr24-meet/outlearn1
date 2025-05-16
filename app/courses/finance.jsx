import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import Quiz from '../components/Quiz';

const questions = [
  {
    question: "Which investment option would you choose?",
    answers: [
      "$15,000 with 10% interest rate",
      "$10,000 with 15% interest rate"
    ],
    correctAnswer: "$10,000 with 15% interest rate",
    explanation: "The second option yields $1,500 vs $1,500 from the first option, but requires less capital."
  },
  {
    question: "If you have $5,000 to invest, which option is better?",
    answers: [
      "5% guaranteed annual return",
      "50% chance of 12% return, 50% chance of 0%"
    ],
    correctAnswer: "5% guaranteed annual return",
    explanation: "The expected value is the same (5%), but the guaranteed return has no risk."
  },
  {
    question: "You're offered two payment options for a $1,000 loan. Which is better?",
    answers: [
      "12% APR compounded annually",
      "1% monthly simple interest"
    ],
    correctAnswer: "12% APR compounded annually",
    explanation: "1% monthly equals 12% annually, but simple interest is better than compound for loans."
  },
  {
    question: "Which savings account would you choose?",
    answers: [
      "3% interest compounded monthly",
      "3.1% interest compounded annually"
    ],
    correctAnswer: "3% interest compounded monthly",
    explanation: "Monthly compounding will yield more than annual compounding with similar rates."
  },
  {
    question: "For a $20,000 car loan, which is the better option?",
    answers: [
      "0% APR for 36 months",
      "2% APR for 48 months with $1,000 cash back"
    ],
    correctAnswer: "0% APR for 36 months",
    explanation: "The total interest paid on the 2% loan would exceed the $1,000 cash back."
  },
  {
    question: "Which investment strategy is better for long-term wealth building?",
    answers: [
      "Investing $200 monthly in a diversified portfolio",
      "Saving to invest $2,400 at the end of each year"
    ],
    correctAnswer: "Investing $200 monthly in a diversified portfolio",
    explanation: "Monthly investing takes advantage of dollar-cost averaging and compound interest."
  },
  {
    question: "You have a chance to invest in a startup. Which option is better?",
    answers: [
      "10% ownership for $50,000",
      "5% ownership for $20,000"
    ],
    correctAnswer: "5% ownership for $20,000",
    explanation: "The second option values the company at $400k vs $500k, making it a better deal."
  },
  {
    question: "Which retirement saving strategy is better?",
    answers: [
      "Contributing 6% with 100% employer match",
      "Contributing 10% with no employer match"
    ],
    correctAnswer: "Contributing 6% with 100% employer match",
    explanation: "The employer match doubles your contribution, making it effectively 12%."
  },
  {
    question: "For an emergency fund, which option is better?",
    answers: [
      "High-yield savings account at 2% APY",
      "Certificate of Deposit at 2.5% APY"
    ],
    correctAnswer: "High-yield savings account at 2% APY",
    explanation: "Emergency funds should be easily accessible without penalties."
  },
  {
    question: "Which debt should you pay off first?",
    answers: [
      "$5,000 credit card debt at 20% APR",
      "$10,000 student loan at 5% APR"
    ],
    correctAnswer: "$5,000 credit card debt at 20% APR",
    explanation: "Higher interest rate debt should be prioritized to minimize interest payments."
  },
];

export default function FinanceCourse() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const router = useRouter();

  const handleQuizComplete = (result) => {
    setQuizResult(result);
  };

  const handleTryAgain = () => {
    setQuizResult(null);
    setIsQuizStarted(true);
  };

  const handleBackToCourses = () => {
    router.back();
  };

  if (quizResult) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader />
        <View style={styles.contentContainer}>
          <View style={styles.resultCard}>
            <MaterialIcons
              name={quizResult.success ? "check-circle" : "error"}
              size={64}
              color={quizResult.success ? '#2ecc71' : '#e74c3c'}
            />
            <Text style={styles.resultTitle}>
              {quizResult.success ? 'Congratulations!' : 'Try Again!'}
            </Text>
            <Text style={styles.resultScore}>
              Score: {quizResult.score}/10
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleTryAgain}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleBackToCourses}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Back to Courses
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (isQuizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader />
        <Quiz
          questions={questions}
          onComplete={handleQuizComplete}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.courseHeader}>
            <MaterialIcons name="attach-money" size={48} color={colors.primary} />
            <Text style={styles.courseTitle}>Financial Management</Text>
            <Text style={styles.courseDescription}>
              Test your knowledge of financial concepts and decision-making skills.
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialIcons name="help-outline" size={24} color={colors.primary} />
              <Text style={styles.infoText}>10 Questions</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="favorite" size={24} color={colors.primary} />
              <Text style={styles.infoText}>3 Hearts</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="timer" size={24} color={colors.primary} />
              <Text style={styles.infoText}>No Time Limit</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setIsQuizStarted(true)}
          >
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
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
  courseHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    margin: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
}); 