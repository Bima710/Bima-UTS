// screens/HistoryScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function HistoryScreen({ route }) {
  const { transaction } = route.params;

  return (
    <View>
      <Text>Transaction History</Text>
      {transaction && (
        <View>
          <Text>Type: {transaction.type}</Text>
          <Text>Number: {transaction.number}</Text>
          <Text>Status: {transaction.status}</Text>
        </View>
      )}
    </View>
  );
}
