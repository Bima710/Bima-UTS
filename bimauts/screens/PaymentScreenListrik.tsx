import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Text, RadioButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  Confirm: { transaction: any };
  History: { newTransaction: any };
  Detail: { transaction: any };
  Pin: { transaction: any };
};

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

type Props = {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
};

const listrikNominals = [
  { label: 'Rp20,000', value: '20000' },
  { label: 'Rp50,000', value: '50000' },
  { label: 'Rp100,000', value: '100000' },
  { label: 'Rp200,000', value: '200000' },
];

const PaymentScreenListrik: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const [customerID, setCustomerID] = useState<string>('');
  const [isIDValid, setIsIDValid] = useState<boolean>(false);
  const [selectedNominal, setSelectedNominal] = useState<string>('20000');

  const validateCustomerID = (id: string) => {
    const isValid = /^[1-9][0-9]{11}$/.test(id);
    setIsIDValid(isValid);
    if (!isValid) {
      Alert.alert('Error', 'ID Pelanggan tidak valid.');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Token Listrik" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Token Listrik</Title>
            <Text style={styles.label}>ID Pelanggan</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 123456789012"
              value={customerID}
              onChangeText={(text) => setCustomerID(text)}
              onBlur={() => validateCustomerID(customerID)}
              keyboardType="numeric"
            />
            <View style={styles.infoBox}>
              <Paragraph>Isi ID Pelanggan yang valid untuk menampilkan menu pembelian.</Paragraph>
            </View>
            {isIDValid && (
              <View>
                <Text>Pilih Nominal:</Text>
                <RadioButton.Group onValueChange={value => setSelectedNominal(value)} value={selectedNominal}>
                  {listrikNominals.map(nominal => (
                    <View key={nominal.value} style={styles.radio}>
                      <RadioButton value={nominal.value} />
                      <Text>{nominal.label}</Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <Button mode="contained" onPress={() => navigation.navigate('Confirm', { transaction: { customerID, selectedNominal } })}>
                  Bayar
                </Button>
              </View>
            )}
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
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 4,
  },
});

export default PaymentScreenListrik;
