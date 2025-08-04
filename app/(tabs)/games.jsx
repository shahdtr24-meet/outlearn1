import { Redirect } from 'expo-router';

export default function GamesTab() {
  // Redirect to the games lobby page
  return <Redirect href="/lobby" />;
}