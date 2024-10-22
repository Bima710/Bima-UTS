// screens/TransactionDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TransactionDetailScreen({ route }) {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detail Transaksi</Text>
      <Text style={styles.label}>ID Transaksi: {transaction.id}</Text>
      <Text style={styles.label}>Tipe: {transaction.type}</Text>
      <Text style={styles.label}>Nominal: Rp {transaction.amount}</Text>
      <Text style={styles.label}>Status: {transaction.status}</Text>
      <Text style={styles.label}>Tanggal: {transaction.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
