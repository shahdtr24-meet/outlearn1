import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../colors';
import ProfileHeader from '../components/ProfileHeader';

export default function GamesScreen() {
  const games = [
    {
      id: "1",
      title: "Budget Hero",
      description: "Make smart financial decisions and manage your budget wisely",
      icon: "account-balance-wallet",
      route: "/games/budgethero"
    },
    {
      id: "2",
      title: "Side Hustle Simulator",
      description: "Build your side business and overcome challenges",
      icon: "business-center",
      route: "/games/sudehustles"
    },
    {
      id: "3",
      title: "Investment Challenge",
      description: "Learn investment strategies through interactive scenarios",
      icon: "trending-up",
      route: "/games/investment"
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileHeader />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Financial Mini-Games</Text>
        <Text style={styles.headerSubtitle}>Learn finance concepts through fun interactive games</Text>
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {games.map((game) => (
          <TouchableOpacity 
            key={game.id} 
            style={styles.gameCard}
            onPress={() => router.push(game.route)}
          >
            <View style={styles.gameIconContainer}>
              <MaterialIcons name={game.icon} size={32} color={colors.primary} />
            </View>
            <View style={styles.gameContent}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  contentContainer: {
    padding: 16,
  },
  gameCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
  },
  gameIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  gameContent: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
});