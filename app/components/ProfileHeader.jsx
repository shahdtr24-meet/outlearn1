import { MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../colors';

export default function ProfileHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profilePhotoText}>M</Text>
          </View>
          <View>
            <Text style={styles.headerName}>Matar</Text>
            <Text style={styles.headerSubtitle}>Level 5 </Text>
          </View>
        </View>
        
        <View style={styles.pointsBadge}>
          <MaterialIcons name="local-fire-department" size={20} color="white" />
          <Text style={styles.pointsText}>24</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.primary,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profilePhotoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  pointsBadge: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
  },
  pointsText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 16,
  },
}); 