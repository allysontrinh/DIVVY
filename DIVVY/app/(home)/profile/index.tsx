import React from "react";
import { View, Text } from "react-native";

export default function ProfileScreen() {
  console.log("Profile Screen Loaded"); // Debug log

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

