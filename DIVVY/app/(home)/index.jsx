import { fetchFriends } from "../_utils/getFriends";
import { fetchReceipts } from "../_utils/getPaidReceipts"; // Assuming you have this function
import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Modal,
  Button
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { SearchBar, Card } from "@rneui/themed";
import theme from "../_constants/theme";

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedUserJson, setSelectedUserJson] = useState(null); // Selected user's JSON

  const userID = 8;
  
  /* useEffect(() => {
    fetchFriends(setFriends, setLoading); // Call the reusable function
  }, []); */
  // Fetch friends and receipts data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Show loading indicator while fetching data

        // Fetch friends
        await fetchFriends(setFriends, setLoading);

        // Fetch receipts
        await fetchReceipts(userID, setUserData, setReceipts, setLoading);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hide loading indicator once data is fetched
      }
    };

    fetchData();
  }, []); // Fetch data whenever userID changes


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const openModal = (userJson) => {
    setSelectedUserJson(userJson); // Set the selected user’s JSON data
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedUserJson(null); // Clear the selected user’s JSON data
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <SearchBar
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInput}
          />
          <ScrollView style={styles.scrollView}>
            {friends.map((friend, index) => (
              <Card key={index} onPress={() => openModal(friend)}>
                <Card.Title style={styles.nameText}>{friend.name}</Card.Title>
                <Card.Divider />
                {/* Checking if friend has any paid tickets or events */}
                {friend.events && friend.events.length > 0 ? (
                  friend.events.map((event, eventIndex) => (
                    <View key={eventIndex}>
                      {event.hosted && event.hosted.length > 0 && event.hosted[0].status === "paid" && (
                        <View>
                        <Text>Made a post!</Text>
                        {event.hosted[0].photos && event.hosted[0].photos.length > 0 ? (
                          // If there are photos, display them
                          event.hosted[0].photos.map((photo, photoIndex) => (
                            <Image key={photoIndex} source={{ uri: photo }} style={{ width: 100, height: 100 }} />
                          ))
                        ) : (
                          // If there are no photos, show a fallback message
                          <Text>No photos available</Text>
                        )}
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <Text>No Activity</Text>
                )}

                {/* Display receipts for paid tickets */}
                {receipts && receipts.length > 0 ? (
                  receipts.map((receipt, receiptIndex) => (
                    <View key={receiptIndex}>
                      <Text>{receipt.description}</Text>
                      <Text>${receipt.amount}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No paid tickets found</Text>
                )}
              </Card>
            ))}
          </ScrollView>
            {/* Modal to show the user's JSON */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
              <Text style={styles.nameText}>{selectedUserJson?.name}</Text>
                <Button title="Close" onPress={closeModal} />
              </View>
            </View>
          </Modal>

        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

/**
 * This variable acts as CSS. Use it on the style attribute of any React component.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flex: 1,
  },
  searchBarWrapper: {
    width: "90%",
    alignSelf: "center",
    zIndex: 2,
  },
  searchBarContainer: {
    backgroundColor: theme.colors.primary,
    padding: 40,
    marginTop: 0,
    marginBottom: 10,
    borderBottomColor: "transparent",
  },
  searchBarInput: {
    borderRadius: 30,
    marginBottom: -20,
    backgroundColor: "white",
  },
  nameText: {
    textAlign: "left",
  },
  view1: {
    flex: 1,
    justifyContent: "flex-start", // Align items from top
    padding: 10,
  },
  view2: {
    position: "absolute",
    bottom: 80, // Make sure it's above the nav bar
    left: "50%",
    marginLeft: -25,
    zIndex: 10, // Ensure it appears above other elements
  },
  searchBar: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "blue",
  },
  buttonContainer: {
    marginTop: 20, // Add margin to avoid overlap
  },
  postCard: {
    margin: 40,
  },
  scrollView: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
    overflow: "scroll",
  },
  jsonText: {
    fontFamily: "Courier New",
    fontSize: 14,
    marginBottom: 20,
    color: "#333",
    whiteSpace: "pre-wrap",
  },
});
