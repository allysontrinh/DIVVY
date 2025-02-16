import { React, useState } from "react";
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

// Custom theme to use with react native elements :3
const theme = {
  colors: {
    primary: "#e9def5", // Blue color
    secondary: "#0056b3", // Darker blue for buttons
    background: "#f4f4f4", // Light background color
    surface: "#ffffff", // White surface for cards and buttons
    maintext: "#000000", // Black text color
  },
};

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={{ /* display: "grid" */ flex: 1}}>
          <View>
            <SearchBar
              placeholder=". . ."
              onChangeText={(search) => {
                setSearch(search);
              }}
              value={search}
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.searchBarInput}             
            />
          </View>
          <ScrollView style={styles.scrollView}>
            <Card style={styles.postCard}>
              <Card.Title>@Allyson.T</Card.Title>
              <Card.Divider />
              <Text>I went to this amazing Restaurant...</Text>
            </Card>
            <Card>
              <Card.Title>@Sarah.J</Card.Title>
              <Card.Divider />
              <Text>I HATE LINGUINE'S....</Text>
            </Card>
            <Card>
              <Card.Title>@Sarah.J</Card.Title>
              <Card.Divider />
              <Text>I HATE LINGUINE'S....</Text>
            </Card><Card>
              <Card.Title>@Sarah.J</Card.Title>
              <Card.Divider />
              <Text>I HATE LINGUINE'S....</Text>
            </Card>
            <Card>
              <Card.Title>@Sarah.J</Card.Title>
              <Card.Divider />
              <Text>I HATE LINGUINE'S....</Text>
            </Card>
            <Card>
              <Card.Title>@Sarah.J</Card.Title>
              <Card.Divider />
              <Text>I HATE LINGUINE'S....</Text>
            </Card>
            <Card>
              <Card.Title>@Sarah.J</Card.Title>
              <Card.Divider />
              <Text>I HATE LINGUINE'S....</Text>
            </Card>
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
  searchBarWrapper: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    zIndex: 2,
  },
  searchBarContainer: {
    backgroundColor: theme.colors.background,
    padding: 40,
    marginTop: 10,
    marginBottom: -10,
    borderBottomColor: 0,
    borderTopColor: 0,
  },
  searchBarInput: {
    borderRadius: 30,
    marginBottom: -20,
    backgroundColor: "white",
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
});
