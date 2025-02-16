import React, { useState } from "react";
import { Button, View, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import NewReceipt from "./newReceipt"; // Import NewReceipt component
import { useRouter } from "expo-router";

// Veryfi API Credentials
const VERYFI_API_URL = "https://api.veryfi.com/api/v8/partner/documents/";
const CLIENT_ID = "vrf04ztm0OPFKx0YhynfzpSKk5pPuXks5bh87oX";
const CLIENT_SECRET =
  "T0NelIyfjahP6MVVMILX8S2FPYL6gtfRnXDhV0l9PiLBUyo9Fijti2C1HFcGCTFUvi8HT0fgJJMJBboL70PmFiCeY5JGXl9KbHv6KkCT4AUGnaojWwBPldzDLOHc7pkn";
const API_KEY = "04261745d020eb0b2f389479dba4ba0b";

export default function Camera() {
  const [image, setImage] = useState(null);
  const [savedImageUri, setSavedImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [veryfiResponse, setVeryfiResponse] = useState(null);
  const router = useRouter();

  /***********************  Camera + Image Handling  *************************************************************/
  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);

      const savedUri = await saveImage(imageUri);
      setSavedImageUri(savedUri);

      // After saving, send the image to Veryfi
      await sendToVeryfi(savedUri);
    } else {
      router.push("/");
    }
  };

  const saveImage = async (imageUri) => {
    try {
      const filename = imageUri.split("/").pop();
      const destination = `${FileSystem.documentDirectory}${filename}`;

      await FileSystem.moveAsync({
        from: imageUri,
        to: destination,
      });

      console.log("Image saved to:", destination);
      return destination;
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  /********************************************** Veryfi API Handling ******************************************************/
  const sendToVeryfi = async (imageUri) => {
    try {
      const fileBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const filename = imageUri.split("/").pop();

      const response = await axios.post(
        VERYFI_API_URL,
        {
          file_data: fileBase64,
          file_name: filename,
          categories: ["Grocery", "Restaurant"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Client-Id": CLIENT_ID,
            Authorization: `apikey allysontrinh:${API_KEY}`,
          },
        }
      );
      setVeryfiResponse(response.data);
    } catch (error) {
      console.error(
        "Error sending to Veryfi:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
      setCancelled(false);
    }
  };

  // If veryfiResponse exists, navigate to NewReceipt and pass the data
  if (veryfiResponse) {
    return <NewReceipt veryfiData={veryfiResponse} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Show loading indicator while API call is in progress */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <Button title="Take Picture" onPress={pickImage}>Take Picture</Button>
      )}
    </View>
  );
}