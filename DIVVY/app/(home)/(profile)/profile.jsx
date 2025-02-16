import { React, useState } from "react";
import { fetchFriends } from "../../_utils/getFriends";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card } from "@rneui/themed";
import { Avatar, Button } from "react-native-elements";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import theme from "../../_constants/theme";

/**
 * Profile page
 * Matching Path: /profile
 * @returns
 */

// Get the device height for responsiveness
const { height } = Dimensions.get("window");

export default function ProfileScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dynamicTopMargin = height > 800 ? 40 : 20; // Dynamic top margin for larger screens
  const showReceipt = () => {
    router.push("/(profile)/existingReceipt");
  };

  const displayFriends = async () => {
    try {
      await fetchFriends(setFriends, setLoading);
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { marginTop: dynamicTopMargin }]}>
        <Avatar
          rounded
          size="xlarge"
          source={
            "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"
          }
          containerStyle={styles.avatarContainer}
        />
        <View style={styles.userName}>
          <Text style={styles.name}>Allyson</Text>
        </View>

        <Button
          title="View Friends"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={displayFriends}
        />
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {loading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <>
                <Text style={styles.friendsTitle}>Friends</Text>
                <View style={styles.friendsList}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                  {friends.map((friend, index) => (
                    <View key={index} style={styles.cardWrapper}>
                      <Card containerStyle={[
                          styles.card,
                          { 
                            borderWidth: 0, 
                            borderColor: 'transparent', 
                            shadowOpacity: 0, 
                            shadowRadius: 0, 
                            elevation: 0,
                            backgroundColor: 'white' // Ensure there's no background shadow effect
                          }
                        ]}>
                        <Text style={styles.friendName}>👤 {friend.name}</Text>
                      </Card>
                      <View style={styles.horizontalLine} />
                    </View>
                  ))}
                  
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <Button
                      title="Close"
                      onPress={() => setIsModalVisible(false)}
                      buttonStyle={styles.closeButton}
                      titleStyle={styles.closeButtonText}
                    />
                  </View>
                </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <ScrollView>
        {/* Inbox Section */}
      <View style={styles.section}>
        <Text style={styles.inboxTitle}>Inbox 📫</Text>
        <TouchableOpacity onPress={showReceipt}>
          <Text>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tab 2</Text>
        </TouchableOpacity>
      </View>

      {/* IN PROGRESS Section */}
      <View style={styles.section}>
        <Text style={styles.inProgressTitle}>In Progress 🚧</Text>
        <TouchableOpacity>
          <Text>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tab 2</Text>
        </TouchableOpacity>
      </View>

      {/* COMPLETED Section */}
      <View style={styles.section}>
        <Text style={styles.completedTitle}>Completed ✅</Text>
        <TouchableOpacity>
          <Text>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tab 2</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 350,
    height: 700,
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: 290, // Adjust width to fit the screen or the design
    height: 50,
    marginBottom: 0, // Space between cards
  },
  horizontalLine: {
    width: 280, // Makes the line span the full width of the container
    height: 1.25, // Line thickness
    backgroundColor: "#D3D3D3", // Line color, can change to any color
    marginTop: 0, // Space between the card and the line
    marginLeft: 20,
  },
  friendsTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
    color: theme.colors.text,
  },
  friendName: {
    fontSize: 20,
    textAlign: "left", // Centers the name inside the card
    marginBottom: -5, // Space between the name and the bottom of the card
    color: theme.colors.text,
  },
  buttonWrapper: {
    padding: 50,
    width: '100%', // Ensures the button takes the full width
    alignItems: 'center', // Centers the button horizontally
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    width: 280,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  userName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.surface,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors,
    fontSize: 16,
  },
  section: {
    marginTop: 10,
    padding: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  completedTitle: {
    color: theme.colors.completeColor,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inProgressTitle: {
    color: theme.colors.progressColor,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inboxTitle: {
    color: theme.colors.inboxColor,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
