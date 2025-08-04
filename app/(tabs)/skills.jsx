import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';

export default function SkillsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Skills Dashboard</Text>
          <Text style={styles.subtitle}>Track your learning progress</Text>
        </View>
        
        <View style={styles.skillsContainer}>
          <View style={styles.skillCard}>
            <Text style={styles.skillTitle}>Financial Literacy</Text>
            <Text style={styles.skillProgress}>Progress: 75%</Text>
          </View>
          
          <View style={styles.skillCard}>
            <Text style={styles.skillTitle}>Budgeting</Text>
            <Text style={styles.skillProgress}>Progress: 60%</Text>
          </View>
          
          <View style={styles.skillCard}>
            <Text style={styles.skillTitle}>Investment Basics</Text>
            <Text style={styles.skillProgress}>Progress: 45%</Text>
          </View>
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
  skillsContainer: {
    gap: 16,
  },
  skillCard: {
    backgroundColor: '#FFF5DB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FDBD10',
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 8,
  },
  skillProgress: {
    fontSize: 14,
    color: '#8B7355',
  },
}); 