import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  History: { newTransaction: any };
  Detail: { transaction: any };
};

type HistoryScreenRouteProp = RouteProp<RootStackParamList, 'History'>;
type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

type Props = {
  route: HistoryScreenRouteProp;
  navigation: HistoryScreenNavigationProp;
};

const HistoryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { newTransaction } = route.params || { newTransaction: null };
  const [transactions, setTransactions] = useState(newTransaction ? [newTransaction] : []);

  return (
    <View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View>
            <Text>Jenis: {item.type}</Text>
            <Text>Nomor: {item.number}</Text>
            <Text>Nominal: {item.amount}</Text>
            <Text>Tanggal: {item.date}</Text>
            <Button
              title="Detail"
              onPress={() => navigation.navigate('Detail', { transaction: item })}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HistoryScreen;
