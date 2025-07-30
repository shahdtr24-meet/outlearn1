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
import { db } from "../../firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { UserService } from "../../services/userService";
import ProfileHeader from '../components/ProfileHeader';
import Quiz from '../components/Quiz';

// --- LEVELS WITH 5 QUESTIONS EACH (for demo, questions are repeated/varied) ---
const baseQuestions = [
  {
    question: " Opportunity cost always 	involves spending money.",
    answers: ["true", "false"],
    correctAnswer: "false",
    explanation: "Opportunity cost is about what you give up, not just money. It could be time, experiences, or other benefits"
  },
  {
    question: "Opportunity cost doesn’t 	affect personal finance decisions.",
    answers: ["true", "false"],
    correctAnswer: "false",
    explanation: "Every personal finance choice involves giving up other options, which is exactly what opportunity cost is."
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

export default function FinanceCourse() {
  const { userId, userProfile } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);
  const router = useRouter();

  // Real-time listener for progress
  useEffect(() => {
    if (userId) {
      const progressRef = doc(db, "users", userId);
      const unsubscribe = onSnapshot(progressRef, (docSnap) => {
        if (docSnap.exists()) {
          setCompletedLevels(docSnap.data().financeProgress || []);
        } else {
          setCompletedLevels([]);
        }
      });
      return unsubscribe;
    }
  }, [userId]);

  const handleQuizComplete = async (result) => {
    setQuizResult(result);
    if (result.success && selectedLevel && userId) {
      try {
        // Update progress using UserService
        const progressResult = await UserService.updateCourseProgress(userId, 'finance', selectedLevel);
        
        if (progressResult.success) {
          // Create community post
          const displayName = userProfile?.displayName || 'User';
          await UserService.createCommunityPost(
            userId,
            displayName,
            `Just completed level ${selectedLevel} of the Financial Management course! 🎉`
          );
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
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
          {/* Course Header */}
          <View style={styles.courseHeader}>
            <Text style={styles.courseTitle}>FINANCIAL LITERACY</Text>
            <Text style={styles.progressText}>{progressPercent}% completed</Text>
            
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, { marginTop: 16 }]}
              onPress={handleBackToCourses}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Back to Courses</Text>
            </TouchableOpacity>
          </View>

          {/* Vertical Path with Levels */}
          <View style={styles.pathContainer}>
            {levels.map((level, index) => {
              const isCompleted = completedLevels.includes(level.id);
              const isUnlocked = index === 0 || completedLevels.includes(level.id - 1);
              const isLast = index === levels.length - 1;
              
              return (
                <View key={level.id} style={styles.levelContainer}>
                  {/* Connecting Line Above (except for first level) */}
                  {index > 0 && (
                    <View style={styles.connectingLine} />
                  )}
                  
                  {/* Level Node */}
                  <TouchableOpacity
                    style={[
                      styles.levelNode,
                      isCompleted && styles.levelNodeCompleted,
                      !isUnlocked && styles.levelNodeLocked
                    ]}
                    onPress={() => isUnlocked && setSelectedLevel(level.id)}
                    disabled={!isUnlocked}
                  >
                    {isCompleted ? (
                      <MaterialIcons name="check" size={24} color="#fff" />
                    ) : !isUnlocked ? (
                      <MaterialIcons name="lock" size={24} color="#8B4513" />
                    ) : (
                      <MaterialIcons name="attach-money" size={24} color="#fff" />
                    )}
                  </TouchableOpacity>
                  
                  {/* Level Label */}
                  <Text style={[
                    styles.levelLabel,
                    !isUnlocked && styles.levelLabelLocked
                  ]}>
                    Level {level.id}
                  </Text>
                  
                  {/* Connecting Line Below (except for last level) */}
                  {!isLast && (
                    <View style={styles.connectingLine} />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  courseHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#4A90E2',
    marginBottom: 8,
    letterSpacing: 1,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    letterSpacing: 0.5,
  },
  pathContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  levelContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  connectingLine: {
    width: 3,
    height: 40,
    backgroundColor: '#ddd',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  levelNode: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB347',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
  },
  levelNodeCompleted: {
    backgroundColor: '#2ecc71',
  },
  levelNodeLocked: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
    letterSpacing: 0.5,
  },
  levelLabelLocked: {
    color: '#999',
  },
  resultCard: {
    backgroundColor: '#fff',
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
    color: '#333',
  },
  resultScore: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFB347',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFB347',
  },
  secondaryButtonText: {
    color: '#FFB347',
  },
  leaveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    marginTop: 10,
  },
  leaveButtonText: {
    color: '#e74c3c',
  },
});