import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, Modal, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTutorial } from '../../hooks/useTutorial';
import colors from '../colors';

const { width, height } = Dimensions.get('window');

// Helper function to get tab position based on tab name
const getTabPosition = (tabName) => {
  const tabPositions = {
    'dashboard': { x: width * 0.1, y: height * 0.93 },
    'skills': { x: width * 0.3, y: height * 0.93 },
    'community': { x: width * 0.5, y: height * 0.93 },
    'course': { x: width * 0.7, y: height * 0.93 },
    'games': { x: width * 0.9, y: height * 0.93 },
    'profile': { x: width * 0.85, y: height * 0.1 },
  };
  
  return tabPositions[tabName] || { x: width * 0.5, y: height * 0.5 };
};

// Particle component for magical effects
const Particle = ({ index, totalParticles, isActive }) => {
  const [animation] = React.useState(new Animated.Value(0));
  
  React.useEffect(() => {
    if (isActive) {
      const delay = (index / totalParticles) * 1000;
      
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          })
        ])
      ).start();
    }
  }, [isActive]);

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1.2, 0.5],
  });

  const angle = (index / totalParticles) * 2 * Math.PI;
  const radius = 40;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: x,
          top: y,
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <MaterialIcons name="star" size={6} color="#FFD700" />
    </Animated.View>
  );
};

// Enhanced spotlight effect component
const SpotlightEffect = ({ position, size, isActive }) => {
  const [spotlightAnim] = React.useState(new Animated.Value(0));
  const [pulseAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isActive) {
      // Main spotlight animation
      Animated.timing(spotlightAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      spotlightAnim.setValue(0);
      pulseAnim.setValue(0);
    }
  }, [isActive]);

  const spotlightScale = spotlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const spotlightOpacity = spotlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.3, 0.6],
  });

  if (!position || !size) return null;

  return (
    <View style={[
      styles.spotlightContainer,
      {
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
      }
    ]}>
      {/* Main spotlight */}
      <Animated.View
        style={[
          styles.spotlight,
          {
            transform: [{ scale: spotlightScale }],
            opacity: spotlightOpacity,
          },
        ]}
      />
      
      {/* Pulse effect */}
      <Animated.View
        style={[
          styles.spotlightPulse,
          {
            transform: [{ scale: pulseScale }],
            opacity: pulseOpacity,
          },
        ]}
      />

      {/* Particles around spotlight */}
      {Array.from({ length: 8 }).map((_, index) => (
        <Particle key={index} index={index} totalParticles={8} isActive={isActive} />
      ))}
    </View>
  );
};

const AppTutorial = () => {
  const { 
    showTutorial, 
    tutorialStep, 
    completeTutorial, 
    nextStep, 
  } = useTutorial();
  
  // Animations
  const [pointerAnimation] = React.useState(new Animated.Value(0));
  const [cardAnimation] = React.useState(new Animated.Value(0));
  const [overlayAnimation] = React.useState(new Animated.Value(0));

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left - next step
        handleNext();
      }
    },
  });
  
  // Tutorial steps configuration
  const tutorialSteps = [
    {
      title: '✨ Welcome to OutLearn!',
      description: 'Let us show you around the app. Swipe left or tap Next to continue.',
      target: 'welcome',
      position: { top: height * 0.35, left: width * 0.5 - 60 },
      highlightSize: { width: 120, height: 120 },
      cardStyle: 'welcome',
    },
    {
      title: '📊 Dashboard',
      description: 'This is your dashboard where you can see your progress and latest updates.',
      target: 'dashboard',
      position: { top: getTabPosition('dashboard').y - 50, left: getTabPosition('dashboard').x - 40 },
      icon: 'dashboard',
      tabHighlight: true,
      highlightSize: { width: 80, height: 80 },
      pointerDirection: 'down',
      cardStyle: 'dashboard',
    },
    {
      title: '🎓 Courses',
      description: 'Explore our courses and learn new skills at your own pace.',
      target: 'course',
      position: { top: getTabPosition('course').y - 50, left: getTabPosition('course').x - 40 },
      icon: 'school',
      navigate: '/(tabs)/course',
      tabHighlight: true,
      highlightSize: { width: 80, height: 80 },
      pointerDirection: 'down',
      cardStyle: 'course',
    },
    {
      title: '🎮 Games',
      description: 'Play educational games that make learning fun and interactive.',
      target: 'games',
      position: { top: getTabPosition('games').y - 50, left: getTabPosition('games').x - 40 },
      icon: 'sports-esports',
      navigate: '/(tabs)/lobby',
      tabHighlight: true,
      highlightSize: { width: 80, height: 80 },
      pointerDirection: 'down',
      cardStyle: 'games',
    },
    {
      title: '👤 Profile',
      description: 'Access your profile to view achievements and track your progress.',
      target: 'profile',
      position: { top: height * 0.08, left: width * 0.5 - 60 },
      icon: 'person',
      navigate: '/profile',
      highlightSize: { width: 120, height: 60 },
      pointerDirection: 'up',
      cardStyle: 'profile',
    },
    {
      title: '🚀 You\'re all set!',
      description: 'Now you know how to navigate OutLearn. Enjoy your learning journey!',
      target: 'finish',
      position: { top: height * 0.4, left: width * 0.5 - 60 },
      highlightSize: { width: 120, height: 120 },
      cardStyle: 'finish',
    },
  ];

  // Initialize animations
  React.useEffect(() => {
    if (showTutorial) {
      Animated.parallel([
        Animated.timing(overlayAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showTutorial]);

  // Pointer animation
  React.useEffect(() => {
    if (tutorialSteps[tutorialStep]?.pointerDirection) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pointerAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pointerAnimation, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        ])
      ).start();
    }
  }, [tutorialStep]);

  const handleNext = () => {
    const nextStepIndex = tutorialStep + 1;
    
    // Navigation
    if (tutorialSteps[tutorialStep].navigate) {
      router.push(tutorialSteps[tutorialStep].navigate);
    }
    
    if (nextStepIndex < tutorialSteps.length) {
      nextStep();
    } else {
      // Tutorial completed
      Animated.parallel([
        Animated.timing(cardAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        completeTutorial();
      });
    }
  };

  const handleSkip = () => {
    Animated.parallel([
      Animated.timing(cardAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      completeTutorial();
    });
  };

  if (!showTutorial) return null;

  const currentTutorialStep = tutorialSteps[tutorialStep];
  
  // Animation interpolations
  const pointerTranslateY = pointerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, currentTutorialStep?.pointerDirection === 'down' ? 12 : -12],
  });

  const cardTranslateY = cardAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const cardOpacity = cardAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal
      transparent
      visible={showTutorial}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: overlayAnimation }
        ]}
        {...panResponder.panHandlers}
      >
        {/* Spotlight effect */}
        <SpotlightEffect
          position={currentTutorialStep.position}
          size={currentTutorialStep.highlightSize}
          isActive={showTutorial}
        />

        {/* Animated pointer */}
        {currentTutorialStep.pointerDirection && (
          <Animated.View 
            style={[
              styles.pointer,
              {
                top: currentTutorialStep.position.top + 
                     (currentTutorialStep.pointerDirection === 'down' ? 
                      currentTutorialStep.highlightSize.height + 10 : 
                      -60),
                left: currentTutorialStep.position.left + 
                      (currentTutorialStep.highlightSize.width / 2) - 25,
                transform: [{ translateY: pointerTranslateY }]
              }
            ]}
          >
            <MaterialIcons 
              name={currentTutorialStep.pointerDirection === 'down' ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} 
              size={32} 
              color="#FFFFFF" 
            />
          </Animated.View>
        )}

        {/* Tutorial card */}
        <Animated.View 
          style={[
            styles.tutorialCard,
            styles[currentTutorialStep.cardStyle] || {},
            {
              transform: [{ translateY: cardTranslateY }],
              opacity: cardOpacity,
            }
          ]}
        >
          {/* Icon */}
          {currentTutorialStep.icon && (
            <View style={styles.iconContainer}>
              <MaterialIcons 
                name={currentTutorialStep.icon} 
                size={36} 
                color={colors.primary} 
              />
            </View>
          )}
          
          {/* Title */}
          <Text style={styles.title}>{currentTutorialStep.title}</Text>
          
          {/* Description */}
          <Text style={styles.description}>{currentTutorialStep.description}</Text>
          
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={handleSkip}
              activeOpacity={0.7}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {tutorialStep === tutorialSteps.length - 1 ? 'Get Started!' : 'Next'}
              </Text>
              <MaterialIcons 
                name={tutorialStep === tutorialSteps.length - 1 ? 'rocket-launch' : 'arrow-forward'} 
                size={20} 
                color="#FFFFFF" 
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>

          {/* Progress indicators */}
          <View style={styles.progressContainer}>
            {tutorialSteps.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.progressDot,
                  index === tutorialStep && styles.activeDot,
                  index < tutorialStep && styles.completedDot,
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  spotlightContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  spotlight: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
  spotlightPulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    position: 'absolute',
    backgroundColor: 'rgba(74, 144, 226, 0.9)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 20,
  },
  tutorialCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    marginHorizontal: 0,
  },
  welcome: {
    borderTopColor: '#667eea',
    borderTopWidth: 4,
  },
  dashboard: {
    borderTopColor: '#4A90E2',
    borderTopWidth: 4,
  },
  course: {
    borderTopColor: '#50C878',
    borderTopWidth: 4,
  },
  games: {
    borderTopColor: '#FF6B6B',
    borderTopWidth: 4,
  },
  profile: {
    borderTopColor: '#9B59B6',
    borderTopWidth: 4,
  },
  finish: {
    borderTopColor: '#FFD700',
    borderTopWidth: 4,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    color: '#5D6D7E',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
    paddingHorizontal: 8,
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: 'rgba(189, 195, 199, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(189, 195, 199, 0.3)',
  },
  skipButtonText: {
    color: '#95A5A6',
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(189, 195, 199, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  completedDot: {
    backgroundColor: '#27AE60',
  },
});

export default AppTutorial;