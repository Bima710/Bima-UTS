// screens/PinScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function PinScreen({ route, navigation }) {
  const { type, number, amount } = route.params;
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handlePinSubmit = () => {
    if (validatePin(pin)) {
      navigation.navigate('Result', { status: 'Success', amount, number });
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 3) {
        Alert.alert('Transaction Failed', 'You have exceeded the maximum number of attempts.');
        navigation.navigate('Result', { status: 'Failed', amount, number });
      } else {
        Alert.alert('Invalid PIN', 'Please try again.');
      }
    }
  };

  const validatePin = (inputPin) => {
    const birthDateRegex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{2}$/;
    return !birthDateRegex.test(inputPin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Masukkan PIN Anda</Text>
      <TextInput
        style={[styles.input, attempts > 0 && { borderColor: 'red' }]}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        secureTextEntry
      />
      <Button title="Submit" onPress={handlePinSubmit} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
