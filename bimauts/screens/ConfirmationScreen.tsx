import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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
  const { type, phoneNumber, selectedNominal } = transaction;

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
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Konfirmasi Pembayaran" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Konfirmasi Pembayaran</Title>
            <Paragraph>Jenis: {type}</Paragraph>
            <Paragraph>Nomor: {phoneNumber}</Paragraph>
            <Paragraph>Nominal: {selectedNominal}</Paragraph>
            <Button mode="contained" onPress={saveTransaction}>
              Konfirmasi
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ConfirmationScreen;
