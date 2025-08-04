import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Level() {
  const { id } = useLocalSearchParams();
  const levelId = Array.isArray(id) ? id[0] : id || '4';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F3F0EC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Level {levelId}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.levelIconContainer}>
          <View style={styles.levelIcon}>
            <View style={styles.coinsIcon}>
              <View style={styles.coin1} />
              <View style={styles.coin2} />
              <View style={styles.coin3} />
            </View>
          </View>
        </View>

        <Text style={styles.levelTitle}>Level {levelId}</Text>
        <Text style={styles.levelSubtitle}>Investment Fundamentals</Text>

        {/* Explanation: Overview */}
        <View style={styles.explanationContainer}>
          <View style={styles.explanationIcon}>
            <Ionicons name="information-circle" size={24} color="#F5B125" />
          </View>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationTitle}>What you'll learn</Text>
            <Text style={styles.explanationText}>
              This level introduces you to investing. You'll learn about different investment options,
              how to assess risk and return, and how to start building a diversified portfolio.
            </Text>
          </View>
        </View>

        {/* Explanation: Investing */}
        <View style={styles.explanationContainer}>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationTitle}>Investing</Text>
            <Text style={styles.explanationText}>
              Investing is putting money into assets with the expectation of generating income or profit over time.
              Unlike saving, investing involves some level of risk but also offers the potential for higher returns.
              {"\n\n"}
              Common investment options include stocks, bonds, mutual funds, and real estate.
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            // This would link to level4.jsx in the levels folder when it's created
            alert('Level 4 content coming soon!');
            router.back();
          }}
        >
          <Text style={styles.startButtonText}>Start Level</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  header: {
    backgroundColor: '#F5B125',
    paddingHorizontal: 18,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F3F0EC',
  },
  content: {
    padding: 24,
  },
  levelIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  levelIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5B125',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinsIcon: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  coin1: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    top: 0,
    left: 8,
  },
  coin2: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    top: 8,
    left: 0,
  },
  coin3: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    top: 16,
    left: 16,
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  levelSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  explanationContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  explanationIcon: {
    marginBottom: 12,
  },
  explanationContent: {
    flex: 1,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#F5B125',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 32,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});