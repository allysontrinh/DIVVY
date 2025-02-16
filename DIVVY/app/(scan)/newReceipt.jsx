import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { fetchFriends } from "../_utils/getFriends";
import { postReceipt } from "../_utils/postReceipt";

export default function newReceiptScreen({ veryfiData }) {
  const itemList = veryfiData.line_items;
  const router = useRouter();

  const handlePost = async () => {
    try {
      const hi = await postReceipt(69, 69, 69, veryfiData);
      console.log(hi);
    } catch (error) {
      console.log(error);
    }
  };

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
        {veryfiData.vendor.name}
      </Text>

      <ScrollView style={{ marginTop: 20, width: "100%" }}>
        {/* {itemList.map((item, index) => {
          return (
            <View key={index}>
              <Text style={{ marginBottom: 10 }}>Item: {item.description}</Text>
              <Text style={{ marginBottom: 10 }}>
                Quantity: {item.quantity}
              </Text>
              <Text style={{ marginBottom: 10 }}>Price: {item.total}</Text>
            </View>
          );
        })} */}
      </ScrollView>
      <Button title="Add Friends" onPress={() => handlePost()}></Button>
      <Button title="Go Back Home" onPress={() => router.push("/")} />
    </View>
  );
}
