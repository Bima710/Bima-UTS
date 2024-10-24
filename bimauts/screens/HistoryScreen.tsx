import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './styles';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

const HistoryScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  interface Transaction {
    id: string | number;
    type: string;
    phoneNumber?: string;
    customerID?: string;
    bpjsNumber?: string;
    selectedNominal: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error('Failed to load transactions', error);
    }
  };

  const deleteTransaction = async (id: string | number) => {
    try {
      const updatedTransactions = transactions.filter((item) => item.id !== id);
      setTransactions(updatedTransactions);
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    } catch (error) {
      console.error('Failed to delete transaction', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadTransactions);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: Transaction }) => (
    <Card style={globalStyles.card}>
      <Card.Content>
        <Text>Jenis: {item.type}</Text>
        <Text>Nomor: {item.phoneNumber || item.customerID || item.bpjsNumber}</Text>
        <Text>Nominal: {item.selectedNominal}</Text>
        <Button onPress={() => navigation.navigate('Detail', { transaction: item })}>Detail</Button>
        <Button onPress={() => deleteTransaction(item.id)} color="red">Delete</Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HistoryScreen;
