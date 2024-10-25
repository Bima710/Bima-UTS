import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { globalStyles } from './styles';

type RootStackParamList = {
  Detail: { transaction: any };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { transaction } = route.params;
  const totalHarga = transaction.selectedNominal ? parseInt(transaction.selectedNominal).toLocaleString() : '0';

  return (
    <View style={globalStyles.container}>
      <Card style={globalStyles.card}>
        <Card.Content>
          <Title style={globalStyles.title}>Transaction Detail</Title>
          <Paragraph>Transaction type: {transaction.type}</Paragraph>
          <Paragraph>ID/Number: {transaction.phoneNumber || transaction.customerID || transaction.bpjsNumber}</Paragraph>
          <Paragraph>Total harga: Rp {totalHarga}</Paragraph>
          {transaction.token && <Paragraph>Token: {transaction.token}</Paragraph>}
        </Card.Content>
      </Card>
    </View>
  );
};

export default DetailScreen;
