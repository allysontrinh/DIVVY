import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReceiptScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Itemized Receipt</Text>
      <Button title="Go Back Home" onPress={() => router.push('/')} />
    </View>
  );
}
