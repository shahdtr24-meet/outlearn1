import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Business and Event Data
const BUSINESSES = [
  {
    id: "tutoring",
    name: "Online Tutoring",
    description: "Teach students online in your expertise area",
    startupCost: 200,
    timePerWeek: 10,
    avgIncome: 800,
    icon: "📚",
    skills: ["Communication", "Subject expertise", "Patience"]
  },
  {
    id: "crafts",
    name: "Handmade Crafts",
    description: "Sell handmade crafts on Etsy or local fairs",
    startupCost: 150,
    timePerWeek: 8,
    avgIncome: 500,
    icon: "🎨",
    skills: ["Creativity", "Marketing", "Time management"]
  }
];

const EVENTS = [
  {
    id: 1,
    title: "Customer Complaint",
    description: "A customer is unhappy with your service and threatens a bad review",
    options: [
      {
        id: "a",
        action: "Offer full refund and apology",
        cost: 100,
        time: 2,
        income: -50,
        reputation: 10
      },
      {
        id: "b",
        action: "Ignore and move on",
        cost: 0,
        time: 0,
        income: 0,
        reputation: -10
      }
    ],
    type: "challenge"
  },
  {
    id: 2,
    title: "Sudden Demand Spike",
    description: "Your product goes viral and demand triples!",
    options: [
      {
        id: "a",
        action: "Work overtime to meet demand",
        cost: 0,
        time: 10,
        income: 1000,
        reputation: 5
      },
      {
        id: "b",
        action: "Maintain pace, ignore hype",
        cost: 0,
        time: 0,
        income: 300,
        reputation: 0
      }
    ],
    type: "opportunity"
  }
];

// UI Components
const Card = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const Button = ({ onPress, children, secondary }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}>
    <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{children}</Text>
  </TouchableOpacity>
);

const Badge = ({ text }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

const Progress = ({ value }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${value}%` }]} />
  </View>
);

// Main Game Component
export default function SideHustleGame() {
  const [money, setMoney] = useState(1000);
  const [time, setTime] = useState(40);
  const [reputation, setReputation] = useState(50);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [event, setEvent] = useState(null);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    if (week > 1 && week % 2 === 0) {
      const newEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setEvent(newEvent);
    }
  }, [week]);

  const handleStartBusiness = (biz) => {
    if (money >= biz.startupCost && time >= biz.timePerWeek) {
      setSelectedBusiness(biz);
      setMoney(money - biz.startupCost);
      setTime(time - biz.timePerWeek);
    } else {
      Alert.alert("Not enough resources to start this business.");
    }
  };

  const handleNextWeek = () => {
    if (selectedBusiness) {
      setMoney(money + selectedBusiness.avgIncome);
    }
    setTime(40);
    setWeek(week + 1);
    setEvent(null);
  };

  const handleEventChoice = (option) => {
    setMoney(money - option.cost + option.income);
    setTime(time - option.time);
    setReputation(reputation + option.reputation);
    setEvent(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => window.history.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back to Games</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Side Hustle Tycoon</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${money}</Text>
            <Text style={styles.statLabel}>Money</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{time}</Text>
            <Text style={styles.statLabel}>Hours/Week</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Week {week}</Text>
            <Text style={styles.statLabel}>Current Week</Text>
          </View>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Reputation</Text>
          <Progress value={reputation} />
          <Text style={styles.progressText}>{reputation}%</Text>
        </Card>

        {!selectedBusiness && (
          <View>
            <Text style={styles.mainTitle}>Choose a Side Hustle</Text>
            {BUSINESSES.map(biz => (
              <Card key={biz.id}>
                <View style={styles.businessHeader}>
                  <Text style={styles.businessIcon}>{biz.icon}</Text>
                  <Text style={styles.businessName}>{biz.name}</Text>
                </View>
                <Text style={styles.businessDescription}>{biz.description}</Text>
                <View style={styles.businessStats}>
                  <View>
                    <Text style={styles.businessStat}><Text style={styles.bold}>Startup Cost:</Text> ${biz.startupCost}</Text>
                    <Text style={styles.businessStat}><Text style={styles.bold}>Weekly Time:</Text> {biz.timePerWeek} hrs</Text>
                  </View>
                  <View>
                    <Text style={styles.businessStat}><Text style={styles.bold}>Expected Income:</Text> ${biz.avgIncome}</Text>
                  </View>
                </View>
                <View style={styles.skillsContainer}>
                  {biz.skills.map(skill => <Badge key={skill} text={skill} />)}
                </View>
                <View style={styles.buttonContainer}>
                  <Button onPress={() => handleStartBusiness(biz)}>Start Business</Button>
                </View>
              </Card>
            ))}
          </View>
        )}

        {selectedBusiness && (
          <Card>
            <Text style={styles.mainTitle}>Current Business: {selectedBusiness.name}</Text>
            <View style={styles.currentBusinessContainer}>
              <Text style={styles.currentBusinessIcon}>{selectedBusiness.icon}</Text>
              <View>
                <Text style={styles.currentBusinessText}>
                  You're earning <Text style={styles.highlight}>${selectedBusiness.avgIncome}</Text> per week.
                </Text>
                <View style={styles.skillsContainer}>
                  {selectedBusiness.skills.map(skill => <Badge key={skill} text={skill} />)}
                </View>
              </View>
            </View>
          </Card>
        )}

        {event && (
          <Card>
            <Text style={styles.mainTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <View style={styles.eventOptions}>
              {event.options.map(opt => (
                <Button key={opt.id} onPress={() => handleEventChoice(opt)}>{opt.action}</Button>
              ))}
            </View>
          </Card>
        )}

        {selectedBusiness && (
          <View style={styles.nextWeekContainer}>
            <Button onPress={handleNextWeek}>Advance to Next Week</Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7ee",
  },
  content: {
    padding: 30,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#fef6ed",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  statItem: {
    alignItems: "center",
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
  card: {
    borderWidth: 2,
    borderColor: "#6B3F27",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#fef6ed",
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "#FDBD10",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#6B3F27",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "#6B3F27",
  },
  badge: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#72AEE6",
    borderRadius: 20,
    margin: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  progressBar: {
    backgroundColor: "#FDBD10",
    height: "100%",
    borderRadius: 5,
  },
  sectionTitle: {
    color: "#6B3F27",
    marginTop: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  progressText: {
    textAlign: "right",
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  mainTitle: {
    color: "#6B3F27",
    borderBottomWidth: 2,
    borderBottomColor: "#FDBD10",
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  businessHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  businessIcon: {
    fontSize: 24,
  },
  businessName: {
    color: "#6B3F27",
    fontSize: 18,
    fontWeight: "bold",
  },
  businessDescription: {
    color: "#666",
  },
  businessStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  businessStat: {
    margin: 5,
    color: "#6B3F27",
  },
  bold: {
    fontWeight: "bold",
  },
  skillsContainer: {
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    alignItems: "center",
  },
  currentBusinessContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  currentBusinessIcon: {
    fontSize: 40,
  },
  currentBusinessText: {
    color: "#6B3F27",
    fontSize: 16,
  },
  highlight: {
    color: "#FDBD10",
    fontWeight: "bold",
  },
  eventDescription: {
    color: "#666",
    fontSize: 16,
    marginBottom: 20,
  },
  eventOptions: {
    gap: 10,
  },
  nextWeekContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
