// screens/TransactionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function TransactionScreen({ route, navigation }) {
  const { type } = route.params;
  const [number, setNumber] = useState('');

  const handleTransaction = () => {
    // Dummy transaction logic
    navigation.navigate('History', { transaction: { type, number, status: 'Success' } });
  };

  return (
    <View>
      <Text>{type} Transaction</Text>
      <TextInput placeholder="Enter Number" value={number} onChangeText={setNumber} />
      <Button title="Submit" onPress={handleTransaction} />
    </View>
  );
}
