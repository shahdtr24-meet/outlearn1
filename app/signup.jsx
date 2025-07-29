
import { router } from 'expo-router';
import SignupScreen from './components/SignupScreen';

export default function SignupPage() {
  const handleNavigateToLogin = () => {
    router.push('/login');
  };

  return <SignupScreen onNavigateToLogin={handleNavigateToLogin} />;
}
