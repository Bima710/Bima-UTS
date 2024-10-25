import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Text, RadioButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Transfer: undefined;
  ConfirmTransfer: { transaction: any };
};

type TransferScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Transfer'>;
type TransferScreenRouteProp = RouteProp<RootStackParamList, 'Transfer'>;

type Props = {
  route: TransferScreenRouteProp;
  navigation: TransferScreenNavigationProp;
};

const banks = [
  { label: 'Bank A', value: 'Bank A' },
  { label: 'Bank B', value: 'Bank B' },
  { label: 'Bank C', value: 'Bank C' },
  { label: 'Bank D', value: 'Bank D' },
];

const TransferScreen: React.FC<Props> = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('Bank A');
  const [notes, setNotes] = useState('');

  const handleTransfer = () => {
    if (!accountNumber || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const transaction = { 
      type: 'Transfer', 
      accountNumber, 
      amount, 
      selectedBank, 
      notes 
    };

    navigation.navigate('ConfirmTransfer', { transaction });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Transfer" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Transfer Money</Title>
          <Text style={styles.label}>Bank</Text>
          <RadioButton.Group onValueChange={value => setSelectedBank(value)} value={selectedBank}>
            {banks.map(bank => (
              <View key={bank.value} style={styles.radio}>
                <RadioButton value={bank.value} />
                <Text>{bank.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
          />
          <Button mode="contained" onPress={handleTransfer}>
            Transfer
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});

export default TransferScreen;
