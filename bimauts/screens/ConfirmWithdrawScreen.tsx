import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type ConfirmWithdrawScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmWithdraw'>;
type ConfirmWithdrawScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmWithdraw'>;

type Props = {
  route: ConfirmWithdrawScreenRouteProp;
  navigation: ConfirmWithdrawScreenNavigationProp;
};

const ConfirmWithdrawScreen: React.FC<Props> = ({ route, navigation }) => {
  const { transaction } = route.params;

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
        <Appbar.Content title="Confirm Withdrawal" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Confirm Withdrawal</Title>
          <Paragraph>Location: {transaction.selectedLocation}</Paragraph>
          <Paragraph>Amount: Rp {transaction.amount.toLocaleString()}</Paragraph>
          {transaction.token && <Paragraph>Token: {transaction.token}</Paragraph>}
          <Button mode="contained" onPress={saveTransaction}>
            Confirm
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
});

export default ConfirmWithdrawScreen;
