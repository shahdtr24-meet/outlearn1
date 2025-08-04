import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const FeedbackScreen = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "NO NAME",
      level: 2,
      stars: 4,
      comment:
        "I like the community idea and overall that's a great app. I would maybe just add a button for a profile edit but really that's a great app",
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.avatar}></View>
          <View style={styles.username}>
            <Text style={styles.usernameText}>user</Text>
            <Text style={styles.levelText}>Level</Text>
          </View>
        </View>
        <View style={styles.points}>
           <Text style={styles.pointsText}>0</Text>
        </View>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>RATE US!</Text>
        <View style={styles.starsRow}>
          {[...Array(5)].map((_, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleStarClick(idx)}
            >
              <Text style={[
                styles.star,
                { color: idx < selectedRating ? "#FDBD10" : "#ccc" }
              ]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Write us feedback..."
          value={feedbackText}
          onChangeText={setFeedbackText}
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback List */}
      <ScrollView style={styles.reviewList}>
        {reviews.map((review, idx) => (
          <View key={idx} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Text style={styles.level}>Level {review.level}</Text>
              <View style={styles.reviewStars}>
                <Text style={styles.starsText}>
                  {"★".repeat(review.stars)}
                  {"☆".repeat(5 - review.stars)}
                </Text>
              </View>
            </View>
            {review.comment && (
              <Text style={styles.reviewText}>{review.comment}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navIcon}>🔲</Text>
        <Text style={styles.navIcon}>✏️</Text>
        <Text style={styles.navIcon}>👥</Text>
        <Text style={styles.navIcon}>🏅</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 70,
  },
  header: {
    backgroundColor: "#FDBD10",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  username: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  usernameText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  levelText: {
    fontSize: 11,
    color: "#fff",
  },
  points: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  pointsText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  ratingContainer: {
    padding: 20,
    alignItems: "center",
  },
  ratingTitle: {
    color: "#FDBD10",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 24,
  },
  starsRow: {
    fontSize: 24,
    marginBottom: 15,
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 4,
    fontSize: 24,
  },
  input: {
    width: "90%",
    padding: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#6B3F27",
    fontSize: 16,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#FDBD10",
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewList: {
    padding: 20,
    flex: 1,
  },
  reviewItem: {
    borderWidth: 2,
    borderColor: "#6B3F27",
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fef6ed",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 5,
    fontWeight: "bold",
  },
  reviewName: {
    fontWeight: "bold",
  },
  level: {
    color: "#6B3F27",
    fontSize: 13,
  },
  reviewStars: {
    color: "#72AEE6",
    fontSize: 18,
  },
  starsText: {
    color: "#72AEE6",
    fontSize: 18,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FDBD10",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcon: {
    fontSize: 24,
  },
});

export default FeedbackScreen;
