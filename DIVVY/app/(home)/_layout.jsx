import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";
/**
 * Handles layout of index and profile
 * @returns
 */
export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" type="material" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
