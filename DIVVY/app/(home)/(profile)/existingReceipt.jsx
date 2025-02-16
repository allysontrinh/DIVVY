import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { useRouter } from "expo-router";

export default function () {
  const router = useRouter();
  return (
    <ScrollView style={{ display: "grid" }}>
      <View style={styles.container}>
        <Card>
          <Card.Title>Linguine's Restaurant</Card.Title>
          <Card.Divider />
          <View>
            <ul>
              <li>1. Spaghetti</li>
              <li>2. Bread</li>
              <li>3. Linguine</li>
            </ul>
          </View>
        </Card>
      </View>
      <View>
        <Button onPress={() => router.back("/(profile)/profile")}>
          Go Back
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
