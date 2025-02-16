import { React, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchFriends } from "../_utils/getFriends";
import { postReceipt } from "../_utils/postReceipt";
import { useUser } from "../_utils/userContext";
import { CheckBox } from "@rneui/themed";

export default function NewReceiptScreen({ veryfiData }) {
  const itemList = veryfiData.line_items;
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [eventID, setEventID] = useState(-1);
  const { user, login } = useUser();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const [check, setCheck] = useState(false);

  const addFriends = async () => {
    try {
      postReceipt(setEventID, veryfiData.id, user.id, veryfiData);
    } catch (error) {
      console.log(error);
    }
    try {
      fetchFriends(user.id, setFriends, setLoading);
      setModalVisible(true); // Show modal after fetching friends
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
        {itemList.map((item, index) => (
          <View key={index}>
            <Text key={index} style={{ marginBottom: 10 }}>
              Item: {item.description}
            </Text>
            <Text key={index} style={{ marginBottom: 10 }}>
              Quantity: {item.quantity}
            </Text>
            <Text key={index} style={{ marginBottom: 10 }}>
              Price: {item.total}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Button title="Add Friends" onPress={addFriends} />
      <Button
        title="Go Back Home"
        onPress={() => router.push("/(home)/home")}
      />

      {/* Modal for displaying friends */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Select Friends
            </Text>

            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              friends.map((friend) => (
                // <CheckBox
                //   center
                //   title={friend.name}
                //   checked={check}
                //   onPress={() => setCheck(!check)}
                // />
                <TouchableOpacity
                  key={friend.id}
                  onPress={() => console.log(`Selected ${friend.name}`)}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{friend.name}</Text>
                </TouchableOpacity>
              ))
            )}

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
