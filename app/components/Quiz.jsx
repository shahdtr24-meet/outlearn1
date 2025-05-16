import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.hearts}>
          {[...Array(3)].map((_, i) => (
            <MaterialIcons
              key={i}
              name="favorite"
              size={24}
              color={i < hearts ? '#e74c3c' : colors.border}
              style={styles.heart}
            />
          ))}
        </View>
        <Text style={styles.progress}>
          {currentQuestion + 1}/{questions.length}
        </Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
      </View>

      {/* Answers */}
      <View style={styles.answersContainer}>
        {question.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === answer && (
                isCorrect ? styles.correctAnswer : styles.wrongAnswer
              ),
            ]}
            onPress={() => !selectedAnswer && handleAnswer(answer)}
            disabled={selectedAnswer !== null}
          >
            <Text style={[
              styles.answerText,
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
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  hearts: {
    flexDirection: 'row',
  },
  heart: {
    marginRight: 4,
  },
  progress: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  questionContainer: {
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
  question: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 24,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
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
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 