import { Stack } from "expo-router";
import { UserProvider } from "./_utils/userContext";

/**
 * Handles layout of Root (everything within /app)
 * @returns
 */
export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="/" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(scan)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
