import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import theme from "../../_constants/theme";
import { useUser } from "../../_utils/userContext";
import { getActivity } from "../../_utils/getActivity";

// Get the device height for responsiveness
const { height } = Dimensions.get("window");

export default function ProfileScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [participating, setParticipating] = useState([]);

  const { user } = useUser();

  const dynamicTopMargin = height > 800 ? 40 : 20; // Dynamic top margin for larger screens
  const showReceipt = () => {
    router.push("/(profile)/existingReceipt");
  };

  // Fetch the participating events when the component mounts
  useEffect(() => {
    getActivity(user.id, setParticipating, setLoading);
  }, [user.id]);

  const displayFriends = async () => {
    try {
      await fetchFriends(user.id, setFriends, setLoading);
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
          <Text style={styles.name}>{user.name}</Text>
        </View>

        <Button
          title="View Friends"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={displayFriends}
        />
        <Modal
          animationType="slide"
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
                  {friends.map((friend, index) => (
                    <Text key={index}>{friend.name}</Text>
                  ))}
                  <Button
                    title="Close"
                    onPress={() => setIsModalVisible(false)}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>

      {/* Inbox Section - Showing only events with status "in-progress" */}
      <View style={styles.section}>
        <Text style={styles.inboxTitle}>Inbox 📫</Text>
        {participating.length > 0 ? (
          participating.map((event, index) => (
            <TouchableOpacity key={index}>
              <Text>{`Event ${event.eventID} - Status: ${event.status}`}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No in-progress events</Text>
        )}
      </View>

      {/* Other sections (Optional) */}
      <View style={styles.section}>
        <Text style={styles.inProgressTitle}>In Progress 🚧</Text>
        <TouchableOpacity>
          <Text>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tab 2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.completedTitle}>Completed ✅</Text>
        <TouchableOpacity>
          <Text>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tab 2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
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
    marginBottom: 10,
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
  inboxTitle: {
    color: theme.colors.inboxColor,
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
  completedTitle: {
    color: theme.colors.completeColor,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
