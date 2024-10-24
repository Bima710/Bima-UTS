import React from 'react';
import { View, Alert } from 'react-native';
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
  const { type, phoneNumber, selectedNominal, operator, paymentMethod } = transaction;

  const saveTransaction = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
      transactions.push(transaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      navigation.navigate('Pin', { transaction });
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Appbar.Header>
        <Appbar.Content title="Konfirmasi Pembayaran" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={globalStyles.content}>
        <Card style={globalStyles.card}>
          <Card.Content>
            <Title style={globalStyles.title}>Konfirmasi Pembayaran</Title>
            <Paragraph>Jenis: {type}</Paragraph>
            <Paragraph>Nomor: {phoneNumber}</Paragraph>
            <Paragraph>Operator: {operator}</Paragraph>
            <Paragraph>Nominal: Rp {selectedNominal}</Paragraph>
            <Paragraph>Metode Pembayaran: {paymentMethod}</Paragraph>
            <Paragraph>Biaya Transaksi: Rp 0</Paragraph>
            <Paragraph>Total Pembayaran: Rp {selectedNominal}</Paragraph>
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
