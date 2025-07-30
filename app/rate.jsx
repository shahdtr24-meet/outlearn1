import { useState } from "react";

const FeedbackScreen = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "NO NAME",
      level: 2,
      stars: 4,
      comment:
        "I like the community idea and overall that’s a great app. I would maybe just add a button for a profile edit but really that’s a great app",
    },
    {
      name: "BLAHBLAH123",
      level: 3,
      stars: 5,
      comment:
        "Great app! Changed my life and I truly enjoy it a lot!! Spend most of my time on it while maintaining a good time screen",
    },
    {
      name: "USERNAME",
      level: 1,
      stars: 3,
      comment: "",
    },
  ]);

  const handleStarClick = (index) => {
    setSelectedRating(index + 1);
  };

  const handleSubmit = () => {
    if (feedbackText.trim() === "" || selectedRating === 0) return;
    const newReview = {
      name: "YOU",
      level: 1,
      stars: selectedRating,
      comment: feedbackText,
    };
    setReviews([newReview, ...reviews]);
    setSelectedRating(0);
    setFeedbackText("");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.profile}>
          <div style={styles.avatar}></div>
          <div style={styles.username}>
            <strong>user</strong>
            <div style={{ fontSize: "0.7rem", color: "#fff" }}>Level</div>
          </div>
        </div>
        <div style={styles.points}>
           <span>0</span>
        </div>
      </div>

      {/* Rating Section */}
      <div style={styles.ratingContainer}>
        <h2 style={styles.ratingTitle}>RATE US!</h2>
        <div style={styles.starsRow}>
          {[...Array(5)].map((_, idx) => (
            <span
              key={idx}
              style={{
                ...styles.star,
                color: idx < selectedRating ? "#FDBD10" : "#ccc",
                cursor: "pointer",
              }}
              onClick={() => handleStarClick(idx)}
            >
              ★
            </span>
          ))}
        </div>
        <input
          placeholder="Write us feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.submitBtn}>
          Submit
        </button>
      </div>

      {/* Feedback List */}
      <div style={styles.reviewList}>
        {reviews.map((review, idx) => (
          <div key={idx} style={styles.reviewItem}>
            <div style={styles.reviewHeader}>
              <strong>{review.name}</strong>{" "}
              <span style={styles.level}>Level {review.level}</span>
              <div style={styles.reviewStars}>
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </div>
            </div>
            {review.comment && (
              <p style={styles.reviewText}>{review.comment}</p>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
      <div style={styles.navbar}>
        <span style={styles.navIcon}>🔲</span>
        <span style={styles.navIcon}>✏️</span>
        <span style={styles.navIcon}>👥</span>
        <span style={styles.navIcon}>🏅</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "70px",
  },
  header: {
    backgroundColor: "#FDBD10",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
  username: {
    color: "#fff",
    fontSize: "0.9rem",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
    fontWeight: "bold",
  },
  points: {
    color: "#fff",
    fontSize: "1.2rem",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
    fontWeight: "bold",
  },
  ratingContainer: {
    padding: "20px",
    textAlign: "center",
  },
  ratingTitle: {
    color: "#FDBD10",
    marginBottom: "10px",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  starsRow: {
    fontSize: "1.5rem",
    marginBottom: "15px",
  },
  star: {
    margin: "0 4px",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
  input: {
    width: "90%",
    padding: "10px",
    borderRadius: "25px",
    border: "2px solid #6B3F27",
    fontSize: "1rem",
    marginBottom: "10px",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
  submitBtn: {
    backgroundColor: "#FDBD10",
    border: "none",
    borderRadius: "25px",
    padding: "10px 20px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
  reviewList: {
    padding: "20px",
    flexGrow: 1,
    overflowY: "auto",
  },
  reviewItem: {
    border: "2px solid #6B3F27",
    borderRadius: "30px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#fef6ed",
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "5px",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
    fontWeight: "bold",
  },
  level: {
    color: "#6B3F27",
    fontSize: "0.8rem",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
  reviewStars: {
    color: "#72AEE6",
    fontSize: "1.1rem",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
  reviewText: {
    fontSize: "0.9rem",
    color: "#333",
    marginTop: "5px",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#FDBD10",
    padding: "10px 0",
    display: "flex",
    justifyContent: "space-around",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  navIcon: {
    fontSize: "1.5rem",
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', 'Nunito', sans-serif",
  },
};

export default FeedbackScreen;
