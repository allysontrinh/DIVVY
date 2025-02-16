import { React, useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchBar, Card } from "@rneui/themed";
import axios from "axios";
import theme from "../_constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://divvy-8y34.onrender.com/api/users/friends/3"
      );
      setFriends(response.data); // Update state with API data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Hide loader after fetch
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts
    // Set interval to re-fetch data every 5 seconds (5000ms)
    // const intervalId = setInterval(() => {
    //   fetchPosts();
    // }, 5000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View>
          <SearchBar
            placeholder=". . ."
            onChangeText={(search) => {
              setSearch(search);
            }}
            value={search}
            containerStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 5,
              margin: 20,
            }}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {friends.map((friend, index) => {
            return (
              <Card style={styles.postCard}>
                <Card.Title>{friend.name}</Card.Title>
                <Card.Divider />
                <Text>
                  Spent: $100
                </Text>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

/**
 * This variable acts as CSS. Use it on the style attribute of any React component.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
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
  /* cameraButtonContainer: {
    position: "absolute",
    bottom: 60, // Adjust this value if needed
    left: "50%",
    marginLeft: -25, // Adjust to center the button
    zIndex: 10,
  }, */
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
});
