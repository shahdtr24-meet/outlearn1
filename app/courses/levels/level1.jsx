import { Audio } from 'expo-av';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [selectedCosts, setSelectedCosts] = useState([]);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [shuffledData, setShuffledData] = useState([]);
  const [fadeAnimations, setFadeAnimations] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const [hearts, setHearts] = useState(3);
  const [wrongMatches, setWrongMatches] = useState({});
  const [isProcessingMatch, setIsProcessingMatch] = useState(false);
  const timerRef = useRef(null);
  const soundRef = useRef(null);

  const gameData = [
    {
      choice: "Play video games",
      opportunityCost: "Better grades"
    },
    {
      choice: "Buy candy",
      opportunityCost: "Saving money"
    },
    {
      choice: "Take a nap",
      opportunityCost: "Time with friends"
    },
    {
      choice: "Watch TV",
      opportunityCost: "Reading a book"
    },
    {
      choice: "Skip homework",
      opportunityCost: "Learning new skills"
    },
    {
      choice: "Spend all allowance",
      opportunityCost: "Buying something bigger later"
    },
    {
      choice: "Stay up late",
      opportunityCost: "Feeling rested tomorrow"
    },
    {
      choice: "Eat junk food",
      opportunityCost: "Better health"
    },
    {
      choice: "Ignore chores",
      opportunityCost: "Clean living space"
    },
    {
      choice: "Play on phone",
      opportunityCost: "Quality family time"
    }
  ];

  // Load sound effects
  useEffect(() => {
    setupAudio();
    loadSounds();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const setupAudio = async () => {
    try {
      console.log('Setting up audio...');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      console.log('Audio setup complete');
    } catch (error) {
      console.log('Error setting up audio:', error);
    }
  };

  // Shuffle the data when component mounts
  useEffect(() => {
    shuffleData();
    startTimer();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted && !gameLost) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameCompleted) {
      handleGameLost('Time\'s up!');
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, gameCompleted, gameLost]);

  // Check hearts
  useEffect(() => {
    if (hearts <= 0 && !gameLost) {
      handleGameLost('You ran out of hearts!');
    }
  }, [hearts, gameLost]);

  const loadSounds = async () => {
    try {
      console.log('Loading sounds...');
      const { sound } = await Audio.Sound.createAsync(
        require('../../sound effects/raight answer .mp3')
      );
      soundRef.current = sound;
      console.log('Sounds loaded successfully');
    } catch (error) {
      console.log('Error loading sound:', error);
    }
  };

  const playSound = async (soundFile) => {
    try {
      console.log('Playing sound:', soundFile);
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      console.log('Sound started playing');
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          console.log('Sound finished playing');
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const startTimer = () => {
    setTimeLeft(60);
  };

  const handleGameLost = (reason) => {
    setGameLost(true);
    playSound(require('../../sound effects/lost the level.mp3'));
  };

  const shuffleData = () => {
    // Keep choices in original order, only shuffle opportunity costs
    const shuffledCosts = [...gameData.map(item => item.opportunityCost)].sort(() => Math.random() - 0.5);
    setShuffledData(gameData.map((item, index) => ({
      ...item,
      opportunityCost: shuffledCosts[index]
    })));
    
    // Initialize fade animations for each item (both choices and costs)
    const animations = {};
    gameData.forEach((_, index) => {
      animations[`choice-${index}`] = new Animated.Value(1);
      animations[`cost-${index}`] = new Animated.Value(1);
    });
    setFadeAnimations(animations);
  };

  const choices = gameData.map(item => item.choice);
  const opportunityCosts = shuffledData.map(item => item.opportunityCost);

  const handleChoiceClick = (index) => {
    // Only allow one choice at a time
    if (selectedChoices.includes(index)) {
      setSelectedChoices([]);
    } else {
      setSelectedChoices([index]);
    }
  };

  const handleCostClick = (index) => {
    // Only allow one cost at a time
    if (selectedCosts.includes(index)) {
      setSelectedCosts([]);
    } else {
      setSelectedCosts([index]);
    }
  };

  // Check for matches when both arrays have selections
  React.useEffect(() => {
    if (selectedChoices.length > 0 && selectedCosts.length > 0 && !isProcessingMatch) {
      setIsProcessingMatch(true);
      const choiceIndex = selectedChoices[0];
      const costIndex = selectedCosts[0];
      
      // Check if this is a correct match
      if (gameData[choiceIndex] && gameData[choiceIndex].opportunityCost === opportunityCosts[costIndex]) {
         // Play correct sound
         playSound(require('../../sound effects/raight answer .mp3'));
        
        setMatches(prev => ({
          ...prev,
          [choiceIndex]: costIndex
        }));
        setScore(prev => prev + 1);
        
        // Animate only the exact matched items to fade out
        console.log(`Animating choice ${choiceIndex} and cost ${costIndex}`);
        
        if (fadeAnimations[`choice-${choiceIndex}`]) {
          Animated.sequence([
            Animated.timing(fadeAnimations[`choice-${choiceIndex}`], {
              toValue: 0.3,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnimations[`choice-${choiceIndex}`], {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            })
          ]).start();
        }
        
        if (fadeAnimations[`cost-${costIndex}`]) {
          Animated.sequence([
            Animated.timing(fadeAnimations[`cost-${costIndex}`], {
              toValue: 0.3,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnimations[`cost-${costIndex}`], {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            })
          ]).start();
        }
        
        // Clear selections after successful match
        setTimeout(() => {
          setSelectedChoices([]);
          setSelectedCosts([]);
          setIsProcessingMatch(false);
        }, 500);
        
        // Check if game is completed
        if (score + 1 === gameData.length) {
          setTimeout(() => {
            setGameCompleted(true);
            playSound(require('../../sound effects/won the level.mp3'));
          }, 800);
        }
      } else {
        // Play wrong sound and lose heart
        playSound(require('../../sound effects/wrong answer.mp3'));
        setHearts(prev => prev - 1);
        
        // Mark wrong matches for red styling
        setWrongMatches(prev => ({
          ...prev,
          [choiceIndex]: costIndex
        }));
        
        // Clear selections after incorrect match
        setTimeout(() => {
          setSelectedChoices([]);
          setSelectedCosts([]);
          setWrongMatches({});
          setIsProcessingMatch(false);
        }, 1000);
      }
    }
  }, [selectedChoices, selectedCosts, isProcessingMatch]);

  const resetGame = () => {
   router.push("/course");
  };

    return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.puzzleIcon}>🧩</Text>
            <Text style={styles.headerTitle}>TAP THE MATCHING PAIRS</Text>
          </View>
        </View>

        {/* Matching Game */}
        <View style={styles.gameGrid}>
          {/* Left Column - Choices */}
          <View style={styles.column}>
            <Text style={styles.choiceHeader}>CHOICE</Text>
            <View style={styles.choicesContainer}>
              {choices.map((choice, index) => {
                const isSelected = selectedChoices.includes(index);
                const isMatched = matches[index] !== undefined;
                
                return (
                  <Animated.View
                    key={`choice-${index}`}
                    style={{
                      opacity: fadeAnimations[`choice-${index}`] || 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => !isMatched && handleChoiceClick(index)}
                      style={[
                        styles.choiceButton,
                        isSelected && styles.choiceButtonSelected,
                        isMatched && styles.choiceButtonMatched,
                        wrongMatches[index] && styles.choiceButtonWrong
                      ]}
                      disabled={isMatched}
                    >
                      <Text style={[
                        isMatched ? styles.buttonTextMatched : styles.buttonText,
                        wrongMatches[index] && styles.buttonTextWrong
                      ]}>
                        {choice}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </View>

          {/* Right Column - Opportunity Costs */}
          <View style={styles.column}>
            <Text style={styles.costHeader}>OPPORTUNITY COST</Text>
            <View style={styles.costsContainer}>
              {opportunityCosts.map((cost, index) => {
                const isSelected = selectedCosts.includes(index);
                const isMatched = Object.values(matches).includes(index);
                
                return (
                  <Animated.View
                    key={`cost-${index}`}
                    style={{
                      opacity: fadeAnimations[`cost-${index}`] || 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => !isMatched && handleCostClick(index)}
                      style={[
                        styles.costButton,
                        isSelected && styles.costButtonSelected,
                        isMatched && styles.costButtonMatched,
                        Object.values(wrongMatches).includes(index) && styles.costButtonWrong
                      ]}
                      disabled={isMatched}
                    >
                      <Text style={[
                        isMatched ? styles.buttonTextMatched : styles.buttonText,
                        Object.values(wrongMatches).includes(index) && styles.buttonTextWrong
                      ]}>
                        {cost}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Bottom Status Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>⏱️ {timeLeft}s</Text>
          </View>
          <View style={styles.heartsContainer}>
            {[1, 2, 3].map((heart) => (
              <Text key={heart} style={[
                styles.heart,
                heart > hearts && styles.heartLost
              ]}>
                {heart <= hearts ? '❤️' : '🖤'}
              </Text>
            ))}
          </View>
        </View>

        {/* Game Over Message */}
        {gameLost && (
          <View style={styles.gameOverMessage}>
            <Text style={styles.gameOverText}>
              💀 Game Over!
            </Text>
            <Text style={styles.gameOverSubtext}>
              You ran out of time or hearts!
            </Text>
                         <TouchableOpacity style={styles.gameOverButton} onPress={() => router.push("/course")}>
              <Text style={styles.gameOverButtonText}>Back to Levels</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Win Message */}
        {gameCompleted && (
          <View style={styles.winMessage}>
            <Text style={styles.winText}>
              🎉 Congratulations!
            </Text>
            <Text style={styles.winSubtext}>
              You've completed Level 1!
            </Text>
            <Text style={styles.winSubtext2}>
              You've mastered the basics of opportunity cost!
            </Text>
            <TouchableOpacity style={styles.winButton} onPress={resetGame}>
              <Text style={styles.winButtonText}>Back to Courses</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    padding: 24,
  },
     headerRow: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 32,
     backgroundColor: '#ffffff',
     padding: 16,
     borderRadius: 12,
         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
     elevation: 3,
   },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  puzzleIcon: {
    fontSize: 24,
    color: '#6b7280',
  },
     headerTitle: {
     fontSize: 16,
     fontWeight: 'bold',
     color: '#374151',
     textAlign: 'center',
   },
     bottomBar: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     backgroundColor: '#ffffff',
     padding: 16,
     borderRadius: 12,
         boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
     elevation: 3,
     marginTop: 20,
   },
   timerContainer: {
     backgroundColor: '#fef3c7',
     paddingHorizontal: 12,
     paddingVertical: 8,
     borderRadius: 20,
     borderWidth: 2,
     borderColor: '#fbbf24',
     boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
     elevation: 2,
   },
   timerText: {
     fontSize: 14,
     fontWeight: 'bold',
     color: '#d97706',
   },
   heartsContainer: {
     flexDirection: 'row',
     gap: 6,
     backgroundColor: '#fef3c7',
     paddingHorizontal: 8,
     paddingVertical: 6,
     borderRadius: 16,
     borderWidth: 2,
     borderColor: '#fbbf24',
     boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
     elevation: 2,
   },
   heart: {
     fontSize: 22,
   },
   heartLost: {
     opacity: 0.3,
   },
     gameGrid: {
     flexDirection: 'row',
     gap: 16,
     flex: 1,
     marginTop: 20,
   },
   column: {
     flex: 1,
   },
   choicesContainer: {
     flex: 1,
     gap: 8,
   },
   costsContainer: {
     flex: 1,
     gap: 8,
   },
  choiceHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  costHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
     choiceButton: {
     backgroundColor: '#fef3c7',
     padding: 12,
     borderRadius: 12,
     borderWidth: 2,
     borderColor: '#fbbf24',
     alignItems: 'center',
     justifyContent: 'center',
     minHeight: 50,
   },
  choiceButtonSelected: {
    backgroundColor: '#fde68a',
    borderColor: '#f59e0b',
  },
  choiceButtonMatched: {
    backgroundColor: '#10b981',
    borderColor: '#059669',
  },
     costButton: {
     backgroundColor: '#fbbf24',
     padding: 12,
     borderRadius: 12,
     borderWidth: 2,
     borderColor: '#f59e0b',
     alignItems: 'center',
     justifyContent: 'center',
     minHeight: 50,
   },
  costButtonSelected: {
    backgroundColor: '#f59e0b',
    borderColor: '#d97706',
  },
     costButtonMatched: {
     backgroundColor: '#10b981',
     borderColor: '#059669',
   },
   choiceButtonWrong: {
     backgroundColor: '#fecaca',
     borderColor: '#ef4444',
   },
   costButtonWrong: {
     backgroundColor: '#fecaca',
     borderColor: '#ef4444',
   },
     buttonText: {
     fontSize: 12,
     fontWeight: '600',
     color: '#374151',
     textAlign: 'center',
   },
     buttonTextMatched: {
     fontSize: 12,
     fontWeight: '600',
     color: '#ffffff',
     textAlign: 'center',
   },
   buttonTextWrong: {
     fontSize: 12,
     fontWeight: '600',
     color: '#dc2626',
     textAlign: 'center',
   },
     gameOverMessage: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundColor: 'rgba(0, 0, 0, 0.8)',
     justifyContent: 'center',
     alignItems: 'center',
     zIndex: 1000,
   },
   gameOverText: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#ffffff',
     textAlign: 'center',
     marginBottom: 8,
   },
   gameOverSubtext: {
     fontSize: 16,
     color: '#ffffff',
     textAlign: 'center',
     marginBottom: 24,
   },
   gameOverButton: {
     backgroundColor: '#ef4444',
     paddingVertical: 12,
     paddingHorizontal: 24,
     borderRadius: 8,
   },
       gameOverButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    winMessage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    winText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 8,
    },
    winSubtext: {
      fontSize: 20,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 8,
    },
    winSubtext2: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 32,
    },
    winButton: {
      backgroundColor: '#10b981',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    winButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
});
