import { useEffect, useState } from "react";

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
  <div style={{
    border: "2px solid #6B3F27",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    background: "#fef6ed"
  }}>{children}</div>
);

const Button = ({ onClick, children, secondary }) => (
  <button onClick={onClick} style={{
    padding: "10px 20px",
    margin: "10px 5px",
    borderRadius: 25,
    border: secondary ? "2px solid #6B3F27" : "none",
    background: secondary ? "transparent" : "#FDBD10",
    color: secondary ? "#6B3F27" : "white",
    cursor: "pointer",
    fontWeight: "bold"
  }}>{children}</button>
);

const Badge = ({ text }) => (
  <span style={{
    display: "inline-block",
    padding: "5px 10px",
    background: "#72AEE6",
    color: "white",
    borderRadius: "20px",
    margin: "2px",
    fontSize: "12px",
    fontWeight: "bold"
  }}>{text}</span>
);

const Progress = ({ value }) => (
  <div style={{ height: 10, background: "#ddd", borderRadius: 5 }}>
    <div style={{
      width: `${value}%`,
      background: "#FDBD10",
      height: "100%",
      borderRadius: 5
    }} />
  </div>
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
      alert("Not enough resources to start this business.");
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
    <div style={{
      height: "100vh",
      overflowY: "auto",
      padding: 30,
      fontFamily: "sans-serif",
      background: "#fff7ee"
    }}>
      <div style={{ maxWidth: 800, margin: "auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>
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
            ← Back to Games
          </button>
          <h1 style={{ color: "#6B3F27", margin: 0 }}>Side Hustle Tycoon</h1>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          background: "#fef6ed",
          padding: 15,
          borderRadius: 10,
          border: "2px solid #6B3F27"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#FDBD10" }}>${money}</div>
            <div style={{ fontSize: 14, color: "#6B3F27" }}>Money</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#FDBD10" }}>{time}</div>
            <div style={{ fontSize: 14, color: "#6B3F27" }}>Hours/Week</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#FDBD10" }}>Week {week}</div>
            <div style={{ fontSize: 14, color: "#6B3F27" }}>Current Week</div>
          </div>
        </div>

        <Card>
          <h3 style={{ color: "#6B3F27", marginTop: 0 }}>Reputation</h3>
          <Progress value={reputation} />
          <div style={{ textAlign: "right", fontSize: 14, color: "#999", marginTop: 5 }}>{reputation}%</div>
        </Card>

        {!selectedBusiness && (
          <div>
            <h2 style={{ color: "#6B3F27", borderBottom: "2px solid #FDBD10", paddingBottom: 10 }}>Choose a Side Hustle</h2>
            {BUSINESSES.map(biz => (
              <Card key={biz.id}>
                <h3 style={{ color: "#6B3F27", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{biz.icon}</span> {biz.name}
                </h3>
                <p style={{ color: "#666" }}>{biz.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
                  <div>
                    <p style={{ margin: 5, color: "#6B3F27" }}><strong>Startup Cost:</strong> ${biz.startupCost}</p>
                    <p style={{ margin: 5, color: "#6B3F27" }}><strong>Weekly Time:</strong> {biz.timePerWeek} hrs</p>
                  </div>
                  <div>
                    <p style={{ margin: 5, color: "#6B3F27" }}><strong>Expected Income:</strong> ${biz.avgIncome}</p>
                  </div>
                </div>
                <div style={{ marginBottom: 15 }}>{biz.skills.map(skill => <Badge key={skill} text={skill} />)}</div>
                <div style={{ textAlign: "center" }}>
                  <Button onClick={() => handleStartBusiness(biz)}>Start Business</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedBusiness && (
          <Card>
            <h2 style={{ color: "#6B3F27", borderBottom: "2px solid #FDBD10", paddingBottom: 10 }}>Current Business: {selectedBusiness.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <div style={{ fontSize: 40 }}>{selectedBusiness.icon}</div>
              <div>
                <p style={{ color: "#6B3F27", fontSize: 16 }}>
                  You're earning <span style={{ color: "#FDBD10", fontWeight: "bold" }}>${selectedBusiness.avgIncome}</span> per week.
                </p>
                <div>{selectedBusiness.skills.map(skill => <Badge key={skill} text={skill} />)}</div>
              </div>
            </div>
          </Card>
        )}

        {event && (
          <Card>
            <h2 style={{ color: "#6B3F27", borderBottom: "2px solid #FDBD10", paddingBottom: 10 }}>{event.title}</h2>
            <p style={{ color: "#666", fontSize: 16, marginBottom: 20 }}>{event.description}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {event.options.map(opt => (
                <Button key={opt.id} onClick={() => handleEventChoice(opt)}>{opt.action}</Button>
              ))}
            </div>
          </Card>
        )}

        {selectedBusiness && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button onClick={handleNextWeek}>Advance to Next Week</Button>
          </div>
        )}
      </div>
    </div>
  );
}
