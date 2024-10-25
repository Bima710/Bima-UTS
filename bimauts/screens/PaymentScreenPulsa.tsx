import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Text, RadioButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from './styles';

type RootStackParamList = {
  Home: undefined;
  PaymentPulsa: { type: string };
  Confirm: { transaction: any };
};

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentPulsa'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentPulsa'>;

type Props = {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
};

const pulsaNominals = [
  { label: 'Rp10,000 (Pulsa)', value: '10000', type: 'Pulsa' },
  { label: 'Rp25,000 (Pulsa)', value: '25000', type: 'Pulsa' },
  { label: 'Rp50,000 (Pulsa)', value: '50000', type: 'Pulsa' },
  { label: 'Rp75,000 (Pulsa)', value: '75000', type: 'Pulsa' },
  { label: 'Rp10,000 (Data - 1GB, 7 Days)', value: '10000', type: 'Data', quota: '1GB', duration: '7 Days' },
  { label: 'Rp25,000 (Data - 2GB, 14 Days)', value: '25000', type: 'Data', quota: '2GB', duration: '14 Days' },
  { label: 'Rp50,000 (Data - 5GB, 30 Days)', value: '50000', type: 'Data', quota: '5GB', duration: '30 Days' },
  { label: 'Rp75,000 (Data - 10GB, 30 Days)', value: '75000', type: 'Data', quota: '10GB', duration: '30 Days' },
];

const PaymentScreenPulsa: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [selectedNominal, setSelectedNominal] = useState<string>('10000');
  const [isDataOption, setIsDataOption] = useState<boolean>(false);

  const validatePhoneNumber = (num: string) => {
    const isValid = /^08[0-9]{9,12}$/.test(num);
    setIsPhoneNumberValid(isValid);
    if (!isValid) {
      Alert.alert('Error', 'Nomor tidak valid. Harus dimulai dengan 08 dan maksimal 13 digit.');
    }
  };

  const operator = "Telkomsel"; // Placeholder for operator logic
  const paymentMethod = "Dummy Payment Method"; // Placeholder for payment method logic

  return (
    <View style={globalStyles.container}>
      <Appbar.Header>
        <Appbar.Content title="Pulsa & Paket Data" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={globalStyles.content}>
        <Card style={globalStyles.card}>
          <Card.Content>
            <Title style={globalStyles.title}>Pulsa & Paket Data</Title>
            <Text style={globalStyles.label}>Nomor Ponsel</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Contoh: 082370323318"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              onBlur={() => validatePhoneNumber(phoneNumber)}
              keyboardType="numeric"
            />
            <View style={globalStyles.buttonGroup}>
              <Button mode={!isDataOption ? 'contained' : 'outlined'} onPress={() => setIsDataOption(false)} style={globalStyles.button}>
                Isi Pulsa
              </Button>
              <Button mode={isDataOption ? 'contained' : 'outlined'} onPress={() => setIsDataOption(true)} style={globalStyles.button}>
                Paket Data
              </Button>
            </View>
            {isPhoneNumberValid && (
              <View>
                <Text>Pilih Nominal:</Text>
                <RadioButton.Group onValueChange={value => setSelectedNominal(value)} value={selectedNominal}>
                  {pulsaNominals
                    .filter(nominal => (isDataOption ? nominal.type === 'Data' : nominal.type === 'Pulsa'))
                    .map(nominal => (
                      <View key={nominal.value} style={globalStyles.radio}>
                        <RadioButton value={nominal.value} />
                        <Text>{nominal.label}</Text>
                      </View>
                    ))}
                </RadioButton.Group>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Confirm', { transaction: { type, phoneNumber, selectedNominal, operator, paymentMethod } })}
                >
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

export default PaymentScreenPulsa;