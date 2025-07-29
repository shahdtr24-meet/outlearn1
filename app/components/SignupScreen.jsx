import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../colors';

const SignupScreen = ({ onNavigateToLogin }) => {
  
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    passwordVerification: '',
    age: '', 
    location: '', 
    interests: [],
    goals: [],
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const interestOptions = [
    'Finance', 'Investing', 'Budgeting', 'Saving',
    'Credit', 'Taxes', 'bombaclat', 'Real Estate'
  ];

  const goalOptions = [
    'Learn Basics', 'Build Wealth', 'Pay Off Debt',
    'Save for Education', 'to preper for thr future ', 'Buy a Home'
  ];

  // Handle input changes for text fields
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Toggle selection for interests and goals
  const toggleSelection = (field, item) => {
    setFormData(prev => {
      const currentItems = prev[field];
      if (currentItems.includes(item)) {
        return { ...prev, [field]: currentItems.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...currentItems, item] };
      }
    });
  };

  // Validate the first phase of the form
  const validatePhaseOne = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    if (formData.password !== formData.passwordVerification) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!formData.age.trim()) {
      Alert.alert('Error', 'Please enter your age');
      return false;
    }
    if (!formData.location.trim()) {
      Alert.alert('Error', 'Please enter your location');
      return false;
    }
    return true;
  };

  // Move to the next phase
  const handleNextPhase = () => {
    if (phase === 1 && validatePhaseOne()) {
      setPhase(2);
    } else if (phase === 2) {
      setPhase(3);
    }
  };

  // Handle the final submission
  const handleSubmit = async () => {
    if (formData.interests.length === 0) {
      Alert.alert('Error', 'Please select at least one interest');
      return;
    }
    if (formData.goals.length === 0) {
      Alert.alert('Error', 'Please select at least one goal');
      return;
    }

    // Navigate to the main app
    router.replace('/(tabs)');
  };

  // Render the first phase of the signup form
  const renderPhaseOne = () => (
    <>
      <Text style={styles.title}>
        <Text style={styles.titleBrown}>SIGN </Text>
        <Text style={styles.titleOrange}>UP</Text>
      </Text>
      <Text style={styles.subtitle}>Fill out your info to get a better personalized experience</Text>
      
      {/* Full Name */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full name:"
          placeholderTextColor="#F3F0EC"
          value={formData.fullName}
          onChangeText={(text) => handleInputChange('fullName', text)}
        />
      </View>
      
      {/* Username */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="USER NAME:"
          placeholderTextColor="#F3F0EC"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
        />
      </View>
      
      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gmail:"
          placeholderTextColor="#F3F0EC"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
      </View>
      
      {/* Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password:"
          placeholderTextColor="#F3F0EC"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
      </View>
      
      {/* Password Verification */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password verification:"
          placeholderTextColor="#F3F0EC"
          secureTextEntry
          value={formData.passwordVerification}
          onChangeText={(text) => handleInputChange('passwordVerification', text)}
        />
      </View>
      
      {/* Age */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: '#F3F0EC', fontSize: 14 }}>
            {formData.age ? formData.age : 'Select your birth date'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.age ? new Date(formData.age) : new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleInputChange('age', selectedDate.toISOString().split('T')[0]);
              }
            }}
          />
        )}
      </View>
      {/* Location */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Location:"
          placeholderTextColor="#F3F0EC"
          value={formData.location}
          onChangeText={(text) => handleInputChange('location', text)}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleNextPhase}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onNavigateToLogin}>
        <Text style={styles.toggleText}>ALREADY HAVE AN ACCOUNT? SIGN IN</Text>
      </TouchableOpacity>
    </>
  );

  // Render the second phase of the signup form
  const renderPhaseTwo = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>
        <Text style={styles.titleBrown}>ALMOST </Text>
        <Text style={styles.titleOrange}>THERE!</Text>
      </Text>
      <Text style={styles.subtitle}>Tell us about your interests and goals</Text>
      
      <Text style={styles.sectionTitle}>What are you interested in?</Text>
      <View style={styles.optionsGrid}>
        {interestOptions.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.optionButton,
              formData.interests.includes(interest) && styles.selectedOption
            ]}
            onPress={() => toggleSelection('interests', interest)}
          >
            <Text 
              style={[
                styles.optionText,
                formData.interests.includes(interest) && styles.selectedOptionText
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>What are your goals?</Text>
      <View style={styles.optionsGrid}>
        {goalOptions.map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.optionButton,
              formData.goals.includes(goal) && styles.selectedOption
            ]}
            onPress={() => toggleSelection('goals', goal)}
          >
            <Text 
              style={[
                styles.optionText,
                formData.goals.includes(goal) && styles.selectedOptionText
              ]}
            >
              {goal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => setPhase(1)}
          disabled={loading}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleNextPhase}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Add this function after renderPhaseTwo
  const renderTermsPhase = () => (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: colors.outBlue }}>
        Terms & Conditions
      </Text>
      <ScrollView style={{ maxHeight: 200, marginBottom: 20 }}>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 10 }}>
          By signing up, you agree to OutLearn's Terms and Conditions.
          Please read our privacy policy and user agreement before continuing.
        </Text>
        <Text style={{ color: '#7C4D33', fontWeight: 'bold', fontSize: 15, marginBottom: 8 }}>
          Terms & Conditions
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 8 }}>
          Welcome to OutLearn – a place to grow your soft skills and get ready for real life! Before you jump in, please read and agree to the following terms:
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 6 }}>
          {'\u2022'} <Text style={{ fontWeight: 'bold' }}>Respect the Community:</Text> Be kind, respectful, and thoughtful when using the app. Bullying, hate speech, or any inappropriate behavior isn’t allowed – ever.
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 6 }}>
          {'\u2022'} <Text style={{ fontWeight: 'bold' }}>Keep It Private:</Text> Everything you learn and do here is just for you. Don’t share other people’s answers, conversations, or personal info outside the app. Respect everyone’s privacy.
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 6 }}>
          {'\u2022'} <Text style={{ fontWeight: 'bold' }}>Your Data is Safe:</Text> We don’t sell your data. We use it only to make your experience better – like helping you track your progress or improve your skills.
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 6 }}>
          {'\u2022'} <Text style={{ fontWeight: 'bold' }}>Educational Use Only:</Text> This app is here to help you learn soft skills, not for gaming, trolling, or other stuff it wasn’t made for.
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 6 }}>
          {'\u2022'} <Text style={{ fontWeight: 'bold' }}>You're Responsible:</Text> Make sure you use the app honestly. Don’t pretend to be someone else or try to mess with the app.
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginBottom: 6 }}>
          {'\u2022'} <Text style={{ fontWeight: 'bold' }}>Updates & Changes:</Text> We might update these terms from time to time. If we do, we’ll let you know in the app. Keep checking back to stay in the loop.
        </Text>
        <Text style={{ color: '#7C4D33', fontSize: 14, marginTop: 10 }}>
          By signing up, you're saying you understand and agree to these terms. If you don’t agree, please don’t use the app.
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      >
        <View style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.outBlue,
          backgroundColor: acceptedTerms ? colors.outBlue : '#fff',
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {acceptedTerms && (
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>✓</Text>
          )}
        </View>
        <Text style={{ color: colors.outBlue, fontSize: 14 }}>
          I accept the Terms & Conditions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: acceptedTerms ? 1 : 0.5 }
        ]}
        onPress={handleSubmit}
        disabled={!acceptedTerms || loading}
      >
        <Text style={styles.buttonText}>Complete Signup</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Out</Text>
          <Text style={styles.logoOrange}>Learn</Text>
        </Text>
      </View>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {phase === 1
          ? renderPhaseOne()
          : phase === 2
          ? renderPhaseTwo()
          : renderTermsPhase()}
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          all rights are reserved to outlearn Ⓒ
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.welcomeBackground,
    padding: 0,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    fontSize: 17,
    fontWeight: 'normal',
  },
  logoBlue: {
    color: colors.outBlue,
  },
  logoOrange: {
    color: colors.outOrange,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 55,
    marginBottom: 10,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  titleBrown: {
    color: '#7C4D33', // Brown color for "SIGN"
  },
  titleOrange: {
    color: colors.outOrange,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 30,
    color: colors.outBlue,
    textAlign: 'center',
    maxWidth: 300,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: colors.outBlue,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 54,
    backgroundColor: colors.outOrange,
    borderRadius: 27,
    paddingHorizontal: 24,
    color: '#F3F0EC', // Light color for text
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  optionButton: {
    width: '48%',
    height: 64,
    backgroundColor: colors.outOrange,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: '#7C4D33', // Brown color when selected
  },
  optionText: {
    color: '#F3F0EC', // Light color
    fontSize: 14,
    fontWeight: '400',
  },
  selectedOptionText: {
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginTop: 20,
  },
  button: {
    width: 146,
    height: 35,
    backgroundColor: '#7C4D33', // Brown color
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  secondaryButton: {
    width: 120,
    height: 35,
    backgroundColor: colors.outBlue,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#F3F0EC', // Light color
    fontSize: 19,
    fontWeight: '400',
  },
  secondaryButtonText: {
    color: '#F3F0EC', // Light color
    fontSize: 16,
    fontWeight: '400',
  },
  toggleText: {
    color: '#F5B125', // Yellow color
    fontSize: 12,
    fontWeight: '400',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: colors.outBlue,
    fontSize: 9,
    fontWeight: '400',
  },
});

export default SignupScreen;