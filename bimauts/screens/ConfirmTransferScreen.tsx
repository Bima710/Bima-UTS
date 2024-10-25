import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  ConfirmTransfer: { transaction: any };
  Pin: { transaction: any };
};

type ConfirmTransferScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmTransfer'>;
type ConfirmTransferScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmTransfer'>;

type Props = {
  route: ConfirmTransferScreenRouteProp;
  navigation: ConfirmTransferScreenNavigationProp;
};

const ConfirmTransferScreen: React.FC<Props> = ({ route, navigation }) => {
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
        <Appbar.Content title="Confirm Transfer" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Confirm Transfer</Title>
          <Paragraph>Bank: {transaction.selectedBank}</Paragraph>
          <Paragraph>Account Number: {transaction.accountNumber}</Paragraph>
          <Paragraph>Amount: Rp {transaction.amount}</Paragraph>
          <Paragraph>Notes: {transaction.notes}</Paragraph>
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

export default ConfirmTransferScreen;
