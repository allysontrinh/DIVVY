// index.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider, useUser } from "../app/_utils/userContext";
import { useRouter } from "expo-router";

export default function App() {
  const { user, login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginHandler = async () => {
    if (username === "Allyson" && password === "momo") {
      const userData = { id: 3, name: "Allyson" };
      await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
      login(userData); // Use the login function from context
      router.push("/(home)/home");
    } else if (username === "Sarah" && password === "umass") {
      const userData = { id: 2, name: "Sarah" };
      await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
      login(userData); // Use the login function from context
      router.push("/(home)/home");
    }
  };

  return (
    <UserProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Please log in</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={loginHandler} />
        <Button title="Logout"></Button>
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
