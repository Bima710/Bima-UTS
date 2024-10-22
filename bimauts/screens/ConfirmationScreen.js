// screens/ConfirmationScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ConfirmationScreen({ route, navigation }) {
  const { type, number, amount } = route.params;

  const getOperator = (num) => {
    const prefix = num.substring(0, 4);
    switch (prefix) {
      case '0811':
      case '0812':
      case '0813':
        return 'Telkomsel';
      case '0814':
      case '0815':
      case '0816':
        return 'Indosat';
      case '0817':
      case '0818':
      case '0819':
        return 'XL';
      default:
        return 'Unknown Operator';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Konfirmasi Pembayaran</Text>
      <Text style={styles.label}>Nomor: {number}</Text>
      {type === 'Pulsa' && <Text style={styles.label}>Operator: {getOperator(number)}</Text>}
      <Text style={styles.label}>Nominal: Rp {amount}</Text>
      <Button title="Konfirmasi" onPress={() => navigation.navigate('Pin', { type, number, amount })} />
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
