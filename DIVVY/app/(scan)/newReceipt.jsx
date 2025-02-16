import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function newReceiptScreen({ veryfiData }) {
  const itemList = veryfiData.line_items;
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 30 }}>
        {verifyData.vendor.name}
      </Text>

      <ScrollView style={{ marginTop: 20, width: "100%" }}>
        {itemList.map((item, index) => {
          return (
            <View>
              <Text style={{ marginBottom: 10 }}>Item: {item.description}</Text>
              <Text style={{ marginBottom: 10 }}>
                Quantity: {item.quantity}
              </Text>
              <Text style={{ marginBottom: 10 }}>Price: {item.total}</Text>
            </View>
          );
        })}
      </ScrollView>

      <Button title="Go Back Home" onPress={() => router.push("/")} />
    </View>
  );
}
