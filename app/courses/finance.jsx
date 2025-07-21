import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../firebaseConfig";
import colors from '../colors';
import ProfileHeader, { userAvatar, userName } from '../components/ProfileHeader';
import Quiz from '../components/Quiz';

// --- LEVELS WITH 5 QUESTIONS EACH (for demo, questions are repeated/varied) ---
const baseQuestions = [
  {
    question: "Which investment option would you choose?",
    answers: ["$15,000 with 10% interest rate", "$10,000 with 15% interest rate"],
    correctAnswer: "$10,000 with 15% interest rate",
    explanation: "The second option yields $1,500 vs $1,500 from the first option, but requires less capital."
  },
  {
    question: "If you have $5,000 to invest, which option is better?",
    answers: ["5% guaranteed annual return", "50% chance of 12% return, 50% chance of 0%"],
    correctAnswer: "5% guaranteed annual return",
    explanation: "The expected value is the same (5%), but the guaranteed return has no risk."
  },
  {
    question: "You're offered two payment options for a $1,000 loan. Which is better?",
    answers: ["12% APR compounded annually", "1% monthly simple interest"],
    correctAnswer: "12% APR compounded annually",
    explanation: "1% monthly equals 12% annually, but simple interest is better than compound for loans."
  },
  {
    question: "Which savings account would you choose?",
    answers: ["3% interest compounded monthly", "3.1% interest compounded annually"],
    correctAnswer: "3% interest compounded monthly",
    explanation: "Monthly compounding will yield more than annual compounding with similar rates."
  },
  {
    question: "For a $20,000 car loan, which is the better option?",
    answers: ["0% APR for 36 months", "2% APR for 48 months with $1,000 cash back"],
    correctAnswer: "0% APR for 36 months",
    explanation: "The total interest paid on the 2% loan would exceed the $1,000 cash back."
  }
];

const levels = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  questions: baseQuestions.map((q, idx) => ({
    ...q,
    question: `Level ${i + 1} - Q${idx + 1}: ${q.question}`
  }))
}));
// --- END LEVELS ---

const userId = userName; // For demo, use userName as userId

export default function FinanceCourse() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);
  const router = useRouter();

  // Real-time listener for progress
  useEffect(() => {
    const progressRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(progressRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompletedLevels(docSnap.data().financeProgress || []);
      } else {
        setCompletedLevels([]);
      }
    });
    return unsubscribe;
  }, []);

  const handleQuizComplete = async (result) => {
    setQuizResult(result);
    if (result.success && selectedLevel) {
      // Update progress in Firestore
      const progressRef = doc(db, "users", userId);
      const docSnap = await getDoc(progressRef);
      let newCompleted = [];
      if (docSnap.exists()) {
        const prev = docSnap.data().financeProgress || [];
        newCompleted = prev.includes(selectedLevel) ? prev : [...prev, selectedLevel];
      } else {
        newCompleted = [selectedLevel];
      }
      await setDoc(progressRef, { financeProgress: newCompleted }, { merge: true });
      // Post to community
      await addDoc(collection(db, "posts"), {
        user: userName,
        avatar: userAvatar,
        content: `Just completed level ${selectedLevel} of the Financial Management course! 🎉`,
        likes: 0,
        time: "Just now",
        createdAt: new Date()
      });
    }
  };

  const handleTryAgain = () => {
    setQuizResult(null);
  };

  const handleBackToLevels = () => {
    setQuizResult(null);
    setSelectedLevel(null);
  };

  // Add this function to handle going back to Courses
  const handleBackToCourses = () => {
    router.push("/courses");
  };

  // Progress calculation
  const progressPercent = Math.round((completedLevels.length / levels.length) * 100);

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
              Score: {quizResult.score}/5
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleTryAgain}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleBackToLevels}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Back to Levels
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedLevel) {
    const levelObj = levels.find(l => l.id === selectedLevel);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader />
        <Quiz
          questions={levelObj.questions}
          onComplete={handleQuizComplete}
        />
        <TouchableOpacity
          style={[styles.button, styles.leaveButton]}
          onPress={handleBackToLevels}
        >
          <Text style={[styles.buttonText, styles.leaveButtonText]}>Leave Level</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleBackToCourses}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Back to Courses</Text>
        </TouchableOpacity>
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
              Complete all 10 levels to master financial management!
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, { alignSelf: 'center', marginBottom: 16 }]}
            onPress={handleBackToCourses}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Back to Courses</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${progressPercent}%` }
                ]} 
              />
              {/* Add a gray background for the rest of the bar */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: colors.border, width: '100%', zIndex: -1 }
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progressPercent}% completed</Text>
          </View>
          <Text style={styles.levelsTitle}>Levels</Text>
          {levels.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            return (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.levelCard,
                  isCompleted && styles.levelCardCompleted
                ]}
                onPress={() => setSelectedLevel(level.id)}
                disabled={isCompleted && false /* allow redo if failed */}
              >
                <Text style={styles.levelText}>Level {level.id}</Text>
                {isCompleted && (
                  <MaterialIcons name="check" size={20} color={colors.success} />
                )}
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
  courseHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
  },
  courseDescription: {
    fontSize: 15,
    color: colors.textLight,
    marginTop: 4,
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textLight,
    width: 80,
  },
  levelsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  levelCardCompleted: {
    backgroundColor: colors.success,
    opacity: 0.6,
  },
  levelText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
    color: colors.text,
  },
  resultScore: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  leaveButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.error || '#e74c3c',
    marginTop: 10,
  },
  leaveButtonText: {
    color: colors.error || '#e74c3c',
  },
}); 