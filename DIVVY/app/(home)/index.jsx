import React from "react";
import { ThemeProvider } from "react-native-elements";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Custom theme to use with react native elements :3
const theme = {
  colors: {
    primary: "#007bff", // Blue color
    secondary: "#0056b3", // Darker blue for buttons
    background: "#f4f4f4", // Light background color
    surface: "#ffffff", // White surface for cards and buttons
    text: "#000000", // Black text color
  },
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Home Screen</Text>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              padding: 10,
              marginTop: 20,
            }}
            onPress={() => router.push("/(scan)/camera")}
          >
            <Text style={{ color: "white" }}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
