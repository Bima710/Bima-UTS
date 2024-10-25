import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from './styles';

type RootStackParamList = {
  Home: undefined;
  Confirm: { transaction: any };
  Pin: { transaction: any };
};

type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirm'>;
type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirm'>;

type Props = {
  route: ConfirmationScreenRouteProp;
  navigation: ConfirmationScreenNavigationProp;
};

const ConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { transaction } = route.params;

  const generateRandomToken = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  };

  const saveTransaction = async () => {
    try {
      const token = generateRandomToken();
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
      const newTransaction = { ...transaction, token };
      transactions.push(newTransaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      navigation.navigate('Pin', { transaction: newTransaction });
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Appbar.Header>
        <Appbar.Content title="Konfirmasi Pembayaran" />
      </Appbar.Header>
      <View style={globalStyles.content}>
        <Card style={globalStyles.card}>
          <Card.Content>
            <Title style={globalStyles.title}>Konfirmasi Pembayaran</Title>
            <Paragraph>Transaction type: {transaction.type}</Paragraph>
            <Paragraph>ID/Number: {transaction.customerID}</Paragraph>
            <Paragraph>Total harga: Rp {parseInt(transaction.selectedNominal).toLocaleString()}</Paragraph>
            <Button mode="contained" onPress={saveTransaction}>
              Konfirmasi
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default ConfirmationScreen;
