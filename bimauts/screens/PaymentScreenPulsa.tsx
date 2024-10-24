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

const pulsaOptions = [
  { amount: '10,000', price: 'Rp10,000' },
  { amount: '20,000', price: 'Rp20,000' },
  { amount: '50,000', price: 'Rp50,000' },
];

const dataOptions = [
  { data: '1GB', price: 'Rp10,000', validity: '7 days' },
  { data: '5GB', price: 'Rp50,000', validity: '30 days' },
  { data: '10GB', price: 'Rp90,000', validity: '30 days' },
];

const validatePhoneNumber = (phone: string) => {
  return /^08[0-9]{10,12}$/.test(phone) && [
    '0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851',
    '0814', '0815', '0816', '0855', '0856', '0857', '0858', '0817', '0818',
    '0819', '0859', '0877', '0878', '0896', '0897', '0898', '0899', '0881',
    '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'
  ].includes(phone.substring(0, 4));
};

const PaymentScreenPulsa: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('pulsa');
  const [selectedNominal, setSelectedNominal] = useState<string>('');

  const handlePhoneBlur = () => {
    const isValid = validatePhoneNumber(phoneNumber);
    setIsPhoneValid(isValid);
    if (!isValid) {
      Alert.alert('Error', 'Nomor telepon tidak valid.');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Pulsa & Paket Data" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Pulsa & Paket Data</Title>
            <Text style={styles.label}>Nomor Ponsel</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh : 082370323318"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              onBlur={handlePhoneBlur}
              keyboardType="numeric"
            />
            <View style={styles.buttonGroup}>
              <Button
                mode={selectedOption === 'pulsa' ? 'contained' : 'outlined'}
                onPress={() => setSelectedOption('pulsa')}
                style={styles.button}
              >
                Isi Pulsa
              </Button>
              <Button
                mode={selectedOption === 'data' ? 'contained' : 'outlined'}
                onPress={() => setSelectedOption('data')}
                style={styles.button}
              >
                Paket Data
              </Button>
            </View>
            {isPhoneValid && (
              <View>
                {selectedOption === 'pulsa' ? (
                  <RadioButton.Group onValueChange={value => setSelectedNominal(value)} value={selectedNominal}>
                    {pulsaOptions.map(option => (
                      <View key={option.amount} style={styles.radio}>
                        <RadioButton value={`${option.amount},${option.price}`} />
                        <Text>{`${option.amount} - ${option.price}`}</Text>
                      </View>
                    ))}
                  </RadioButton.Group>
                ) : (
                  <RadioButton.Group onValueChange={value => setSelectedNominal(value)} value={selectedNominal}>
                    {dataOptions.map(option => (
                      <View key={option.data} style={styles.radio}>
                        <RadioButton value={`${option.data},${option.price},${option.validity}`} />
                        <Text>{`${option.data} - ${option.price} - ${option.validity}`}</Text>
                      </View>
                    ))}
                  </RadioButton.Group>
                )}
                <Button mode="contained" onPress={() => navigation.navigate('Confirm', { transaction: { type, phoneNumber, selectedOption, selectedNominal } })}>
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
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
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

export default PaymentScreenPulsa;
