import { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const DragDropQuiz = () => {
  const [droppedAnswer, setDroppedAnswer] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '', show: false });
  const [dragOverZone, setDragOverZone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const correctAnswer = "best alternative";
  const dropZoneRef = useRef(null);
  const draggedItemPosition = useRef(new Animated.ValueXY()).current;

  const answerOptions = [
    { id: 1, value: "wrong choice", color: "#92400e" },
    { id: 2, value: "best alternative", color: "#facc15" },
    { id: 3, value: "first option", color: "#fdba74" },
    { id: 4, value: "last decision", color: "#fb923c" }
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      setIsDragging(true);
      draggedItemPosition.setOffset({
        x: draggedItemPosition.x._value,
        y: draggedItemPosition.y._value,
      });
      draggedItemPosition.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (evt, gestureState) => {
      draggedItemPosition.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      setIsDragging(false);
      draggedItemPosition.flattenOffset();

      // Check if the dragged item is over the drop zone
      if (dropZoneRef.current) {
        dropZoneRef.current.measure((x, y, width, height, pageX, pageY) => {
          const dropZoneCenterX = pageX + width / 2;
          const dropZoneCenterY = pageY + height / 2;
          const draggedItemX = gestureState.moveX;
          const draggedItemY = gestureState.moveY;

          const distance = Math.sqrt(
            Math.pow(draggedItemX - dropZoneCenterX, 2) +
            Math.pow(draggedItemY - dropZoneCenterY, 2)
          );

          if (distance < 100) { // Drop zone radius
            handleDrop();
          }
        });
      }

      // Reset position
      Animated.spring(draggedItemPosition, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  const handleDrop = () => {
    if (draggedItem) {
      setDroppedAnswer(draggedItem);
      setFeedback({ message: '', type: '', show: false });
      setDraggedItem(null);
      setDragOverZone(false);
    }
  };

  const handleAnswerPress = (answer) => {
    if (!droppedAnswer || droppedAnswer.id !== answer.id) {
      setDraggedItem(answer);
      setDragOverZone(true);
    }
  };

  const handleDropZonePress = () => {
    if (droppedAnswer) {
      // Remove the answer from drop zone
      setDroppedAnswer(null);
      setFeedback({ message: '', type: '', show: false });
    }
  };

  const checkAnswer = () => {
    if (!droppedAnswer) {
      showFeedback('Please select an answer first!', 'error');
      return;
    }

    if (droppedAnswer.value === correctAnswer) {
      showFeedback('🎉 Correct! Opportunity cost is indeed the value of the best alternative you don\'t choose.', 'success');
    } else {
      showFeedback('❌ Not quite right. Try again! Think about what you give up when making a choice.', 'error');
    }
  };

  const showFeedback = (message, type) => {
    setFeedback({ message, type, show: true });
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const resetQuiz = () => {
    setDroppedAnswer(null);
    setDraggedItem(null);
    setFeedback({ message: '', type: '', show: false });
    setDragOverZone(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.quizBox}>
        <View style={styles.quizHeader}>
          <Text style={styles.quizTitle}>📚 FILL IN THE BLANK</Text>
          <Text style={styles.quizSubtitle}>Tap the answers to complete the sentence</Text>
        </View>

        <View style={styles.quizBody}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              Opportunity cost is the value of the{' '}
              <TouchableOpacity
                ref={dropZoneRef}
                style={[
                  styles.dropZone,
                  dragOverZone && styles.dropZoneDragOver,
                  droppedAnswer && feedback.show && 
                    (feedback.type === 'success' ? styles.dropZoneCorrect : styles.dropZoneIncorrect)
                ]}
                onPress={handleDropZonePress}
                activeOpacity={0.7}
              >
                {droppedAnswer ? (
                  <Text style={[styles.droppedOption, { backgroundColor: droppedAnswer.color }]}>
                    {droppedAnswer.value}
                  </Text>
                ) : (
                  <Text style={styles.placeholder}>Tap to select answer</Text>
                )}
              </TouchableOpacity>
              {' '}option you don't choose.
            </Text>
          </View>

          <View style={styles.answersSection}>
            <Text style={styles.answersTitle}>Available Answers:</Text>
            <View style={styles.answersGrid}>
              {answerOptions.map(answer => {
                const isUsed = droppedAnswer?.id === answer.id;
                return (
                  <TouchableOpacity
                    key={answer.id}
                    style={[
                      styles.answerCard,
                      { backgroundColor: answer.color },
                      isUsed && styles.answerCardUsed
                    ]}
                    onPress={() => !isUsed && handleAnswerPress(answer)}
                    disabled={isUsed}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.answerText,
                      (answer.color === '#facc15' || answer.color === '#fdba74') && styles.answerTextDark
                    ]}>
                      {answer.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, !droppedAnswer && styles.buttonDisabled]}
              onPress={checkAnswer}
              disabled={!droppedAnswer}
            >
              <Text style={styles.buttonText}>Check Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetQuiz}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {feedback.show && (
            <Animated.View 
              style={[
                styles.feedbackBox,
                feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError
              ]}
            >
              <Text style={styles.feedbackText}>{feedback.message}</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 20,
  },
  quizBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)',
    elevation: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  quizHeader: {
    backgroundColor: '#3b82f6',
    padding: 20,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  quizSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  quizBody: {
    padding: 20,
    backgroundColor: '#eff6ff',
  },
  questionBox: {
    backgroundColor: 'white',
    padding: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#3b82f6',
    borderRadius: 12,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  dropZone: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    height: 40,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  dropZoneDragOver: {
    backgroundColor: '#e0f2fe',
    borderColor: '#3b82f6',
    transform: [{ scale: 1.05 }],
  },
  dropZoneCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#e6ffed',
  },
  dropZoneIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  droppedOption: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
  },
  answersSection: {
    marginBottom: 20,
  },
  answersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  answersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  answerCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    minHeight: 60,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  answerCardUsed: {
    opacity: 0.3,
    transform: [{ scale: 0.95 }],
  },
  answerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  answerTextDark: {
    color: '#333',
  },
  buttons: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  resetButton: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedbackBox: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackSuccess: {
    backgroundColor: '#d1fae5',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  feedbackError: {
    backgroundColor: '#fee2e2',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  feedbackText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DragDropQuiz;