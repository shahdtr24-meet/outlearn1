import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function MatchingGame() {
  const router = useRouter();
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [selectedCosts, setSelectedCosts] = useState([]);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const gameData = [
    { choice: "Play video games", opportunityCost: "Better grades" },
    { choice: "Buy candy", opportunityCost: "Saving money" },
    { choice: "Take a nap", opportunityCost: "Time with friends" },
    { choice: "Watch TV", opportunityCost: "Reading a book" },
  ];

  const choices = gameData.map((item) => item.choice);
  const opportunityCosts = gameData.map((item) => item.opportunityCost);

  const handleChoiceClick = (index) => {
    if (selectedChoices.includes(index)) {
      setSelectedChoices(selectedChoices.filter((i) => i !== index));
    } else {
      setSelectedChoices([...selectedChoices, index]);
    }
  };

  const handleCostClick = (index) => {
    if (selectedCosts.includes(index)) {
      setSelectedCosts(selectedCosts.filter((i) => i !== index));
    } else {
      setSelectedCosts([...selectedCosts, index]);
    }
  };

  // Core matching logic
  useEffect(() => {
    if (selectedChoices.length && selectedCosts.length) {
      const choiceIndex = selectedChoices[selectedChoices.length - 1];
      const costIndex = selectedCosts[selectedCosts.length - 1];

      if (
        gameData[choiceIndex].opportunityCost ===
        opportunityCosts[costIndex]
      ) {
        setMatches((prev) => ({ ...prev, [choiceIndex]: costIndex }));
        setScore((prev) => prev + 1);

        setTimeout(() => {
          setSelectedChoices([]);
          setSelectedCosts([]);
        }, 500);

        if (score + 1 === gameData.length) {
          setGameCompleted(true);
        }
      } else {
        setTimeout(() => {
          setSelectedChoices([]);
          setSelectedCosts([]);
        }, 800);
      }
    }
  }, [selectedChoices, selectedCosts]);

  // Progress bar update
  useEffect(() => {
    const percentage = Math.round((score / gameData.length) * 100);
    setProgress(percentage);
  }, [score]);

  const finishLevel = () => {
    const current = parseInt(localStorage.getItem("courseProgress")) || 1;
    const next = 2;
    if (next > current) {
      localStorage.setItem("courseProgress", next.toString());
    }
    router.push("/courses");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🎯 Match the Opportunity Cost</h2>

      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        <span style={styles.progressText}>{progress}% complete</span>
      </div>

      <div style={styles.grid}>
        {/* Left column: Choices */}
        <div>
          <h3 style={styles.colHeader}>Choices</h3>
          {choices.map((text, i) => {
            const isMatched = matches[i] !== undefined;
            const isSelected = selectedChoices.includes(i);
            return (
              <button
                key={`choice-${i}`}
                onClick={() => !isMatched && handleChoiceClick(i)}
                style={{
                  ...styles.btn,
                  ...(isMatched ? styles.matched : {}),
                  ...(isSelected ? styles.selected : {}),
                }}
              >
                {text}
              </button>
            );
          })}
        </div>

        {/* Right column: Opportunity Costs */}
        <div>
          <h3 style={styles.colHeader}>Opportunity Cost</h3>
          {opportunityCosts.map((text, i) => {
            const isMatched = Object.values(matches).includes(i);
            const isSelected = selectedCosts.includes(i);
            return (
              <button
                key={`cost-${i}`}
                onClick={() => !isMatched && handleCostClick(i)}
                style={{
                  ...styles.btn,
                  ...(isMatched ? styles.matched : {}),
                  ...(isSelected ? styles.selected : {}),
                }}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      {gameCompleted && (
        <div style={{ ...styles.completeBox, animation: "fadeIn 1s" }}>
          <p>✅ You matched all correctly!</p>
          <button onClick={finishLevel} style={styles.resetBtn}>
            Finish Level
          </button>
        </div>
      )}

      {/* Simple animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: "auto",
    padding: 24,
    fontFamily: "sans-serif",
    color: "#333",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 12,
    color: "#92400e",
  },
  grid: {
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
  },
  colHeader: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#f59e0b",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: 10,
    borderRadius: 8,
    border: "2px solid #ccc",
    backgroundColor: "#fef3c7",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  selected: {
    backgroundColor: "#fde68a",
    transform: "scale(1.03)",
  },
  matched: {
    backgroundColor: "#10b981",
    color: "white",
    borderColor: "#059669",
  },
  completeBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#10b981",
    color: "white",
    textAlign: "center",
    borderRadius: 12,
  },
  resetBtn: {
    marginTop: 10,
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fbbf24",
    transition: "width 0.3s ease",
  },
  progressText: {
    position: "absolute",
    top: "-20px",
    right: 0,
    fontSize: 12,
    color: "#666",
  },
};
