import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      try {
        setUser(authUser);

        if (authUser) {
          // Listen to user profile changes in real-time
          const unsubscribeProfile = onSnapshot(
            doc(db, 'users', authUser.uid),
            (doc) => {
              try {
                if (doc.exists()) {
                  setUserProfile({ id: doc.id, ...doc.data() });
                } else {
                  setUserProfile(null);
                }
                setLoading(false);
              } catch (error) {
                console.error('Error processing user profile:', error);
                setUserProfile(null);
                setLoading(false);
              }
            },
            (error) => {
              console.error('Error fetching user profile:', error);
              setUserProfile(null);
              setLoading(false);
            }
          );

          // Clean up profile listener when user logs out
          return unsubscribeProfile;
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUser(null);
        setUserProfile(null);
        setLoading(false);
      }
    }, (error) => {
      console.error('Auth state change error:', error);
      setUser(null);
      setUserProfile(null);
      setLoading(false);
    });

    // Clean up auth listener on unmount
    return unsubscribeAuth;
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user,
    userId: user?.uid || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}