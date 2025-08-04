import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../colors';

export default function OpportunityCostQuiz({ level, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [matchingPairs, setMatchingPairs] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sound, setSound] = useState();

  // Load sound effects
  useEffect(() => {
    loadSounds();
    return sound ? () => sound.unloadAsync() : undefined;
  }, []);

  const loadSounds = async () => {
    try {
      const { sound: correctSound } = await Audio.Sound.createAsync(
        require('../sound effects/raight answer .mp3')
      );
      const { sound: wrongSound } = await Audio.Sound.createAsync(
        require('../sound effects/wrong answer.mp3')
      );
      const { sound: winSound } = await Audio.Sound.createAsync(
        require('../sound effects/won the level.mp3')
      );
      const { sound: loseSound } = await Audio.Sound.createAsync(
        require('../sound effects/lost the level.mp3')
      );
      
      setSound({ correct: correctSound, wrong: wrongSound, win: winSound, lose: loseSound });
    } catch (error) {
      console.log('Error loading sounds:', error);
    }
  };

  const playSound = async (soundType) => {
    try {
      if (sound && sound[soundType]) {
        await sound[soundType].replayAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  // Handle interactive scenarios (Level 4)
  if (level.isInteractive && level.steps) {
    return (
      <InteractiveScenario 
        level={level}
        onComplete={onComplete}
        hearts={hearts}
        setHearts={setHearts}
        score={score}
        setScore={setScore}
      />
    );
  }

  // Handle regular questions
  const questions = level.questions || [];
  const currentQuestion = questions?.[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No questions available</Text>
      </View>
    );
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    let correct = false;
    switch (currentQuestion.type) {
      case 'multiple_choice':
        correct = answer === currentQuestion.correctAnswer;
        break;
      case 'true_false':
        correct = answer === currentQuestion.correctAnswer;
        break;
      case 'dropdown':
        correct = answer === currentQuestion.correctAnswer;
        break;
      case 'matching':
        // For matching, we need to check if all pairs match correctly
        if (Array.isArray(answer) && Array.isArray(currentQuestion.pairs)) {
          if (answer.length === currentQuestion.pairs.length) {
            // Check if all pairs in userAnswer exist in question.pairs
            correct = answer.every(userPair => 
              currentQuestion.pairs.some(correctPair => 
                correctPair.choice === userPair.choice && 
                correctPair.opportunityCost === userPair.opportunityCost
              )
            );
          }
        }
        break;
    }

    setIsCorrect(correct);
    
    if (!correct) {
      setHearts(prev => prev - 1);
      playSound('wrong');
    } else {
      setScore(prev => prev + 1);
      playSound('correct');
    }
  };



  const handleMatchingSubmit = () => {
    if (matchingPairs.length === currentQuestion.pairs.length) {
      handleAnswer(matchingPairs);
    }
  };

  const handleContinue = () => {
    if (hearts === 0) {
      playSound('lose');
      onComplete({ success: false, score });
      return;
    }

    if (currentQuestionIndex === (questions?.length || 0) - 1) {
      playSound('win');
      onComplete({ success: true, score });
      return;
    }

    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setMatchingPairs([]);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <View style={styles.answersContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswer === index && (
                    isCorrect ? styles.correctAnswer : styles.wrongAnswer
                  ),
                ]}
                onPress={() => !selectedAnswer && handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.answerText,
                  selectedAnswer === index && styles.selectedAnswerText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'true_false':
        return (
          <View style={styles.answersContainer}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === true && (
                  isCorrect ? styles.correctAnswer : styles.wrongAnswer
                ),
              ]}
              onPress={() => !selectedAnswer && handleAnswer(true)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.answerText,
                selectedAnswer === true && styles.selectedAnswerText
              ]}>
                True
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === false && (
                  isCorrect ? styles.correctAnswer : styles.wrongAnswer
                ),
              ]}
              onPress={() => !selectedAnswer && handleAnswer(false)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.answerText,
                selectedAnswer === false && styles.selectedAnswerText
              ]}>
                False
              </Text>
            </TouchableOpacity>
          </View>
        );



      case 'dropdown':
        return (
          <View style={styles.answersContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswer === index && (
                    isCorrect ? styles.correctAnswer : styles.wrongAnswer
                  ),
                ]}
                onPress={() => !selectedAnswer && handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.answerText,
                  selectedAnswer === index && styles.selectedAnswerText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'matching':
        return (
          <MatchingQuestion 
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        );

      default:
        return <Text style={styles.errorText}>Unknown question type</Text>;
    }
  };

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
          {currentQuestionIndex + 1}/{questions?.length || 0}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        {/* Answers */}
        {renderQuestion()}

        {/* Explanation */}
        {selectedAnswer !== null && (
          <View style={styles.explanationContainer}>
            <View style={styles.explanationHeader}>
              <Ionicons 
                name={isCorrect ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isCorrect ? "#4CAF50" : "#f44336"} 
              />
              <Text style={styles.explanationTitle}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </Text>
            </View>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )}

        {/* Continue Button */}
        {selectedAnswer !== null && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Continue"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// Interactive Scenario Component for Level 4
function InteractiveScenario({ level, onComplete, hearts, setHearts, score, setScore }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sound, setSound] = useState();

  // Load sound effects
  useEffect(() => {
    loadSounds();
    return sound ? () => {
      Object.values(sound).forEach(s => s?.unloadAsync());
    } : undefined;
  }, []);

  const loadSounds = async () => {
    try {
      const { sound: correctSound } = await Audio.Sound.createAsync(
        require('../sound effects/raight answer .mp3')
      );
      const { sound: wrongSound } = await Audio.Sound.createAsync(
        require('../sound effects/wrong answer.mp3')
      );
      const { sound: winSound } = await Audio.Sound.createAsync(
        require('../sound effects/won the level.mp3')
      );
      const { sound: loseSound } = await Audio.Sound.createAsync(
        require('../sound effects/lost the level.mp3')
      );
      
      setSound({ correct: correctSound, wrong: wrongSound, win: winSound, lose: loseSound });
    } catch (error) {
      console.log('Error loading sounds:', error);
    }
  };

  const playSound = async (soundType) => {
    try {
      if (sound && sound[soundType]) {
        await sound[soundType].replayAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const currentStep = level.steps?.[currentStepIndex];
  const currentQuestion = currentStep?.followUpQuestion || 
    (currentStep?.followUpQuestions && currentStep.followUpQuestions[currentQuestionIndex]);

  const handleStepChoice = (choice) => {
    setSelectedAnswer(choice);
    // Move to follow-up question
    setShowExplanation(true);
  };

  const handleFollowUpAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    let correct = false;
    if (currentQuestion.type === 'multiple_choice') {
      correct = currentQuestion.isMultipleSelect 
        ? JSON.stringify(answer.sort()) === JSON.stringify(currentQuestion.correctAnswers.sort())
        : answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'true_false') {
      correct = answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'matching') {
      // For matching, we need to check if all pairs match correctly
      if (Array.isArray(answer) && Array.isArray(currentQuestion.pairs)) {
        if (answer.length === currentQuestion.pairs.length) {
          // Check if all pairs in userAnswer exist in question.pairs
          correct = answer.every(userPair => 
            currentQuestion.pairs.some(correctPair => 
              correctPair.choice === userPair.choice && 
              correctPair.opportunityCost === userPair.opportunityCost
            )
          );
        }
      }
    }

    setIsCorrect(correct);
    
    if (!correct) {
      setHearts(prev => prev - 1);
      playSound('wrong');
    } else {
      setScore(prev => prev + 1);
      playSound('correct');
    }
  };

  const handleContinue = () => {
    if (hearts === 0) {
      playSound('lose');
      onComplete({ success: false, score });
      return;
    }

    // Check if we need to move to next question in current step
    if (currentStep?.followUpQuestions && currentQuestionIndex < currentStep.followUpQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
      return;
    }

    // Check if we need to move to next step
    if (currentStepIndex < (level.steps?.length || 0) - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
      return;
    }

    // All steps completed
    playSound('win');
    onComplete({ success: true, score });
  };

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
          Step {currentStepIndex + 1}/{level.steps?.length || 0}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.stepTitle}>{currentStep.title}</Text>
          <Text style={styles.question}>{currentStep.question}</Text>
        </View>

        {/* Step Choices */}
        {!showExplanation && (
          <View style={styles.answersContainer}>
            {currentStep.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.answerButton}
                onPress={() => handleStepChoice(index)}
              >
                <Text style={styles.answerText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Follow-up Question */}
        {showExplanation && currentQuestion && (
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{currentQuestion.question}</Text>
            </View>

            {currentQuestion.type === 'multiple_choice' && (
              <View style={styles.answersContainer}>
                {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.answerButton,
                      selectedAnswer === index && (
                        isCorrect ? styles.correctAnswer : styles.wrongAnswer
                      ),
                    ]}
                    onPress={() => !selectedAnswer && handleFollowUpAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <Text style={[
                      styles.answerText,
                      selectedAnswer === index && styles.selectedAnswerText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {currentQuestion.type === 'true_false' && (
              <View style={styles.answersContainer}>
                <TouchableOpacity
                  style={[
                    styles.answerButton,
                    selectedAnswer === true && (
                      isCorrect ? styles.correctAnswer : styles.wrongAnswer
                    ),
                  ]}
                  onPress={() => !selectedAnswer && handleFollowUpAnswer(true)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={[
                    styles.answerText,
                    selectedAnswer === true && styles.selectedAnswerText
                  ]}>
                    True
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.answerButton,
                    selectedAnswer === false && (
                      isCorrect ? styles.correctAnswer : styles.wrongAnswer
                    ),
                  ]}
                  onPress={() => !selectedAnswer && handleFollowUpAnswer(false)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={[
                    styles.answerText,
                    selectedAnswer === false && styles.selectedAnswerText
                  ]}>
                    False
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {currentQuestion.type === 'matching' && (
              <MatchingQuestion 
                question={currentQuestion}
                onAnswer={handleFollowUpAnswer}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
              />
            )}

            {/* Explanation */}
            {selectedAnswer !== null && (
              <View style={styles.explanationContainer}>
                <View style={styles.explanationHeader}>
                  <Ionicons 
                    name={isCorrect ? "checkmark-circle" : "close-circle"} 
                    size={24} 
                    color={isCorrect ? "#4CAF50" : "#f44336"} 
                  />
                  <Text style={styles.explanationTitle}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </Text>
                </View>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation}
                </Text>
              </View>
            )}
          </>
        )}

        {/* Continue Button */}
        {selectedAnswer !== null && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>
                             {currentStepIndex === (level.steps?.length || 0) - 1 && 
                (!currentStep?.followUpQuestions || currentQuestionIndex === currentStep.followUpQuestions.length - 1)
                ? "Finish" : "Continue"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// Matching Question Component
function MatchingQuestion({ question, onAnswer, selectedAnswer, isCorrect }) {
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
  };

  const handleOpportunityCostSelection = (opportunityCost) => {
    if (!selectedChoice) return;
    
    const newPair = { choice: selectedChoice, opportunityCost };
    const updatedPairs = [...selectedPairs, newPair];
    setSelectedPairs(updatedPairs);
    setSelectedChoice(null);
    
    // Only submit when all pairs are matched
    if (updatedPairs.length === question.pairs.length) {
      onAnswer(updatedPairs);
    }
  };

  const isChoiceUsed = (choice) => {
    return selectedPairs.some(pair => pair.choice === choice);
  };

  const isOpportunityCostUsed = (opportunityCost) => {
    return selectedPairs.some(pair => pair.opportunityCost === opportunityCost);
  };

  const isChoiceSelected = (choice) => {
    return selectedChoice === choice;
  };

  // Determine the column titles based on the skill
  const getColumnTitles = () => {
    // Check if this is opportunity cost by looking at the question text
    const isOpportunityCost = question.question.toLowerCase().includes('opportunity cost');
    
    if (isOpportunityCost) {
      return { left: 'Choices', right: 'Opportunity Costs' };
    } else {
      return { left: 'Items', right: 'Matches' };
    }
  };

  const columnTitles = getColumnTitles();

  return (
    <View style={styles.matchingContainer}>
      <Text style={styles.matchingInstructions}>
        Tap an item, then tap its matching pair
      </Text>
      
      <View style={styles.matchingColumnsContainer}>
        <View style={styles.matchingColumn}>
          <Text style={styles.matchingTitle}>{columnTitles.left}</Text>
          {question.pairs.map((pair, index) => (
            <TouchableOpacity
              key={`choice-${index}`}
              style={[
                styles.matchingItem,
                isChoiceUsed(pair.choice) && styles.usedItem,
                isChoiceSelected(pair.choice) && styles.selectedItem
              ]}
              onPress={() => !isChoiceUsed(pair.choice) && handleChoiceSelection(pair.choice)}
              disabled={isChoiceUsed(pair.choice)}
            >
              <Text style={[
                styles.matchingText,
                isChoiceUsed(pair.choice) && styles.usedText,
                isChoiceSelected(pair.choice) && styles.selectedText
              ]}>
                {pair.choice}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.matchingColumn}>
          <Text style={styles.matchingTitle}>{columnTitles.right}</Text>
          {question.pairs.map((pair, index) => (
            <TouchableOpacity
              key={`cost-${index}`}
              style={[
                styles.matchingItem,
                isOpportunityCostUsed(pair.opportunityCost) && styles.usedItem
              ]}
              onPress={() => !isOpportunityCostUsed(pair.opportunityCost) && handleOpportunityCostSelection(pair.opportunityCost)}
              disabled={isOpportunityCostUsed(pair.opportunityCost)}
            >
              <Text style={[
                styles.matchingText,
                isOpportunityCostUsed(pair.opportunityCost) && styles.usedText
              ]}>
                {pair.opportunityCost}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedChoice && (
        <View style={styles.selectionIndicator}>
          <Text style={styles.selectionText}>
            Now tap the match for: "{selectedChoice}"
          </Text>
        </View>
      )}

      {selectedPairs.length > 0 && (
        <View style={styles.matchedPairsContainer}>
          <Text style={styles.matchedPairsTitle}>Matched Pairs:</Text>
          {selectedPairs.map((pair, index) => (
            <Text key={index} style={styles.matchedPairText}>
              {pair.choice} → {pair.opportunityCost}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hearts: {
    flexDirection: 'row',
  },
  heart: {
    marginRight: 4,
  },
  progress: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 24,
  },
  answersContainer: {
    marginBottom: 24,
  },
  answerButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  correctAnswer: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  wrongAnswer: {
    borderColor: '#f44336',
    backgroundColor: '#FFEBEE',
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  selectedAnswerText: {
    fontWeight: '600',
  },

  explanationContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  explanationText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
  matchingContainer: {
    marginBottom: 24,
  },
  matchingInstructions: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  matchingColumnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  matchingColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  matchingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  matchingItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
  },
  usedItem: {
    backgroundColor: '#E8E8E8',
    borderColor: '#CCCCCC',
    opacity: 0.7,
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: '#F0F8FF',
  },
  matchingText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  usedText: {
    color: '#999999',
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '600',
  },
  selectionIndicator: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  matchedPairsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  matchedPairsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  matchedPairText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
}); 