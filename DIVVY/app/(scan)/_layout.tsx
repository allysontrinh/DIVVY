import { Stack } from "expo-router";

/**
 * Handles layout of camera and receipt screens
 * @returns 
 */
export default function ScanLayout() {
  return (
    <Stack>
      <Stack.Screen name="camera" options={{ headerShown: false }}/>
      <Stack.Screen name="receipt" options={{ headerShown: false }}/>
    </Stack>
  );
}
