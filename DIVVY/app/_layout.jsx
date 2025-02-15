import { Stack } from "expo-router";

/**
 * Handles layout of Root (everything within /app)
 * @returns 
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }}/>
      <Stack.Screen name="(scan)" options={{ headerShown: false }}/>
    </Stack>
  );
}
