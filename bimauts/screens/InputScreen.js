// screens/InputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';

export default function InputScreen({ route, navigation }) {
  const { type } = route.params;
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('50000');

  const handleTransaction = () => {
    if (validateInput()) {
      navigation.navigate('Confirmation', { type, number, amount });
    }
  };

  const validateInput = () => {
    let isValid = false;
    switch (type) {
      case 'Pulsa':
        isValid = validatePhoneNumber(number);
        break;
      case 'Token Listrik':
        isValid = validatePLNNumber(number);
        break;
      case 'BPJS':
        isValid = validateBPJSNumber(number);
        break;
      default:
        isValid = false;
    }
    if (!isValid) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
    }
    return isValid;
  };

  const validatePhoneNumber = (num) => {
    const phoneRegex = /^08[0-9]{11,12}$/;
    const validPrefixes = ['081', '082', '083', '085', '087', '088'];
    return phoneRegex.test(num) && validPrefixes.includes(num.substring(0, 3));
  };

  const validatePLNNumber = (num) => {
    const plnRegex = /^[1-9][0-9]{11}$/;
    return plnRegex.test(num);
  };

  const validateBPJSNumber = (num) => {
    const bpjsRegex = /^0[0-9]{12}$/;
    return bpjsRegex.test(num);
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'Pulsa':
        return 'Masukkan Nomor Telepon';
      case 'Token Listrik':
        return 'Masukkan ID Pelanggan';
      case 'BPJS':
        return 'Masukkan Nomor BPJS';
      default:
        return 'Masukkan Nomor';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{type} Transaction</Text>
      <TextInput
        style={styles.input}
        placeholder={getPlaceholder()}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      {type === 'BPJS' && (
        <Picker
          selectedValue={amount}
          style={styles.picker}
          onValueChange={(itemValue) => setAmount(itemValue)}
        >
          <Picker.Item label="Rp50.000" value="50000" />
          <Picker.Item label="Rp100.000" value="100000" />
          <Picker.Item label="Rp150.000" value="150000" />
          <Picker.Item label="Rp200.000" value="200000" />
        </Picker>
      )}
      <Button title="Submit" onPress={handleTransaction} />
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});
