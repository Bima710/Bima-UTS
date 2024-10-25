import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './styles';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  Confirm: { transaction: any };
  Pin: { transaction: any };
  History: { newTransaction: any };
  Detail: { transaction: any };
};

type PinScreenRouteProp = RouteProp<RootStackParamList, 'Pin'>;
type PinScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pin'>;

type Props = {
  route: PinScreenRouteProp;
  navigation: PinScreenNavigationProp;
};

const PinScreen: React.FC<Props> = ({ route, navigation }) => {
  const { transaction } = route.params;
  const [pin, setPin] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const validatePin = (pin: string) => {
    const birthDate = '250495'; // Replace with actual birth date logic
    return pin === birthDate;
  };

  const handlePinSubmit = () => {
    setAttempts(prev => prev + 1);
    if (validatePin(pin)) {
      navigation.navigate('Detail', { transaction });
    } else {
      setError(true);
      if (attempts >= 2) {
        Alert.alert('Error', 'Transaksi gagal.');
        navigation.navigate('History', { newTransaction: { ...transaction, status: 'Gagal' } });
      } else {
        Alert.alert('Error', 'PIN salah. Silahkan coba lagi.');
      }
    }
    setPin('');
  };

  return (
    <View style={globalStyles.container}>
      <Text>Masukkan PIN:</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        style={{ borderColor: error ? 'red' : 'black', borderWidth: 1 }}
      />
      <Button title="Submit" onPress={handlePinSubmit} />
    </View>
  );
};

export default PinScreen;
