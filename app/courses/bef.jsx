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
  const levelId = Array.isArray(id) ? id[0] : id || '1';

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
        <Text style={styles.levelSubtitle}>Back to Basics</Text>

        {/* Explanation: Overview */}
        {/* <View style={styles.explanationContainer}>
          <View style={styles.explanationIcon}>
            <Ionicons name="information-circle" size={24} color="#F5B125" />
          </View>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationTitle}>What you'll learn</Text>
            <Text style={styles.explanationText}>
              This level is about banks and loans. You'll discover how banks work, different types of loans,
              interest rates, and how to make smart borrowing decisions for your financial future.
            </Text>
          </View>
        </View> */}

        {/* Explanation: Loans */}
        <View style={styles.explanationContainer}>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationTitle}>Loans</Text>
            <Text style={styles.explanationText}>
             You make choices every day what to eat, where to go, what to do. But every choice means giving something else up. That’s called opportunity cost — it’s the next best thing you didn’t choose. 
             
              {'\n\n'}
            Ready to learn how to make smarter decisions?
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            router.push(`/courses/levels/level1`);
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
    fontFamily: 'System',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 40,
    alignItems: 'center',
  },
  levelIconContainer: {
    marginBottom: 30,
  },
  levelIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5B125',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
      },
      default: {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 4,
      }
    }),
  },
  coinsIcon: {
    width: 50,
    height: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coin1: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    left: 5,
    top: 5,
    borderWidth: 2,
    borderColor: '#F3F0EC',
  },
  coin2: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    right: 8,
    top: 0,
    borderWidth: 2,
    borderColor: '#F3F0EC',
  },
  coin3: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3F0EC',
    position: 'absolute',
    left: 15,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#F3F0EC',
  },
  levelTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#7C4D33',
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 8,
  },
  levelSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#5DA8E1',
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 24,
  },
  explanationContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.12)',
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#F5B125',
  },
  explanationIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  explanationContent: {
    flex: 1,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C4D33',
    fontFamily: 'System',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7C4D33',
    fontFamily: 'System',
    lineHeight: 20,
    opacity: 0.8,
  },
  placeholderContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 40,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    width: '100%',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7C4D33',
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 12,
  },
  placeholderSubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7C4D33',
    textAlign: 'center',
    fontFamily: 'System',
    opacity: 0.7,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#F5B125',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F0EC',
    fontFamily: 'System',
  },
});