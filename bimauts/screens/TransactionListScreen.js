// screens/TransactionListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const transactions = [
  { id: '1', type: 'Pulsa', amount: '6500', status: 'Success', date: '04 Mei 2023, 12:49 PM' },
  { id: '2', type: 'Pulsa', amount: '10000', status: 'Failed', date: '05 Mei 2023, 10:30 AM' },
];

export default function TransactionListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: item.status === 'Success' ? 'green' : 'red' }]}
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
    >
      <Text style={styles.text}>{item.type} - Rp {item.amount}</Text>
      <Text style={styles.text}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada transaksi</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
