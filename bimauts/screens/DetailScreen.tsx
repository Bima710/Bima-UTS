import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  History: { newTransaction: any };
  Detail: { transaction: any };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { transaction } = route.params;
  return (
    <View>
      <Text>Jenis: {transaction.type}</Text>
      <Text>Nominal: {transaction.amount}</Text>
      <Text>Tanggal: {transaction.date}</Text>
    </View>
  );
};

export default DetailScreen;
