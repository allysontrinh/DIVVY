import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";

// Custom theme to use with react native elements
const theme = {
  colors: {
    primary: "#b5a1ed", // Blue color
    secondary: "#9a86db", // Darker blue for buttons
    text: "#000000",
  },
};

export default function HomeLayout() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Tabs Screens */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute", // Ensure the tab bar is fixed at the bottom
            height: 100,
            paddingBottom: 10,
            bottom: 0,
            zIndex: 5, // Tab bar below camera button
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarIconStyle: {
            justifyContent: "space-between",
            marginBottom: 5,
            width: 100,
            height: 65,
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" type="material" color={theme.colors.secondary} size={size * 1.5} />
            ),
            tabBarLabel: () => null, 
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" type="material" color={theme.colors.secondary} size={size * 1.5} />
            ),
            tabBarLabel: () => null, 
          }}
        />
      </Tabs>

      {/* Camera Button */}
      <View style={styles.cameraButtonContainer}>
        <Button
          icon={{
            name: "camera",
            type: "font-awesome",
            size: 40,
            color: "white",
          }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 50,
            width: 80,
            height: 80,
          }}
          containerStyle={{
            width: 100,
            padding: 0,
          }}
          onPress={() => router.push("/(scan)/camera")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButtonContainer: {
    position: "absolute",
    bottom: 40, // Position above the tab bar
    left: "50%",
    marginLeft: -40, // Center it horizontally
    zIndex: 10, // Ensure it appears above the tab bar
  },
});

/* import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";

/**
 * Handles layout of index and profile
 * @returns
 
export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        zIndex: 20,
      }, }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" type="material" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
} */
