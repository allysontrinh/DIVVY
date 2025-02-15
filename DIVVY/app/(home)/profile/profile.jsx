import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { Dimensions } from "react-native";

/**
 * Profile page
 * Matching Path: /profile
 * @returns
 */

// Get the device height for responsiveness
const { height } = Dimensions.get("window");

export default function ProfileScreen() {
  const dynamicTopMargin = height > 800 ? 40 : 20; // Dynamic top margin for larger screens

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { marginTop: dynamicTopMargin }]}>
        <Avatar
          rounded
          size="xlarge"
          source={{ uri: "https://example.com/avatar.jpg" }}
          containerStyle={styles.avatarContainer}
        />
        <Text style={styles.name}>John Doe</Text>

        <Button
          title="View Friends"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => alert("View Friends Pressed")}
        />
      </View>

      {/* Inbox Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inbox</Text>
        <Text>Tab 1</Text>
        <Text>Tab 2</Text>
      </View>

      {/* IN PROGRESS Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>In Progress</Text>
        <Text>Tab 1</Text>
        <Text>Tab 2</Text>
      </View>

      {/* COMPLETED Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed</Text>
        <Text>Tab 1</Text>
        <Text>Tab 2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    padding: 16,
    justifyContent: "center",
  },
  avatarContainer: {
    marginBottom: 10, // Ensure space between avatar and name
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  section: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
