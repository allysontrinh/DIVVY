import { Tabs } from 'expo-router';

/**
 * Handles layout of index and profile
 * @returns 
 */
export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index"/>
      <Tabs.Screen name="profile"/>
    </Tabs>
  );
}
