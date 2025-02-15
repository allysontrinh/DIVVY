import React from "react";
import { View } from "react-native";
import LaunchVenmo from "@/components/venmoButton"; // Ensure path is correct

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LaunchVenmo />
    </View>
  );
}

