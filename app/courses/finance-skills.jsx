import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

export default function FinanceSkills() {
  const skills = [
    {
      id: 1,
      title: 'Opportunity Costs',
      description: 'Learn about the hidden costs of your choices',
      icon: 'trending-up',
      color: '#4CAF50',
      unlocked: true,
    },
    {
      id: 2,
      title: 'Risk Management',
      description: 'Learn how to identify, assess, and manage risks',
      icon: 'shield-checkmark',
      color: '#2196F3',
      unlocked: true,
    },
    {
      id: 3,
      title: 'Purchase Management',
      description: 'Learn how to plan, compare, and make smart buying choices',
      icon: 'cart',
      color: '#FF9800',
      unlocked: true,
    },
    {
      id: 4,
      title: 'CV Writing',
      description: 'Learn how to create a compelling CV that showcases your strengths',
      icon: 'document-text',
      color: '#9C27B0',
      unlocked: true,
    },
    {
      id: 5,
      title: 'Budgeting Basics',
      description: 'Master the art of creating and sticking to a budget',
      icon: 'calculator',
      color: '#E91E63',
      unlocked: false,
    },
    {
      id: 6,
      title: 'Investment Fundamentals',
      description: 'Understand how to grow your money wisely',
      icon: 'analytics',
      color: '#607D8B',
      unlocked: false,
    },
    {
      id: 7,
      title: 'Debt Management',
      description: 'Learn strategies to manage and eliminate debt',
      icon: 'card',
      color: '#795548',
      unlocked: false,
    },
  ];
const goback = ()=> {
  router.push('/courses/finance');
};
  const handleSkillPress = (skill) => {
    if (!skill.unlocked) {
      alert('This skill will be available soon!');
      return;
    }

    if (skill.id === 1) {
      // Navigate to the new opportunity cost levels
      router.push('/courses/opportunity-cost-levels');
    } else if (skill.id === 2) {
      // Navigate to risk management levels
      router.push('/courses/risk-management-levels');
    } else if (skill.id === 3) {
      // Navigate to purchase management levels
      router.push('/courses/purchase-management-levels');
    } else if (skill.id === 4) {
      // Navigate to CV writing levels
      router.push('/courses/cv-writing-levels');
    } else {
      alert(`${skill.title} coming soon!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={goback} style={styles.backButton}>
  <MaterialIcons name="arrow-back" size={24} color={colors.text} />
  <Text style={styles.buttonText}>Go Back</Text>
</TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Skill</Text>
          <Text style={styles.subtitle}>
            Select a financial skill to start learning
          </Text>
        </View>

        <View style={styles.skillsContainer}>
          {skills.map((skill) => (
            <TouchableOpacity
              key={skill.id}
              style={[
                styles.skillCard,
                skill.unlocked ? styles.unlockedCard : styles.lockedCard,
              ]}
              onPress={() => handleSkillPress(skill)}
              activeOpacity={skill.unlocked ? 0.7 : 1}
            >
              <View style={[styles.iconContainer, { backgroundColor: skill.color }]}>
                <Ionicons 
                  name={skill.icon} 
                  size={32} 
                  color="white" 
                />
              </View>
              
              <View style={styles.skillContent}>
                <Text style={[
                  styles.skillTitle,
                  !skill.unlocked && styles.lockedText
                ]}>
                  {skill.title}
                </Text>
                <Text style={[
                  styles.skillDescription,
                  !skill.unlocked && styles.lockedText
                ]}>
                  {skill.description}
                </Text>
              </View>

              <View style={styles.statusContainer}>
                {skill.unlocked ? (
                  <Ionicons name="chevron-forward" size={24} color={colors.primary} />
                ) : (
                  <Ionicons name="lock-closed" size={20} color={colors.textLight} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
},

buttonText: {
  fontSize: 16,
  marginLeft: 8,
  color: colors.primary,
  fontWeight: '500',
},
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  backButton: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.blue,
    textAlign: 'left',
    fontFamily: 'System',
    marginBottom: 20,
    marginLeft: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  skillsContainer: {
    paddingHorizontal: 10,
  },
  skillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  unlockedCard: {
    borderColor: colors.primary,
  },
  lockedCard: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  skillContent: {
    flex: 1,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  skillDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  lockedText: {
    color: colors.textLight,
  },
  statusContainer: {
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 40,
  },
}); 