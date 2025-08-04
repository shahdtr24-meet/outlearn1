import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

// Sample investment options
const INVESTMENT_OPTIONS = [
  {
    id: 1,
    name: "Tech Growth Fund",
    risk: "high",
    potentialReturn: "high",
    description: "A high-risk, high-reward fund focused on emerging technology companies",
    minInvestment: 1000
  },
  {
    id: 2,
    name: "Balanced Portfolio",
    risk: "medium",
    potentialReturn: "medium",
    description: "A mix of stocks and bonds providing moderate growth with reduced volatility",
    minInvestment: 500
  },
  {
    id: 3,
    name: "Government Bonds",
    risk: "low",
    potentialReturn: "low",
    description: "Safe investments with guaranteed but modest returns",
    minInvestment: 200
  }
];

// Market events that can affect investments
const MARKET_EVENTS = [
  {
    id: 1,
    title: "Market Crash",
    description: "A sudden economic downturn has caused markets to plummet",
    effects: {
      high: -30,
      medium: -15,
      low: -5
    }
  },
  {
    id: 2,
    title: "Tech Boom",
    description: "New technological breakthroughs have caused tech stocks to soar",
    effects: {
      high: 40,
      medium: 15,
      low: 5
    }
  },
  {
    id: 3,
    title: "Steady Growth",
    description: "The economy is experiencing steady, predictable growth",
    effects: {
      high: 15,
      medium: 10,
      low: 5
    }
  }
];

// UI Components
const Card = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const Button = ({ onPress, children, primary, disabled }) => (
  <TouchableOpacity 
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      primary && styles.buttonPrimary,
      disabled && styles.buttonDisabled
    ]}
  >
    <Text style={[
      styles.buttonText,
      primary && styles.buttonPrimaryText,
      !primary && styles.buttonSecondaryText
    ]}>
      {children}
    </Text>
  </TouchableOpacity>
);

const Badge = ({ type }) => {
  const getColor = () => {
    switch(type) {
      case "high": return "#E74C3C";
      case "medium": return "#FDBD10";
      case "low": return "#2ECC71";
      default: return "#72AEE6";
    }
  };
  
  return (
    <View style={[styles.badge, { backgroundColor: getColor() }]}>
      <Text style={styles.badgeText}>{type.toUpperCase()}</Text>
    </View>
  );
};

// Main Game Component
export default function InvestmentChallenge() {
  const [portfolio, setPortfolio] = useState([]);
  const [cash, setCash] = useState(5000);
  const [currentYear, setCurrentYear] = useState(1);
  const [marketEvent, setMarketEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [finalValue, setFinalValue] = useState(0);

  const handleInvest = (option) => {
    if (cash >= option.minInvestment) {
      setCash(cash - option.minInvestment);
      setPortfolio([...portfolio, {
        id: Date.now(),
        option,
        initialValue: option.minInvestment,
        currentValue: option.minInvestment
      }]);
    }
  };

  const advanceYear = () => {
    // Select a random market event
    const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];
    setMarketEvent(event);
    
    // Update portfolio values based on the event
    const updatedPortfolio = portfolio.map(investment => {
      const changePercent = event.effects[investment.option.risk];
      const newValue = investment.currentValue * (1 + changePercent/100);
      
      return {
        ...investment,
        currentValue: Math.round(newValue)
      };
    });
    
    setPortfolio(updatedPortfolio);
    setCurrentYear(currentYear + 1);
    
    // End game after 5 years
    if (currentYear >= 5) {
      const totalValue = updatedPortfolio.reduce((sum, inv) => sum + inv.currentValue, 0) + cash;
      setFinalValue(totalValue);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setPortfolio([]);
    setCash(5000);
    setCurrentYear(1);
    setMarketEvent(null);
    setGameOver(false);
  };

  const getTotalPortfolioValue = () => {
    return portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
  };

  const getPerformanceMessage = () => {
    const totalValue = getTotalPortfolioValue() + cash;
    const initialValue = 5000;
    const percentGain = ((totalValue - initialValue) / initialValue) * 100;
    
    if (percentGain > 50) return "Exceptional! You're a master investor!";
    if (percentGain > 20) return "Great job! Your investments performed well.";
    if (percentGain > 0) return "Decent performance. You made a profit.";
    if (percentGain === 0) return "You broke even. No gains, no losses.";
    return "Your investments lost money. Better luck next time!";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => window.history.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} />
          <Text style={styles.backButtonText}>Back to Games</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Investment Challenge</Text>
      </View>

      {gameOver ? (
        <Card>
          <Text style={styles.gameOverTitle}>Game Complete!</Text>
          <View style={styles.finalScoreContainer}>
            <Text style={styles.statValue}>₪{finalValue}</Text>
            <Text style={styles.statLabel}>Final Portfolio Value</Text>
          </View>
          <Text style={styles.performanceMessage}>
            {getPerformanceMessage()}
          </Text>
          <View style={styles.buttonContainer}>
            <Button primary onPress={resetGame}>Play Again</Button>
            <Button onPress={() => window.history.back()}>Try Another Game</Button>
          </View>
        </Card>
      ) : (
        <>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₪{cash}</Text>
              <Text style={styles.statLabel}>Available Cash</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₪{getTotalPortfolioValue()}</Text>
              <Text style={styles.statLabel}>Portfolio Value</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{currentYear}/5</Text>
              <Text style={styles.statLabel}>Year</Text>
            </View>
          </View>

          {marketEvent && (
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>{marketEvent.title}</Text>
              <Text style={styles.eventDescription}>{marketEvent.description}</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Available Investments</Text>
          <View style={styles.investmentGrid}>
            {INVESTMENT_OPTIONS.map(option => (
              <View key={option.id} style={styles.investmentCard}>
                <Text style={styles.investmentTitle}>{option.name}</Text>
                <View style={styles.investmentMeta}>
                  <Badge type={option.risk} /> 
                  <Text style={styles.metaLabel}>Risk</Text>
                </View>
                <View style={styles.investmentMeta}>
                  <Badge type={option.potentialReturn} /> 
                  <Text style={styles.metaLabel}>Return</Text>
                </View>
                <Text style={styles.investmentDescription}>
                  {option.description}
                </Text>
                <View style={styles.investmentFooter}>
                  <Text style={styles.investmentAmount}>₪{option.minInvestment}</Text>
                  <Button 
                    primary 
                    onPress={() => handleInvest(option)}
                    disabled={cash < option.minInvestment}
                  >
                    Invest
                  </Button>
                </View>
              </View>
            ))}
          </View>

          {portfolio.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Your Portfolio</Text>
              {portfolio.map(investment => {
                const percentChange = ((investment.currentValue - investment.initialValue) / investment.initialValue) * 100;
                const isPositive = percentChange >= 0;
                
                return (
                  <View key={investment.id} style={styles.portfolioItem}>
                    <View>
                      <Text style={styles.portfolioName}>{investment.option.name}</Text>
                      <Badge type={investment.option.risk} />
                    </View>
                    <View>
                      <Text style={styles.portfolioValue}>₪{investment.currentValue}</Text>
                      <View style={styles.performanceIndicator}>
                        {isPositive ? (
                          <Icon name="trending-up" size={16} color="#2ECC71" />
                        ) : (
                          <Icon name="trending-down" size={16} color="#E74C3C" />
                        )}
                        <Text style={[styles.performanceText, isPositive ? styles.positive : styles.negative]}>
                          {isPositive ? "+" : ""}{percentChange.toFixed(1)}%
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}

          <View style={styles.advanceButtonContainer}>
            <Button primary onPress={advanceYear}>
              <View style={styles.advanceButtonContent}>
                <Icon name="bar-chart-2" size={16} />
                <Text style={styles.advanceButtonText}>Advance to Next Year</Text>
              </View>
            </Button>
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
    gap: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    margin: 0,
    color: "#6B3F27",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 2,
    borderColor: "#6B3F27",
    padding: 20,
    borderRadius: 12,
    margin: 10,
    backgroundColor: "#fef6ed",
  },
  gameOverTitle: {
    textAlign: "center",
    color: "#6B3F27",
    fontSize: 20,
    fontWeight: "bold",
  },
  finalScoreContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  performanceMessage: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
    color: "#6B3F27",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fef6ed",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FDBD10",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B3F27",
  },
  eventCard: {
    backgroundColor: "#fef6ed",
    borderLeftWidth: 4,
    borderLeftColor: "#FDBD10",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  eventTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#6B3F27",
  },
  eventDescription: {
    color: "#666",
  },
  sectionTitle: {
    marginVertical: 20,
    fontSize: 20,
    color: "#6B3F27",
    borderBottomWidth: 2,
    borderBottomColor: "#FDBD10",
    paddingBottom: 5,
    fontWeight: "bold",
  },
  investmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 20,
  },
  investmentCard: {
    backgroundColor: "#fef6ed",
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: "#6B3F27",
    minWidth: 250,
    flex: 1,
  },
  investmentTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
    color: "#6B3F27",
  },
  investmentMeta: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 14,
    color: "#666",
  },
  investmentDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  investmentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  investmentAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6B3F27",
  },
  portfolioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fef6ed",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  portfolioName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6B3F27",
    marginBottom: 5,
  },
  portfolioValue: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16,
    color: "#6B3F27",
  },
  performanceIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  performanceText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  positive: {
    color: "#2ECC71",
  },
  negative: {
    color: "#E74C3C",
  },
  advanceButtonContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  advanceButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  advanceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 25,
    fontWeight: "bold",
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#FDBD10",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonPrimaryText: {
    color: "white",
  },
  buttonSecondaryText: {
    color: "#6B3F27",
  },
  badge: {
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});