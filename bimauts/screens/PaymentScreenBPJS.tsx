import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Text, RadioButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from './styles';

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

const bpjsNominals = [
  { label: 'Rp50,000 (1 Bulan)', value: '50000', months: 1 },
  { label: 'Rp100,000 (2 Bulan)', value: '100000', months: 2 },
  { label: 'Rp150,000 (3 Bulan)', value: '150000', months: 3 },
  { label: 'Rp200,000 (4 Bulan)', value: '200000', months: 4 },
  // Add more if needed
];

const PaymentScreenBPJS: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const [bpjsNumber, setBpjsNumber] = useState<string>('');
  const [isIDValid, setIsIDValid] = useState<boolean>(false);
  const [selectedNominal, setSelectedNominal] = useState<string>('50000');

  const validateBpjsNumber = (id: string) => {
    const isValid = /^0[0-9]{12}$/.test(id);
    setIsIDValid(isValid);
    if (!isValid) {
      Alert.alert('Error', 'Nomor BPJS tidak valid.');
    }
  };

  const handleNavigateToConfirmation = () => {
    const selectedMonths = bpjsNominals.find(nominal => nominal.value === selectedNominal)?.months || 1;
    navigation.navigate('Confirm', { transaction: { type, bpjsNumber, selectedNominal, selectedMonths } });
  };

  return (
    <View style={globalStyles.container}>
      <Appbar.Header>
        <Appbar.Content title="Pembayaran BPJS" />
      </Appbar.Header>
      <View style={globalStyles.content}>
        <Card style={globalStyles.card}>
          <Card.Content>
            <Title style={globalStyles.title}>Pembayaran BPJS</Title>
            <Text style={globalStyles.label}>Nomor BPJS</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Contoh: 0001122334455"
              value={bpjsNumber}
              onChangeText={(text) => setBpjsNumber(text)}
              onBlur={() => validateBpjsNumber(bpjsNumber)}
              keyboardType="numeric"
            />
            <View style={globalStyles.infoBox}>
              <Paragraph>Isi Nomor BPJS yang valid untuk menampilkan menu pembelian.</Paragraph>
            </View>
            {isIDValid && (
              <View>
                <Text>Pilih Nominal:</Text>
                <RadioButton.Group onValueChange={value => setSelectedNominal(value)} value={selectedNominal}>
                  {bpjsNominals.map(nominal => (
                    <View key={nominal.value} style={globalStyles.radio}>
                      <RadioButton value={nominal.value} />
                      <Text>{nominal.label}</Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <Button mode="contained" onPress={handleNavigateToConfirmation}>
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

export default PaymentScreenBPJS;
