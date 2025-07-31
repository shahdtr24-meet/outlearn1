import { useRouter } from "expo-router";
import React, { useState } from "react"; // Added missing import for React
export default function Index() {
  const router = useRouter();
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [selectedCosts, setSelectedCosts] = useState([]);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const gameData = [
    {
      choice: "Play video games",
      opportunityCost: "Better grades"
    },
    {
      choice: "Buy candy",
      opportunityCost: "Saving money"
    },
    {
      choice: "Take a nap",
      opportunityCost: "Time with friends"
    },
    {
      choice: "Watch TV",
      opportunityCost: "Reading a book"
    }
  ];

  const choices = gameData.map(item => item.choice);
  const opportunityCosts = gameData.map(item => item.opportunityCost);

  const handleChoiceClick = (index) => {
    if (selectedChoices.includes(index)) {
      setSelectedChoices(selectedChoices.filter(i => i !== index));
    } else {
      setSelectedChoices([...selectedChoices, index]);
    }
  };

  const handleCostClick = (index) => {
    if (selectedCosts.includes(index)) {
      setSelectedCosts(selectedCosts.filter(i => i !== index));
    } else {
      setSelectedCosts([...selectedCosts, index]);
    }
  };

  // Check for matches when both arrays have selections
  React.useEffect(() => {
    if (selectedChoices.length > 0 && selectedCosts.length > 0) {
      const choiceIndex = selectedChoices[selectedChoices.length - 1];
      const costIndex = selectedCosts[selectedCosts.length - 1];
      
      // Check if this is a correct match
      if (gameData[choiceIndex].opportunityCost === opportunityCosts[costIndex]) {
        setMatches(prev => ({
          ...prev,
          [choiceIndex]: costIndex
        }));
        setScore(prev => prev + 1);
        
        // Clear selections after successful match
        setTimeout(() => {
          setSelectedChoices([]);
          setSelectedCosts([]);
        }, 500);
        
        // Check if game is completed
        if (score + 1 === gameData.length) {
          setGameCompleted(true);
        }
      } else {
        // Clear selections after incorrect match
        setTimeout(() => {
          setSelectedChoices([]);
          setSelectedCosts([]);
        }, 1000);
      }
    }
  }, [selectedChoices, selectedCosts]);

  const resetGame = () => {
   router.push("/courses/levelorg");
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '448px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    mainContent: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    puzzleIcon: {
      width: '48px',
      height: '48px',
      fill: '#92400e'
    },
    headerTitle: {
      color: '#92400e',
      fontSize: '20px',
      fontWeight: 'bold',
      letterSpacing: '0.025em'
    },
    yellowDot: {
      width: '32px',
      height: '32px',
      backgroundColor: '#fbbf24',
      borderRadius: '50%'
    },
    instructionCenter: {
      textAlign: 'center'
    },
    instructionText: {
      color: '#3b82f6',
      fontSize: '20px',
      fontWeight: 'bold',
      letterSpacing: '0.025em',
      lineHeight: '1.25'
    },
    scoreDisplay: {
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#92400e',
      backgroundColor: '#fef3c7',
      padding: '12px',
      borderRadius: '8px',
      border: '2px solid #fbbf24'
    },
    gameGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    choiceHeader: {
      color: '#fbbf24',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '12px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    costHeader: {
      color: '#92400e',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '12px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    choiceButton: {
      width: '100%',
      padding: '16px 12px',
      borderRadius: '12px',
      border: '4px solid #fbbf24',
      backgroundColor: '#fef3c7',
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      outline: 'none'
    },
    choiceButtonSelected: {
      backgroundColor: '#fde68a',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'scale(1.05)'
    },
    choiceButtonMatched: {
      backgroundColor: '#10b981',
      borderColor: '#059669',
      color: 'white'
    },
    costButton: {
      width: '100%',
      padding: '16px 12px',
      borderRadius: '12px',
      border: '4px solid #92400e',
      backgroundColor: '#fbbf24',
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      outline: 'none'
    },
    costButtonSelected: {
      backgroundColor: '#f59e0b',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'scale(1.05)'
    },
    costButtonMatched: {
      backgroundColor: '#10b981',
      borderColor: '#059669',
      color: 'white'
    },
    buttonText: {
      color: '#92400e',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '1.25'
    },
    buttonTextMatched: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '1.25'
    },
    completionMessage: {
      textAlign: 'center',
      backgroundColor: '#10b981',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '20px'
    },
    resetButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '16px',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Puzzle Icon and Title */}
        <div style={styles.headerRow}>
          <div style={styles.headerLeft}>
            <svg style={styles.puzzleIcon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.38 0 2.5 1.12 2.5 2.5S4.88 16.8 3.5 16.8H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>
            </svg>
            <span style={styles.headerTitle}>TAP THE MATCHING PAIRS</span>
          </div>
          <div style={styles.yellowDot}></div>
        </div>

        {/* Instructions */}
        {/* <div style={styles.instructionCenter}>
          <h2 style={styles.instructionText}>
            MATCH THE CHOICE TO ITS OPPORTUNITY COST:
          </h2>
        </div> */}

        {/* Score Display */}
        {/* <div style={styles.scoreDisplay}>
          Matches Found: {score} / {gameData.length}
        </div> */}

        {/* Matching Game */}
        <div style={styles.gameGrid}>
          {/* Left Column - Choices */}
          <div style={styles.column}>
            <h3 style={styles.choiceHeader}>CHOICE</h3>
            {choices.map((choice, index) => {
              const isSelected = selectedChoices.includes(index);
              const isMatched = matches[index] !== undefined;
              
              return (
                <button
                  key={`choice-${index}`}
                  onClick={() => !isMatched && handleChoiceClick(index)}
                  style={{
                    ...styles.choiceButton,
                    ...(isSelected ? styles.choiceButtonSelected : {}),
                    ...(isMatched ? styles.choiceButtonMatched : {}),
                    cursor: isMatched ? 'default' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMatched && !isSelected) {
                      e.target.style.backgroundColor = '#fde68a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMatched && !isSelected) {
                      e.target.style.backgroundColor = '#fef3c7';
                    }
                  }}
                >
                  <span style={isMatched ? styles.buttonTextMatched : styles.buttonText}>
                    {choice}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column - Opportunity Costs */}
          <div style={styles.column}>
            <h3 style={styles.costHeader}>OPPORTUNITY COST</h3>
            {opportunityCosts.map((cost, index) => {
              const isSelected = selectedCosts.includes(index);
              const isMatched = Object.values(matches).includes(index);
              
              return (
                <button
                  key={`cost-${index}`}
                  onClick={() => !isMatched && handleCostClick(index)}
                  style={{
                    ...styles.costButton,
                    ...(isSelected ? styles.costButtonSelected : {}),
                    ...(isMatched ? styles.costButtonMatched : {}),
                    cursor: isMatched ? 'default' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMatched && !isSelected) {
                      e.target.style.backgroundColor = '#f59e0b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMatched && !isSelected) {
                      e.target.style.backgroundColor = '#fbbf24';
                    }
                  }}
                >
                  <span style={isMatched ? styles.buttonTextMatched : styles.buttonText}>
                    {cost}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Completion Message */}
        {gameCompleted && (
          <div style={styles.completionMessage}>
            🎉 Congratulations! You've completed the opportunity cost matching game!
            <br />
            <button style={styles.resetButton} onClick={resetGame}>
              finish level
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
