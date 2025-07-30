import { AlertTriangle, ArrowLeft, DollarSign, Gamepad2, Home, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

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
    case "rent": return <Home size={24} />;
    case "food": return <UtensilsCrossed size={24} />;
    case "entertainment": return <Gamepad2 size={24} />;
    case "emergency": return <AlertTriangle size={24} />;
    default: return <DollarSign size={24} />;
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
    <div className="app-container">
      <style>{`
        .app-container {
          font-family: sans-serif;
          padding: 20px;
          background-color: #ffffff;
          max-width: 800px;
          margin: 0 auto;
        }
        .btn {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin: 8px;
          border-radius: 25px;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        .btn-outline {
          border: 2px solid #6B3F27;
          background: transparent;
          color: #6B3F27;
        }
        .btn-success { 
          background: #FDBD10; 
          color: white; 
          border: none;
        }
        .btn-warning { 
          border: 2px solid #FDBD10; 
          color: #6B3F27; 
          background: transparent;
        }
        .btn-danger { 
          border: 2px solid #E74C3C; 
          color: #E74C3C; 
          background: transparent;
        }
        .card {
          background: #fef6ed;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(107, 63, 39, 0.1);
          padding: 20px;
          margin-bottom: 20px;
          border: 2px solid #6B3F27;
        }
        .grid { 
          display: flex; 
          gap: 20px; 
          margin-bottom: 20px; 
        }
        .grid > div { 
          flex: 1; 
          text-align: center; 
          background: #fef6ed;
          border-radius: 12px;
          padding: 15px;
          border: 2px solid #6B3F27;
        }
        .grid > div strong {
          font-size: 24px;
          color: #FDBD10;
          display: block;
          margin-bottom: 5px;
        }
        .grid > div p {
          margin: 0;
          color: #6B3F27;
          font-size: 14px;
        }
        .progress-bar {
          height: 10px;
          background: #ddd;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .progress {
          height: 100%;
          background: #FDBD10;
        }
        .badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          display: inline-block;
          margin-top: 4px;
          font-weight: bold;
          color: white;
        }
        .badge-high { background: #E74C3C; }
        .badge-medium { background: #FDBD10; }
        .badge-low { background: #2ECC71; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            fontSize: "16px",
            color: "#6B3F27",
            fontWeight: "bold"
          }}
        >
          <ArrowLeft size={18} style={{ marginRight: 6 }} />
          Back to Games
        </button>
        <h1 style={{ color: "#6B3F27", margin: 0 }}>Budget Hero</h1>
      </div>

      {gameOver ? (
        <div className="card">
          <h2 style={{ color: "#6B3F27", textAlign: "center", borderBottom: "2px solid #FDBD10", paddingBottom: 10 }}>Game Complete!</h2>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 36, fontWeight: "bold", color: "#FDBD10" }}>{score}</div>
            <div style={{ fontSize: 16, color: "#6B3F27" }}>Final Score</div>
          </div>
          <p style={{ textAlign: "center", fontSize: 18, color: "#6B3F27", marginBottom: 20 }}>{getScoreMessage()}</p>
          <div className="grid">
            <div>
              <strong>₪{remainingBudget}</strong>
              <p>Money Left</p>
            </div>
            <div>
              <strong>{decisions.length}</strong>
              <p>Decisions Made</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 15, marginTop: 20 }}>
            <button className="btn btn-success" onClick={resetGame}>Play Again</button>
            <button className="btn btn-outline" onClick={() => window.history.back()}>Try Another Game</button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid">
            <div className="card"><strong>₪{remainingBudget}</strong><p>Remaining Budget</p></div>
            <div className="card"><strong>{score}</strong><p>Score</p></div>
            <div className="card"><strong>{currentExpenseIndex + 1}/{SAMPLE_EXPENSES.length}</strong><p>Progress</p></div>
          </div>

          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentExpenseIndex / SAMPLE_EXPENSES.length) * 100}%` }} />
          </div>

          <div className="card">
            <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
              <div style={{ 
                width: 50, 
                height: 50, 
                borderRadius: 25, 
                backgroundColor: "#FDBD10", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginRight: 15
              }}>
                {getCategoryIcon(currentExpense.category)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: "#6B3F27" }}>{currentExpense.title}</h3>
                <span className={`badge badge-${currentExpense.urgency}`} style={{ marginTop: 5 }}>
                  {currentExpense.urgency.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
            
            <p style={{ color: "#666", fontSize: 16, marginBottom: 20, lineHeight: 1.5 }}>{currentExpense.description}</p>
            
            <div style={{ 
              backgroundColor: "#fff", 
              padding: 15, 
              borderRadius: 10, 
              marginBottom: 20, 
              textAlign: "center",
              border: "2px dashed #FDBD10"
            }}>
              <div style={{ fontSize: 14, color: "#6B3F27", marginBottom: 5 }}>EXPENSE AMOUNT</div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#FDBD10" }}>₪{currentExpense.amount}</div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <button 
                className="btn btn-success" 
                onClick={() => handleDecision("accept")} 
                disabled={remainingBudget < currentExpense.amount}
              >
                Accept
              </button>
              <button className="btn btn-warning" onClick={() => handleDecision("postpone")}>Postpone</button>
              <button className="btn btn-danger" onClick={() => handleDecision("reject")}>Reject</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
