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
    primary: "#007bff", // Blue color
    secondary: "#0056b3", // Darker blue for buttons
    background: "#f4f4f4", // Light background color
    surface: "#ffffff", // White surface for cards and buttons
    text: "#000000", // Black text color
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
          {/* <View style={styles.cameraButtonContainer}>
            <Button
              icon={{
                name: "camera",
                type: "font-awesome",
                size: 20,
                color: "white",
              }}
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                borderColor: "transparent",
                //borderWidth: 0,
                borderRadius: 30,
                width: 50,
                height: 50,
              }}
              containerStyle={{
                width: 200,
                padding: 0,
              }}
              onPress={() => router.push("/(scan)/camera")}
            />
          </View> */}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

/**
 * This variable acts as CSS. Use it on the style attribute of any React component.
 */
const styles = StyleSheet.create({
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
});
