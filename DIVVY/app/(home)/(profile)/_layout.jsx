import { Stack } from "expo-router";

/**
 * Handles layout of Root (everything within /app)
 * @returns
 */
export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="existingReceipt" options={{ headerShown: false }} />
    </Stack>
  );
}
