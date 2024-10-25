import React, { useState, useEffect } from 'react';
import { View, FlatList, Animated } from 'react-native';
import { Text, Card, Button, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Adjust the import path as necessary

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

interface Transaction {
  id: string | number;
  type: string;
  phoneNumber?: string;
  customerID?: string;
  bpjsNumber?: string;
  selectedNominal: string;
  token?: string;
}

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const animatedValue = new Animated.Value(0);

  const loadTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions).map((transaction: Transaction, index: number) => ({
          ...transaction,
          id: transaction.id ? transaction.id : index.toString()
        }));
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      console.error('Failed to load transactions', error);
    } finally {
      setLoading(false);
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
    <Animated.View style={{ opacity: animatedValue }}>
      <Card style={globalStyles.card}>
        <Card.Content>
          <Text>Jenis: {item.type || 'N/A'}</Text>
          <Text>Nomor: {item.phoneNumber || item.customerID || item.bpjsNumber || 'N/A'}</Text>
          <Text>Nominal: Rp {item.selectedNominal ? parseInt(item.selectedNominal).toLocaleString() : '0'}</Text>
          <Button onPress={() => navigation.navigate('Detail', { transaction: item })}>Detail</Button>
          <Button onPress={() => deleteTransaction(item.id)} color="red" style={globalStyles.deleteButton}>Delete</Button>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [transactions]);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Tidak ada Data Transaksi</Text>
            <Image source={{ uri: 'https://path/to/not_found_image.png' }} style={{ width: 200, height: 200 }} />
          </View>
        }
      />
      <Appbar style={globalStyles.bottom}>
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} />
        <Appbar.Action icon="history" onPress={() => navigation.navigate('History')} />
        <Appbar.Action icon="qrcode-scan" onPress={() => navigation.navigate('QRIS')} />
        <Appbar.Action icon="bell" onPress={() => navigation.navigate('Notifications')} />
        <Appbar.Action icon="account" onPress={() => navigation.navigate('Profile')} />
      </Appbar>
    </View>
  );
};

export default HistoryScreen;
