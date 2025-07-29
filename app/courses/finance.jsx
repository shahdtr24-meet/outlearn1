import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { db } from "../../firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { UserService } from "../../services/userService";
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';
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
      const unsubscribe = onSnapshot(
        progressRef, 
        (docSnap) => {
          try {
            if (docSnap.exists()) {
              // Always convert to numbers!
              setCompletedLevels((docSnap.data().financeProgress || []).map(Number));
            } else {
              setCompletedLevels([]);
            }
          } catch (error) {
            console.error('Error processing progress data:', error);
            setCompletedLevels([]);
          }
        },
        (error) => {
          console.error('Error listening to progress:', error);
          setCompletedLevels([]);
        }
      );
      return unsubscribe;
    }
  }, [userId]);

  const handleQuizComplete = async (result) => {
    setQuizResult(result);
    if (result.success && selectedLevel && userId) {
      try {
        // Update progress using UserService
        const progressResult = await UserService.updateCourseProgress(userId, 'finance', Number(selectedLevel));
        
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

  console.log('Completed levels:', completedLevels);
  console.log('Progress percent:', progressPercent);

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
        {/* Timer component */}
        <CountdownCircleTimer
          isPlaying
          duration={120}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[120, 60, 30, 0]}
          size={80}
          onComplete={() => {
            // Handle timer end (e.g., auto-submit or show message)
            setQuizResult({ success: false, score: 0 });
            return [false, 0]; // Don't repeat
          }}
        >
          {({ remainingTime }) => (
            <Text style={{ color: colors.text, fontSize: 20 }}>
              {Math.floor(remainingTime / 60)}:{('0' + (remainingTime % 60)).slice(-2)}
            </Text>
          )}
        </CountdownCircleTimer>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
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
            </View>
            <Text style={styles.progressText}>{progressPercent}% completed</Text>
          </View>
          <Text style={styles.levelsTitle}>Levels</Text>
          <View style={styles.roadmapContainer}>
            {levels.map((level, idx) => {
              const isCompleted = completedLevels.includes(level.id);
              const isUnlocked = idx === 0 || completedLevels.includes(level.id - 1);
              // Zig-zag: alternate left/right offset
              const offset = idx % 2 === 0 ? 0 : 60;
              return (
                <View key={level.id} style={[styles.roadmapRow, { marginLeft: offset }]}>
                  <TouchableOpacity
                    style={[
                      styles.levelCircle,
                      isCompleted && styles.levelCircleCompleted,
                      !isUnlocked && styles.levelCircleLocked
                    ]}
                    onPress={() => isUnlocked && setSelectedLevel(level.id)}
                    disabled={!isUnlocked}
                    activeOpacity={isUnlocked ? 0.7 : 1}
                  >
                    <Text style={styles.levelCircleText}>L{level.id}</Text>
                    {!isUnlocked && (
                      <MaterialIcons name="lock" size={28} color="#888" style={styles.lockIcon} />
                    )}
                    {isCompleted && (
                      <MaterialIcons name="check-circle" size={24} color="#fff" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                  {/* Draw connector line except for last level */}
                  {idx < levels.length - 1 && (
                    <View style={styles.connectorLine} />
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
  roadmapContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  roadmapRow: {
    alignItems: 'center',
    marginBottom: 0,
    position: 'relative',
  },
  connectorLine: {
    width: 4,
    height: 40,
    backgroundColor: '#bbb',
    position: 'absolute',
    top: 72,
    left: '50%',
    marginLeft: -2,
    zIndex: -1,
  },
  levelCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
  },
  levelCircleCompleted: {
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
    opacity: 1,
  },
  levelCircleLocked: {
    backgroundColor: colors.border,
    borderColor: '#bbb',
    opacity: 0.5,
  },
  levelCircleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },
  lockIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
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