import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../colors';

const WelcomeScreen = () => {
  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          <Text style={styles.out}>Out</Text>
          <Text style={styles.learn}>Learn</Text>
        </Text>
      </View>
      
      <Text style={styles.tagline}>
        <Text style={styles.outDo}>Out</Text>DO. <Text style={styles.outGrow}>Out</Text>Grow. <Text style={styles.outLearn}>Out</Text>Learn.
      </Text>
      
      <Text style={styles.description}>
        we teach what you didn't learn in school,{"\n"}
        the fun way.
      </Text>
      
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>sign up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>sign in</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          all rights are reserved to outlearn
        </Text>
        <View style={styles.copyrightIcon}>
          <Text style={styles.copyrightText}>©</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.welcomeBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  out: {
    color: colors.outBlue,
  },
  learn: {
    color: colors.outOrange,
  },
  tagline: {
    fontSize: 18,
    color: colors.welcomeText,
    marginBottom: 15,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  outDo: {
    color: colors.outOrange,
  },
  outGrow: {
    color: colors.outGreen,
  },
  outLearn: {
    color: colors.outOrange,
  },
  description: {
    fontSize: 16,
    color: colors.welcomeDescription,
    marginBottom: 40,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: colors.outOrange,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  footerText: {
    color: colors.welcomeFooter,
    fontSize: 14,
  },
  copyrightIcon: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: colors.welcomeFooter,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightText: {
    color: colors.welcomeFooter,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;