import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Text, Card, Button, Icon, Divider } from "@rneui/themed";
import { useRouter } from "expo-router";
import theme from "../../_constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const dynamicTopMargin = height > 800 ? 40 : 20;

export default function ExistingReceipt() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={require("../../../assets/images/receipt.png")}
          style={styles.background}
        >
          <View style={styles.receiptInfo}>
            <Card containerStyle={{ backgroundColor: "transparent" }}>
              <Card.Title>Linguine's Restaurant</Card.Title>
              <Card.Divider />
              <View>
                <Text>1. Spaghetti</Text>
                <Text>2. Bread</Text>
                <Text>3. Linguine</Text>
              </View>
            </Card>
          </View>
        </ImageBackground>
      </ScrollView>
      <View>
        <Button onPress={() => router.back("/(profile)/profile")}>
          Go Back
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: "100vw",
    height: "100vh",
  },
  scrollView: {
    display: "grid",
    backgroundColor: theme.colors.primary,
  },
  receiptInfo: {
    marginTop: dynamicTopMargin,
  },
});
