import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { getTotalQuestions, opportunityCostLessons } from '../data/opportunity-cost';

export default function OpportunityCostLevel() {
  const { id } = useLocalSearchParams();
  const levelId = Array.isArray(id) ? id[0] : id || '1';
  const level = opportunityCostLessons.levels?.find(l => l.level === parseInt(levelId));

  if (!level) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Level not found</Text>
      </SafeAreaView>
    );
  }

  const totalQuestions = getTotalQuestions(parseInt(levelId));

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
            <Ionicons name="trending-up" size={48} color="#F5B125" />
          </View>
        </View>

        <Text style={styles.levelTitle}>{level.title}</Text>
        <Text style={styles.levelSubtitle}>Opportunity Cost</Text>

        {/* Explanation */}
        <View style={styles.explanationContainer}>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationTitle}>What you'll learn</Text>
            <Text style={styles.explanationText}>
              {level.explanation}
            </Text>
          </View>
        </View>

        {/* Level Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="help-circle" size={20} color="#666" />
            <Text style={styles.infoText}>{totalQuestions} questions</Text>
          </View>
          {level.isInteractive && (
            <View style={styles.infoItem}>
              <Ionicons name="layers" size={20} color="#666" />
              <Text style={styles.infoText}>Interactive scenario</Text>
            </View>
          )}
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            router.push(`/courses/opportunity-cost-quiz?id=${levelId}`);
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
    alignItems: 'center',
  },
  levelIconContainer: {
    marginBottom: 24,
  },
  levelIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationContent: {
    flex: 1,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
}); 