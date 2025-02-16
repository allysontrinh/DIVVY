/* Opens up device camera, allows users to retake image, and sends photo to Veryfi API and returns a JSON.
 * JSON is parsed for "important" data, and that parsed JSON gets sent to receipt.jsx to be displayed in a new screen.
*/


import React, { useState } from 'react';
import { Button, View, Text, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Client setup 
// Keep these keys 
const VERYFI_API_URL = 'https://api.veryfi.com/api/v8/partner/documents/';
const CLIENT_ID = 'vrf04ztm0OPFKx0YhynfzpSKk5pPuXks5bh87oX';
const CLIENT_SECRET = 'T0NelIyfjahP6MVVMILX8S2FPYL6gtfRnXDhV0l9PiLBUyo9Fijti2C1HFcGCTFUvi8HT0fgJJMJBboL70PmFiCeY5JGXl9KbHv6KkCT4AUGnaojWwBPldzDLOHc7pkn';
const API_KEY = '04261745d020eb0b2f389479dba4ba0b';

export default function Camera() {
  const [image, setImage] = useState(null);
  const [savedImageUri, setSavedImageUri] = useState(null);
  const [veryfiResponse, setVeryfiResponse] = useState(null);
  const router = useRouter();

  /***********************  camera + image handling *************************************************************/
  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3], // Should probably change aspect ratio to not 4x3
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; 
      setImage(imageUri); // Display the image

      const savedUri = await saveImage(imageUri);
      setSavedImageUri(savedUri);

      // After saving, send the image to Veryfi
      await sendToVeryfi(savedUri);
    }
  };

  const saveImage = async (imageUri) => {
    try {
      const filename = imageUri.split('/').pop();
      const destination = `${FileSystem.documentDirectory}${filename}`;

      await FileSystem.moveAsync({
        from: imageUri,
        to: destination,
      });

      console.log('Image saved to:', destination);
      return destination;
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  /********************************************** Veryfi API handling ******************************************************/
  const sendToVeryfi = async (imageUri) => {
    try {
        const fileBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

        const filename = imageUri.split('/').pop(); // Extract filename safely

        const response = await axios.post(
            VERYFI_API_URL,
            {
                file_data: fileBase64,
                file_name: filename, // Use filename extracted from imageUri
                categories: ['Grocery', 'Restaurant'],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Client-Id and Authorization keys (keep these)
                    'Client-Id': 'vrf04ztm0OPFKx0YhynfzpSKk5pPuXks5bh87oX',
                    'Authorization': `apikey allysontrinh:04261745d020eb0b2f389479dba4ba0b`,
                },
            }
        );

        console.log('Veryfi Response:', response.data);
        setVeryfiResponse(response.data);
        
        // Navigate to the receipt screen and pass the parsed data
        router.replace({
          pathname: '/receipt',
          query: {
            vendor_name: response.data.vendor_name || 'N/A',
            total: response.data.total || 'N/A',
            date: response.data.transaction_date || 'N/A',
            tax: response.data.tax || 'N/A',
            categories: response.data.categories ? response.data.categories.join(', ') : 'N/A',
          }
        });

    } catch (error) {
      console.error('Error sending to Veryfi:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Take a Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}
      {savedImageUri && <Text>Saved at: {savedImageUri}</Text>}
    </View>
  );
}
