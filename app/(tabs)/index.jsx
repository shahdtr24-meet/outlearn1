import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // ✅ Replaces lucide-react-native
import ProfileHeader from '../components/ProfileHeader'; // ✅ Adjust path as needed

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedCounts, setAnimatedCounts] = useState({
    users: 0,
    courses: 0,
    achievements: 0,
  });

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      content:
        'This app transformed my learning journey. The gamified approach kept me motivated!',
    },
    {
      name: 'Mike Chen',
      role: 'Product Manager',
      content:
        "Amazing community and top-notch content. I've completed 5 courses already!",
    },
    {
      name: 'Emma Davis',
      role: 'Designer',
      content:
        'The achievement system is brilliant. It makes learning addictive in the best way!',
    },
  ];

  useEffect(() => {
    const targets = { users: 10000, courses: 150, achievements: 500 };
    const steps = 60;
    const duration = 2000;
    const increment = duration / steps;

    const interval = setInterval(() => {
      setAnimatedCounts((prev) => ({
        users: Math.min(prev.users + targets.users / steps, targets.users),
        courses: Math.min(prev.courses + targets.courses / steps, targets.courses),
        achievements: Math.min(
          prev.achievements + targets.achievements / steps,
          targets.achievements
        ),
      }));
    }, increment);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Transform Your Learning
          <Text style={styles.heroHighlight}>{'\n'}Journey Today</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Join the OutLearn comunity, mastering new skills with our
          gamified, interactive learning platform.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => router.push('/course')} style={styles.primaryButton}>
            <Icon name="play" size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>Start Learning Now</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[ 
            { label: 'Active Learners', value: animatedCounts.users },
            { label: 'Expert Courses', value: animatedCounts.courses },
            { label: 'Achievements', value: animatedCounts.achievements },
          ].map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>
                {Math.floor(stat.value).toLocaleString()}+
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 70, // Add padding to account for the tab bar
  },
  hero: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    borderRadius: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  heroHighlight: {
    color: '#72AEE6',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: 400,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#72AEE6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  secondaryButton: {
    borderColor: '#6B3F27',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    margin: 6,
  },
  secondaryButtonText: {
    fontWeight: 'bold',
    color: '#2C1810',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '100%',
    flexWrap: 'wrap',
  },
  statCard: {
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#72AEE6',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
});

export default HomePage;
