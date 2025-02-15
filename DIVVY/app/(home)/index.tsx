import React from "react";
import { View, Text } from "react-native";
import LaunchVenmo from "@/components/venmoButton"; // Ensure path is correct

export default function HomeScreen() {
  console.log("Home Screen Loaded"); // Debug log

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <LaunchVenmo />
    </View>
  );
}


