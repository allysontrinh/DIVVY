import React from "react";
import { View, Button } from "react-native";
import { Linking } from "react-native";

const LaunchVenmo = () => {
  const openVenmo = () => {
    const venmoUrl = "venmo://x-callback-url/open"; // https://venmo.com
    Linking.openURL(venmoUrl).catch(() => {
      alert("Venmo app not installed or URL not supported");
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Launch Venmo" onPress={openVenmo} color="#3D95CE" />
    </View>
  );
};

export default LaunchVenmo;