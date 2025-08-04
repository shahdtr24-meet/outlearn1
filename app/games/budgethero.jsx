import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

const MONTHLY_INCOME = 5000;

const SAMPLE_EXPENSES = [
  { id: 1, category: "rent", title: "Monthly Rent", amount: 1800, description: "Your apartment rent is due this month", urgency: "high" },
  { id: 2, category: "food", title: "Grocery Shopping", amount: 300, description: "Weekly groceries for healthy meals", urgency: "medium" },
  { id: 3, category: "entertainment", title: "Concert Tickets", amount: 150, description: "Your favorite band is playing next week", urgency: "low" },
  { id: 4, category: "emergency", title: "Car Repair", amount: 500, description: "Your car broke down and needs immediate repair", urgency: "high" },
  { id: 5, category: "food", title: "Restaurant Dinner", amount: 80, description: "Dinner at a nice restaurant with friends", urgency: "low" }
];

const getCategoryIcon = (category) => {
  switch (category) {
    case "rent": return <Icon name="home" size={24} />;
    case "food": return <Icon name="coffee" size={24} />;
    case "entertainment": return <Icon name="play" size={24} />;
    case "emergency": return <Icon name="alert-triangle" size={24} />;
    default: return <Icon name="dollar-sign" size={24} />;
  }
};

export default function BudgetHero() {
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(MONTHLY_INCOME);
  const [score, setScore] = useState(0);
  const [decisions, setDecisions] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const currentExpense = SAMPLE_EXPENSES[currentExpenseIndex];

  const handleDecision = (decision) => {
    let pointsEarned = 0;
    let newBudget = remainingBudget;

    if (decision === "accept") {
      if (remainingBudget >= currentExpense.amount) {
        newBudget -= currentExpense.amount;
        pointsEarned = currentExpense.urgency === "high" ? 30 : currentExpense.urgency === "medium" ? 20 : 10;
      } else {
        pointsEarned = -20;
      }
    } else if (decision === "postpone") {
      pointsEarned = currentExpense.urgency === "low" ? 15 : currentExpense.urgency === "medium" ? 5 : -10;
    } else if (decision === "reject") {
      pointsEarned = currentExpense.urgency === "low" ? 20 : currentExpense.urgency === "medium" ? 0 : -25;
    }

    setRemainingBudget(newBudget);
    setScore(score + pointsEarned);
    setDecisions([...decisions, decision]);

    if (currentExpenseIndex >= SAMPLE_EXPENSES.length - 1) {
      setGameOver(true);
    } else {
      setCurrentExpenseIndex(currentExpenseIndex + 1);
    }
  };

  const resetGame = () => {
    setCurrentExpenseIndex(0);
    setRemainingBudget(MONTHLY_INCOME);
    setScore(0);
    setDecisions([]);
    setGameOver(false);
  };

  const getScoreMessage = () => {
    if (score >= 100) return "Excellent! You're a budget master!";
    if (score >= 50) return "Good job! You're learning to manage your money.";
    if (score >= 0) return "Not bad, but there's room for improvement.";
    return "Keep practicing! Budget management takes time to learn.";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => window.history.back()} 
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={18} style={{ marginRight: 6 }} />
          <Text style={styles.backButtonText}>Back to Games</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Budget Hero</Text>
      </View>

      {gameOver ? (
        <View style={styles.card}>
          <Text style={styles.gameOverTitle}>Game Complete!</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.finalScore}>{score}</Text>
            <Text style={styles.scoreLabel}>Final Score</Text>
          </View>
          <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₪{remainingBudget}</Text>
              <Text style={styles.statLabel}>Money Left</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{decisions.length}</Text>
              <Text style={styles.statLabel}>Decisions Made</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={resetGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => window.history.back()}>
              <Text style={styles.buttonOutlineText}>Try Another Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₪{remainingBudget}</Text>
              <Text style={styles.statLabel}>Remaining Budget</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{currentExpenseIndex + 1}/{SAMPLE_EXPENSES.length}</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(currentExpenseIndex / SAMPLE_EXPENSES.length) * 100}%` }]} />
          </View>

          <View style={styles.card}>
            <View style={styles.expenseHeader}>
              <View style={styles.iconContainer}>
                {getCategoryIcon(currentExpense.category)}
              </View>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{currentExpense.title}</Text>
                <View style={[styles.badge, styles[`badge${currentExpense.urgency.charAt(0).toUpperCase() + currentExpense.urgency.slice(1)}`]]}>
                  <Text style={styles.badgeText}>{currentExpense.urgency.toUpperCase()} PRIORITY</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.expenseDescription}>{currentExpense.description}</Text>
            
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>EXPENSE AMOUNT</Text>
              <Text style={styles.amountValue}>₪{currentExpense.amount}</Text>
            </View>
            
            <View style={styles.decisionButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.buttonSuccess, remainingBudget < currentExpense.amount && styles.buttonDisabled]} 
                onPress={() => handleDecision("accept")} 
                disabled={remainingBudget < currentExpense.amount}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonWarning]} onPress={() => handleDecision("postpone")}>
                <Text style={styles.buttonWarningText}>Postpone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={() => handleDecision("reject")}>
                <Text style={styles.buttonDangerText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#6B3F27",
    fontWeight: "bold",
  },
  title: {
    color: "#6B3F27",
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fef6ed",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  gameOverTitle: {
    color: "#6B3F27",
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#FDBD10",
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FDBD10",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#6B3F27",
  },
  scoreMessage: {
    textAlign: "center",
    fontSize: 18,
    color: "#6B3F27",
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fef6ed",
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    color: "#FDBD10",
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    margin: 0,
    color: "#6B3F27",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 20,
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    margin: 8,
    borderRadius: 25,
    fontWeight: "bold",
    alignItems: "center",
  },
  buttonSuccess: {
    backgroundColor: "#FDBD10",
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "#6B3F27",
    backgroundColor: "transparent",
  },
  buttonWarning: {
    borderWidth: 2,
    borderColor: "#FDBD10",
    backgroundColor: "transparent",
  },
  buttonDanger: {
    borderWidth: 2,
    borderColor: "#E74C3C",
    backgroundColor: "transparent",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#6B3F27",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonWarningText: {
    color: "#6B3F27",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDangerText: {
    color: "#E74C3C",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  progress: {
    height: "100%",
    backgroundColor: "#FDBD10",
  },
  expenseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FDBD10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    margin: 0,
    color: "#6B3F27",
    fontSize: 18,
    fontWeight: "bold",
  },
  badge: {
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  badgeHigh: {
    backgroundColor: "#E74C3C",
  },
  badgeMedium: {
    backgroundColor: "#FDBD10",
  },
  badgeLow: {
    backgroundColor: "#2ECC71",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  expenseDescription: {
    color: "#666",
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  amountContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FDBD10",
    borderStyle: "dashed",
  },
  amountLabel: {
    fontSize: 14,
    color: "#6B3F27",
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FDBD10",
  },
  decisionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
