import { Tabs } from "expo-router";

export default function HomeLayout() {
  console.log("Tabs Layout Loaded"); // Debug log

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

