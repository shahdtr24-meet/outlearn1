import { MaterialIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../colors';


export default function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (!correct) {
      setHearts(prev => prev - 1);
    } else {
      setScore(prev => prev + 1);
    }
  };

  const handleContinue = () => {
    if (hearts === 0) {
      onComplete({ success: false, score });
      return;
    }

    if (currentQuestion === questions.length - 1) {
      onComplete({ success: true, score });
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const question = questions[currentQuestion];

  // Get screen dimensions for responsive design
  const { width: windowWidth } = Dimensions.get('window');
  const isTablet = windowWidth >= 768;
  const isWeb = Platform.OS === 'web';
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.hearts}>
          {[...Array(3)].map((_, i) => (
            <MaterialIcons
              key={i}
              name="favorite"
              size={isTablet ? 30 : 24}
              color={i < hearts ? '#e74c3c' : colors.border}
              style={styles.heart}
            />
          ))}
        </View>
        <Text style={[styles.progress, isTablet && styles.tabletText]}>
          {currentQuestion + 1}/{questions.length}
        </Text>
      </View>

      {/* Question */}
      <View style={[styles.questionContainer, isTablet && styles.tabletQuestionContainer]}>
        <Text style={[styles.question, isTablet && styles.tabletQuestion]}>{question.question}</Text>
      </View>

      {/* Answers */}
      <View style={[styles.answersContainer, isTablet && { maxWidth: 600, alignSelf: 'center', width: '100%' }]}>
        {question.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              isTablet && styles.tabletAnswerButton,
              isWeb && styles.webAnswerButton,
              selectedAnswer === answer && (
                isCorrect ? styles.correctAnswer : styles.wrongAnswer
              ),
            ]}
            onPress={() => !selectedAnswer && handleAnswer(answer)}
            disabled={selectedAnswer !== null}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.answerText,
              isTablet && styles.tabletAnswerText,
              selectedAnswer === answer && styles.selectedAnswerText
            ]}>
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      {selectedAnswer !== null && (
        <TouchableOpacity
          style={[styles.continueButton, isTablet && styles.tabletContinueButton]}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={[styles.continueText, isTablet && styles.tabletContinueText]}>Continue</Text>
        </TouchableOpacity>
      )}
    </ScrollView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  hearts: {
    flexDirection: 'row',
  },
  heart: {
    marginRight: 8,
  },
  progress: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  tabletText: {
    fontSize: 20,
  },
  questionContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  tabletQuestionContainer: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
  question: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 24,
  },
  tabletQuestion: {
    fontSize: 22,
    lineHeight: 30,
  },
  answersContainer: {
    gap: 12,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  answerButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.2s',
      },
    }),
  },
  tabletAnswerButton: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 4,
  },
  webAnswerButton: {
    ':hover': {
      transform: [{ scale: 1.02 }],
      backgroundColor: '#f8f8f8',
    },
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  tabletAnswerText: {
    fontSize: 18,
  },
  selectedAnswerText: {
    color: 'white',
  },
  correctAnswer: {
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  },
  wrongAnswer: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.2s',
        ':hover': {
          transform: [{ scale: 1.05 }],
          backgroundColor: '#d68910',
        },
      },
    }),
  },
  tabletContinueButton: {
    padding: 20,
    borderRadius: 16,
    marginTop: 32,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tabletContinueText: {
    fontSize: 20,
  },
});