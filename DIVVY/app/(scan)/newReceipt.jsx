import { React, useState } from "react";
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import {
  View,
  Text,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchFriends } from "../_utils/getFriends";
import { postReceipt } from "../_utils/postReceipt";
import { useUser } from "../_utils/userContext";
import { CheckBox } from "@rneui/themed";
import { addFriend } from "../_utils/addFriend";

export default function NewReceiptScreen({ veryfiData }) {
  const itemList = veryfiData.line_items;
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const { user, login } = useUser();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const [check, setCheck] = useState(false);

  const receiptID = veryfiData.id;

  const handlePost = async () => {
    try {
      const hi = await postReceipt(receiptID, user.id, veryfiData);
      console.log(hi);
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

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground
      source={require("/Users/Ally/Documents/Hackher25Project/DIVVY/DIVVY/assets/images/receipt.png")} // Add your image URL here
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e9def5",
      }}
      imageStyle={{ resizeMode: "cover", marginTop: 30}} // Make sure the image covers the screen
    >
      <View>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 36, fontWeight: "bold", marginTop: 100, marginBottom: 20 }}>
        {veryfiData.vendor.name}
      </Text>
      <View style={{
        borderBottomWidth: 1.5,
        borderColor:"rgb(198, 193, 208)",
      }} />
      </View>
      <View style={{ flex: 1, width: "100%"}}>
      <ScrollView style={{ marginTop: 50, width: "100%"}}
      contentContainerStyle={{ flexGrow: 1}}
      >
        {itemList.map((item, index) => (
          <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
            <Text key={index + 2} style={{ fontFamily: "Roboto_400Regular", marginLeft: 30, flex: 1 }}>
              {item.quantity}x
            </Text>
            <Text key={index + 1} style={{ fontFamily: "Roboto_400Regular", marginLeft: -80, flex: 1 }}>
              {item.description}
            </Text>
            <Text key={index + 3} style={{ fontFamily: "Roboto_400Regular", fontWeight: "bold", marginRight: 30, textAlign: "right", flex: 1}}>
              ${item.total.toFixed(2)}
            </Text>
          </View>
          
        ))}

        <View 
        style={{
          borderBottomWidth: 1,
          borderColor:"rgb(198, 193, 208)",
          left: 30,
          marginRight: 60,
        }} 
        />

      {/* Grand Total */}
      <View style={{ 
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        marginBottom: 20, // Adds spacing at the bottom
        /* position: "absolute",
        bottom: 20,
        left: 130,
        flexDirection: "row", 
        //justifyContent: "space-between", 
        padding: 10, */

        }}>
        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 18, fontWeight: "bold" }}>
          Grand Total:
        </Text>
        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 18, marginLeft: 10, color: "red" }}>
              ${veryfiData.total.toFixed(2)}
        </Text>
      </View>
      </ScrollView>
      </View>
      

      <Button title="Add Friends" onPress={() => handlePost()} />
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
              friends.map((friend, index) => (
                // <CheckBox
                //   center
                //   title={friend.name}
                //   checked={check}
                //   onPress={() => setCheck(!check)}
                // />
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => addFriend(user.userID, friend.userID, receiptID)}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Text key={index} style={{ fontSize: 16 }}>
                    {friend.name}
                  </Text>
                </TouchableOpacity>
              ))
            )}

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
