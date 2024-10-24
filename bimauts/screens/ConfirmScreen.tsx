import React from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  Confirm: { transaction: any };
  History: { newTransaction: any };
  Detail: { transaction: any };
  Pin: { transaction: any };
};

type ConfirmScreenRouteProp = RouteProp<RootStackParamList, 'Confirm'>;
type ConfirmScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirm'>;

type Props = {
  route: ConfirmScreenRouteProp;
  navigation: ConfirmScreenNavigationProp;
};

const ConfirmScreen: React.FC<Props> = ({ route, navigation }) => {
  const { transaction } = route.params;
  return (
    <View>
      <Text>Nomor: {transaction.number}</Text>
      <Text>Nominal: {transaction.amount}</Text>
      {transaction.operator && <Text>Operator: {transaction.operator}</Text>}
      <Button title="Konfirmasi Pembayaran" onPress={() => navigation.navigate('Pin', { transaction })} />
    </View>
  );
};

export default ConfirmScreen;
