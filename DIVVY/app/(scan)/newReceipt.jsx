import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReceiptScreen() {
  const router = useRouter();
  const { query } = router;

  // handle when router.query isn't immediately populated yet 
  if (!query || !query.vendor_name || !query.total || !query.date || !query.tax || !query.categories) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading receipt details...</Text>
      </View>
    );
  }
  
  const { vendor_name, total, date, tax, categories } = router.query;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Itemized Receipt</Text>

      <ScrollView style={{ marginTop: 20, width: '100%' }}>
        <Text style={{ marginBottom: 10 }}>Vendor: {vendor_name}</Text>
        <Text style={{ marginBottom: 10 }}>Total: ${total}</Text>
        <Text style={{ marginBottom: 10 }}>Date: {date}</Text>
        <Text style={{ marginBottom: 10 }}>Tax: ${tax}</Text>
        <Text style={{ marginBottom: 10 }}>Categories: {categories}</Text>
      </ScrollView>

      <Button title="Go Back Home" onPress={() => router.push('/')} />
    </View>
  );
}

/* import { View, Text, Button } from 'react-native';
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
 */