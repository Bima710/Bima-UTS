// screens/ResultScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { status, amount, number } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: status === 'Success' ? 'blue' : 'red' }]}>
      <Text style={styles.header}>{status === 'Success' ? 'Pembelian Berhasil!' : 'Transaksi Gagal'}</Text>
      <Text style={styles.label}>Nomor: {number}</Text>
      <Text style={styles.label}>Nominal: Rp {amount}</Text>
      <Button title="Tutup" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});
