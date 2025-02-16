import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
  const [friends, setFriends] = useState();
  const dynamicTopMargin = height > 800 ? 40 : 20; // Dynamic top margin for larger screens
  const showReceipt = () => {
    router.push("/(profile)/existingReceipt");
  };

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://divvy-8y34.onrender.com/api/users/friends/3"
      );
      setFriends(response.data);

    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Hide loader after fetch
    }
  };

  const displayFriends = async () => {
    await fetchFriends();
    
  }

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
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
