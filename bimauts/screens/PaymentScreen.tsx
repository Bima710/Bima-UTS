import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  Confirm: { transaction: any };
  History: { newTransaction: any };
  Detail: { transaction: any };
  Pin: { transaction: any };
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type Props = {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
};

const bpjsNominals = [
  { label: 'Rp50,000', value: '50000' },
  { label: 'Rp100,000', value: '100000' },
  { label: 'Rp150,000', value: '150000' },
  { label: 'Rp200,000', value: '200000' },
];

const PaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const [number, setNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('50000'); // Default value
  const [transactions, setTransactions] = useState<any[]>([]);

  const validateNumber = (num: string) => {
    if (type === 'Pulsa') {
      return /^08[0-9]{11,12}$/.test(num);
    } else if (type === 'Token Listrik') {
      return /^[1-9][0-9]{11}$/.test(num);
    } else if (type === 'BPJS') {
      return /^0[0-9]{12}$/.test(num);
    }
    return false;
  };

  const getOperator = (phoneNumber: string) => {
    const prefix = phoneNumber.substring(0, 4);
    if (['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'].includes(prefix)) {
      return 'Telkomsel';
    } else if (['0814', '0815', '0816', '0855', '0856', '0857', '0858', '0817', '0818', '0819'].includes(prefix)) {
      return 'Indosat';
    } else if (['0817', '0818', '0819', '0859', '0877', '0878'].includes(prefix)) {
      return 'XL';
    } else if (['0896', '0897', '0898', '0899'].includes(prefix)) {
      return 'Three';
    } else if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix)) {
      return 'Smartfren';
    }
    return 'Unknown';
  };

  const handlePayment = () => {
    if (!validateNumber(number)) {
      Alert.alert('Error', 'Nomor tidak valid.');
      return;
    }
    const operator = type === 'Pulsa' ? getOperator(number) : null;
    const newTransaction = { type, number, amount, date: new Date().toLocaleString(), operator };
    setTransactions([...transactions, newTransaction]);
    navigation.navigate('Confirm', { transaction: newTransaction });
  };

  return (
    <View style={styles.container}>
      <Text>Pembayaran: {type}</Text>
      <TextInput
        placeholder={type === 'Pulsa' ? 'Nomor Telepon' : type === 'Token Listrik' ? 'ID Pelanggan' : 'Nomor BPJS'}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
        style={styles.input}
      />
      {type === 'BPJS' && (
        <View>
          <Text>Pilih Nominal:</Text>
          <RadioButton.Group onValueChange={value => setAmount(value)} value={amount}>
            {bpjsNominals.map(nominal => (
              <View key={nominal.value} style={styles.radio}>
                <RadioButton value={nominal.value} />
                <Text>{nominal.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>
      )}
      <Button title="Bayar" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});

export default PaymentScreen;
