import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Home page of Divvy.
 * Matching Path: /
 * @returns 
 */

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity 
        style={{ backgroundColor: 'blue', padding: 10, marginTop: 20 }} 
        onPress={() => router.push('/(scan)/camera')}>
        <Text style={{ color: 'white' }}>Scan Receipt</Text>
      </TouchableOpacity>
    </View>
  );
}