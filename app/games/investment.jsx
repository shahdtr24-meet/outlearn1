import { ArrowLeft, BarChart2, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

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
  <div style={{ 
    border: "2px solid #6B3F27", 
    padding: 20, 
    borderRadius: 12, 
    margin: 10, 
    background: "#fef6ed",
    boxShadow: "0 2px 8px rgba(107, 63, 39, 0.1)"
  }}>{children}</div>
);

const Button = ({ onClick, children, primary }) => (
  <button 
    onClick={onClick} 
    style={{ 
      padding: "10px 20px", 
      margin: "10px 5px", 
      borderRadius: 25, 
      border: primary ? "none" : "2px solid #6B3F27", 
      background: primary ? "#FDBD10" : "transparent", 
      color: primary ? "white" : "#6B3F27", 
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.2s ease"
    }}
  >
    {children}
  </button>
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
    <span style={{ 
      display: "inline-block", 
      padding: "5px 12px", 
      background: getColor(), 
      color: "white",
      borderRadius: "20px", 
      margin: "2px", 
      fontSize: "12px",
      fontWeight: "bold"
    }}>
      {type.toUpperCase()}
    </span>
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
    <div className="app-container">
      <style>{`
        .app-container {
  font-family: sans-serif;
  padding: 20px;
  background-color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .stats-container {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }
        .stat-card {
          flex: 1;
          background: #fef6ed;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(107, 63, 39, 0.1);
          text-align: center;
          border: 2px solid #6B3F27;
        }
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #FDBD10;
        }
        .stat-label {
          font-size: 14px;
          color: #6B3F27;
        }
        .investment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        .investment-card {
          background: #fef6ed;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(107, 63, 39, 0.1);
          border: 2px solid #6B3F27;
        }
        .investment-title {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 18px;
          color: #6B3F27;
        }
        .investment-meta {
          display: flex;
          gap: 5px;
          margin-bottom: 10px;
        }
        .portfolio-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #fef6ed;
          border-radius: 12px;
          margin-bottom: 10px;
          box-shadow: 0 2px 8px rgba(107, 63, 39, 0.1);
          border: 2px solid #6B3F27;
        }
        .event-card {
          background: #fef6ed;
          border-left: 4px solid #FDBD10;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 8px;
          border: 2px solid #6B3F27;
        }
        .event-title {
          font-weight: bold;
          margin-bottom: 5px;
          color: #6B3F27;
        }
        .section-title {
          margin: 20px 0 10px;
          font-size: 20px;
          color: #6B3F27;
          border-bottom: 2px solid #FDBD10;
          padding-bottom: 5px;
        }
        .performance-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .positive {
          color: #2ECC71;
          font-weight: bold;
        }
        .negative {
          color: #E74C3C;
          font-weight: bold;
        }
      `}</style>

      <div className="header">
        <button onClick={() => window.history.back()} style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "5px", 
          background: "none", 
          border: "none", 
          cursor: "pointer", 
          fontSize: "16px",
          color: "#333"
        }}>
          <ArrowLeft size={18} />
          Back to Games
        </button>
        <h1 style={{ margin: 0, color: "#6B3F27" }}>Investment Challenge</h1>
      </div>

      {gameOver ? (
        <Card>
          <h2 style={{ textAlign: "center", color: "#6B3F27" }}>Game Complete!</h2>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div className="stat-value">₪{finalValue}</div>
            <div className="stat-label">Final Portfolio Value</div>
          </div>
          <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "30px" }}>
            {getPerformanceMessage()}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button primary onClick={resetGame}>Play Again</Button>
            <Button onClick={() => window.history.back()}>Try Another Game</Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">₪{cash}</div>
              <div className="stat-label">Available Cash</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₪{getTotalPortfolioValue()}</div>
              <div className="stat-label">Portfolio Value</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentYear}/5</div>
              <div className="stat-label">Year</div>
            </div>
          </div>

          {marketEvent && (
            <div className="event-card">
              <div className="event-title">{marketEvent.title}</div>
              <p>{marketEvent.description}</p>
            </div>
          )}

          <h2 className="section-title">Available Investments</h2>
          <div className="investment-grid">
            {INVESTMENT_OPTIONS.map(option => (
              <div key={option.id} className="investment-card">
                <div className="investment-title">{option.name}</div>
                <div className="investment-meta">
                  <Badge type={option.risk} /> 
                  <span style={{ fontSize: "14px", color: "#666" }}>Risk</span>
                </div>
                <div className="investment-meta">
                  <Badge type={option.potentialReturn} /> 
                  <span style={{ fontSize: "14px", color: "#666" }}>Return</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  {option.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: "bold" }}>₪{option.minInvestment}</div>
                  <Button 
                    primary 
                    onClick={() => handleInvest(option)}
                    disabled={cash < option.minInvestment}
                  >
                    Invest
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {portfolio.length > 0 && (
            <>
              <h2 className="section-title">Your Portfolio</h2>
              {portfolio.map(investment => {
                const percentChange = ((investment.currentValue - investment.initialValue) / investment.initialValue) * 100;
                const isPositive = percentChange >= 0;
                
                return (
                  <div key={investment.id} className="portfolio-item">
                    <div>
                      <div style={{ fontWeight: "bold" }}>{investment.option.name}</div>
                      <Badge type={investment.option.risk} />
                    </div>
                    <div>
                      <div style={{ textAlign: "right", fontWeight: "bold" }}>₪{investment.currentValue}</div>
                      <div className="performance-indicator">
                        {isPositive ? (
                          <TrendingUp size={16} className="positive" />
                        ) : (
                          <TrendingDown size={16} className="negative" />
                        )}
                        <span className={isPositive ? "positive" : "negative"}>
                          {isPositive ? "+" : ""}{percentChange.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <Button primary onClick={advanceYear}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <BarChart2 size={16} />
                Advance to Next Year
              </div>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}