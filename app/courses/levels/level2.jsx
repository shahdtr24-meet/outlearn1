import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Level2Rome() {
  const [particles, setParticles] = useState([]);
  const [showLevel2, setShowLevel2] = useState(true);
  const [showRome, setShowRome] = useState(true);
  
  // Animation values - start visible
  const level2Animation = new Animated.Value(1);
  const romeAnimation = new Animated.Value(1);
  const separatorAnimation = new Animated.Value(1);
  const backButtonAnimation = new Animated.Value(1);
  const particleAnimation = new Animated.Value(0);

  useEffect(() => {
    // Create particle effects - exactly like the original HTML
    const particleCount = 50;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    setParticles(newParticles);

    // Original HTML timing sequence - but start visible
    setTimeout(() => {
      Animated.timing(level2Animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 500);

    setTimeout(() => {
      Animated.timing(romeAnimation, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 2500);

    // Animate separator with glow effect
    setTimeout(() => {
      Animated.timing(separatorAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    }, 1000);

    // Animate back button with bounce
    setTimeout(() => {
      Animated.timing(backButtonAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    // Animate particles
    Animated.loop(
      Animated.timing(particleAnimation, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const level2Style = {
    transform: [
      {
        translateY: level2Animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-200, 0],
        }),
      },
      {
        scale: level2Animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 1.2, 1],
        }),
      },
      {
        rotate: level2Animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['-10deg', '0deg'],
        }),
      },
    ],
    opacity: level2Animation,
  };

  const romeStyle = {
    transform: [
      {
        translateY: romeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
      {
        scale: romeAnimation.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [0.5, 1.1, 1],
        }),
      },
    ],
    opacity: romeAnimation,
  };

  const backButtonStyle = {
    transform: [
      {
        translateX: backButtonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-150, 0],
        }),
      },
      {
        scale: backButtonAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1.3, 1],
        }),
      },
      {
        rotate: backButtonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['-180deg', '0deg'],
        }),
      },
    ],
    opacity: backButtonAnimation,
  };

  return (
    <View style={styles.container}>
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              transform: [
                {
                  translateY: particleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -particle.speed * 100],
                  }),
                },
                {
                  scale: particleAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.2, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}

      {/* Go Back Arrow with Enhanced Design */}
      <Animated.View style={[styles.backButton, backButtonStyle]}>
        <TouchableOpacity
          onPress={() => router.push('/course')}
          style={styles.backButtonTouchable}
          activeOpacity={0.8}
        >
          <View style={styles.arrowContainer}>
            <View style={styles.arrowShaft} />
            <View style={styles.arrowHead} />
            <View style={styles.arrowGlow} />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content Container */}
      <View style={styles.mainContent}>
        {/* LEVEL 2 INCOMING with Enhanced Effects */}
        <Animated.View style={[styles.level2Text, level2Style]}>
          <Text style={styles.level2TextContent}>LEVEL 2</Text>
          <View style={styles.textGlow} />
        </Animated.View>

        <Animated.View style={[styles.incomingText, level2Style]}>
          <Text style={styles.incomingTextContent}>INCOMING</Text>
          <View style={styles.incomingGlow} />
        </Animated.View>

        {/* Enhanced Separator Line with Pulse Effect */}
        <Animated.View style={[styles.separator, { 
          width: separatorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 400],
          }),
          opacity: separatorAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.8, 1],
          }),
        }]}>
          <View style={styles.separatorGlow} />
          <View style={styles.separatorPulse} />
        </Animated.View>

        {/* ROME WASN'T BUILT IN A DAY with Typography Effects */}
        <Animated.View style={[styles.romeText, romeStyle]}>
          <Text style={styles.romeTextContent}>ROME WASN'T BUILT</Text>
          <View style={styles.romeTextShadow} />
        </Animated.View>

        <Animated.View style={[styles.inADayText, romeStyle]}>
          <Text style={styles.inADayTextContent}>IN A DAY</Text>
          <View style={styles.inADayGlow} />
        </Animated.View>
      </View>

      {/* Enhanced Floating Orbs with Animation */}
      <Animated.View style={[styles.orb1, {
        transform: [
          {
            translateY: particleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20],
            }),
          },
          {
            scale: particleAnimation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1.1, 1],
            }),
          },
        ],
      }]} />
      <Animated.View style={[styles.orb2, {
        transform: [
          {
            translateY: particleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 15],
            }),
          },
          {
            scale: particleAnimation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.9, 1],
            }),
          },
        ],
      }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 20,
  },
  backButtonTouchable: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
    elevation: 10,
  },
  arrowContainer: {
    position: 'relative',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowShaft: {
    width: 25,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    position: 'absolute',
    left: 5,
    boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#fff',
    position: 'absolute',
    left: 0,
    boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)',
  },
  arrowGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  mainContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  level2Text: {
    marginBottom: 25,
    position: 'relative',
  },
  level2TextContent: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    textShadow: '0px 0px 25px #e94560',
    letterSpacing: 8,
  },
  textGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(233,69,96,0.2)',
    borderRadius: 10,
  },
  incomingText: {
    marginBottom: 40,
    position: 'relative',
  },
  incomingTextContent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff6b6b',
    textShadow: '0px 0px 15px #ff6b6b',
    letterSpacing: 4,
  },
  incomingGlow: {
    position: 'absolute',
    top: -5,
    left: -10,
    right: -10,
    bottom: -5,
    backgroundColor: 'rgba(255,107,107,0.15)',
    borderRadius: 15,
  },
  separator: {
    height: 6,
    backgroundColor: '#e94560',
    marginBottom: 40,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
  },
  separatorGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    boxShadow: '0px 0px 10px #e94560',
  },
  separatorPulse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  romeText: {
    marginBottom: 15,
    position: 'relative',
  },
  romeTextContent: {
    fontSize: 28,
    color: '#fff',
    fontStyle: 'italic',
    textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
    letterSpacing: 2,
  },
  romeTextShadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: -2,
    bottom: -2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    zIndex: -1,
  },
  inADayText: {
    marginBottom: 30,
    position: 'relative',
  },
  inADayTextContent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadow: '0px 0px 15px #ffd700',
    letterSpacing: 3,
  },
  inADayGlow: {
    position: 'absolute',
    top: -8,
    left: -15,
    right: -15,
    bottom: -8,
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderRadius: 20,
  },
  orb1: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(233,69,96,0.9)',
    borderRadius: 40,
    top: '25%',
    right: '15%',
    boxShadow: '0px 0px 20px rgba(233, 69, 96, 0.8)',
    elevation: 15,
  },
  orb2: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,215,0,0.8)',
    borderRadius: 30,
    bottom: '35%',
    left: '20%',
    boxShadow: '0px 0px 15px rgba(255, 215, 0, 0.8)',
    elevation: 12,
  },
});