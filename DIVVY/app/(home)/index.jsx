import { fetchFriends } from "../_utils/getFriends";
import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { SearchBar, Card } from "@rneui/themed";
import theme from "../_constants/theme";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends(setFriends, setLoading); // Call the reusable function
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
              <Card key={index}>
                <Card.Title style={styles.nameText}>{friend.name}</Card.Title>
                <Card.Divider />
                <Text>Spent: $100</Text>
              </Card>
            ))}
          </ScrollView>
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
});
