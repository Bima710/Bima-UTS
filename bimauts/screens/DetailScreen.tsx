import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';

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
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Transaction Detail</Title>
          <Paragraph>Merchant Name</Paragraph>
          <Paragraph>Merchant Address Line 1</Paragraph>
          <Paragraph>Merchant Address Line 2</Paragraph>
          <View style={styles.transactionDetail}>
            <Text>TERMINAL: REFUND</Text>
            <Text>MERCHANT: 00005000014972</Text>
            <Text>TRANSACTION TYPE: {transaction.type}</Text>
            <Text>NOMINAL: {transaction.amount}</Text>
            <Text>ID/NUMBER: 1234567890</Text>
            <Text>TOTAL: Rp 75,000</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  transactionDetail: {
    marginTop: 10,
  },
});

export default DetailScreen;
