import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';

export default function CommunityScreen() {
  const communityFeatures = [
    {
      id: 1,
      title: 'Discussion Forums',
      description: 'Connect with other learners',
      icon: 'forum',
    },
    {
      id: 2,
      title: 'Study Groups',
      description: 'Join study sessions',
      icon: 'group',
    },
    {
      id: 3,
      title: 'Leaderboards',
      description: 'See top performers',
      icon: 'leaderboard',
    },
    {
      id: 4,
      title: 'Achievements',
      description: 'Share your progress',
      icon: 'emoji-events',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>Connect with fellow learners</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {communityFeatures.map((feature) => (
            <TouchableOpacity key={feature.id} style={styles.featureCard} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <MaterialIcons name={feature.icon} size={32} color="#FDBD10" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#8B7355" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B7355',
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5DB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FDBD10',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#8B7355',
  },
}); 