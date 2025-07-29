import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/userService';
import colors from '../colors';

export default function ProfileHeader() {
  const { user, userProfile, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const displayName = userProfile?.displayName || user?.email || 'User';
  const points = userProfile?.points || 0;
  const level = UserService.calculateLevel(points);

  const handleSave = async () => {
    if (user && inputValue.trim()) {
      await updateProfile(user, { displayName: inputValue });
      await updateDoc(doc(db, 'users', user.uid), { displayName: inputValue });
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/welcome'); // This will take you to the root (index) page
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator color="#fff" style={{ margin: 20 }} />;
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profilePhotoText}>{displayName ? displayName[0].toUpperCase() : 'U'}</Text>
          </View>
          <View>
            {editing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={styles.input}
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Enter name"
                  placeholderTextColor="#fff"
                />
                <TouchableOpacity onPress={handleSave} style={{ marginLeft: 8 }}>
                  <MaterialIcons name="check" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditing(false)} style={{ marginLeft: 4 }}>
                  <MaterialIcons name="close" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => { setInputValue(displayName); setEditing(true); }}>
                <Text style={styles.headerName}>{displayName}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.headerSubtitle}>Level {level}</Text>
          </View>
        </View>
        <View style={styles.pointsBadge}>
          <MaterialIcons name="local-fire-department" size={20} color="white" />
          <Text style={styles.pointsText}>{points}</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <MaterialIcons name="logout" size={22} color="#fff" />
        </TouchableOpacity>
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
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 80,
    fontSize: 16,
  },
  signOutBtn: {
    marginLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 6,
  },
});

// Export the current user's ID for use in other components
export const userName = auth.currentUser?.uid || "Matar";
export const userAvatar = "M";