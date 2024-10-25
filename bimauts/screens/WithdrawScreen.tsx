import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from './styles';

type RootStackParamList = {
  Home: undefined;
  Withdraw: undefined;
  ConfirmWithdraw: { transaction: any };
};

type WithdrawScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Withdraw'>;
type WithdrawScreenRouteProp = RouteProp<RootStackParamList, 'Withdraw'>;

type Props = {
  route: WithdrawScreenRouteProp;
  navigation: WithdrawScreenNavigationProp;
};

const withdrawLocations = [
  { label: 'ATM Bersama', value: 'ATM' },
  { label: 'Minimarket', value: 'Minimarket' },
];

const WithdrawScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState('ATM');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');

  const handleWithdraw = () => {
    if (!amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const transaction = { 
      type: 'Withdraw', 
      selectedLocation, 
      amount, 
      token 
    };

    navigation.navigate('ConfirmWithdraw', { transaction });
  };

  return (
    <View style={globalStyles.container}>
      <Appbar.Header>
        <Appbar.Content title="Withdraw" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={globalStyles.card}>
        <Card.Content>
          <Title style={globalStyles.title}>Withdraw Money</Title>
          <Text style={globalStyles.label}>Withdraw Location</Text>
          <RadioButton.Group onValueChange={value => setSelectedLocation(value)} value={selectedLocation}>
            {withdrawLocations.map(location => (
              <View key={location.value} style={globalStyles.radio}>
                <RadioButton value={location.value} />
                <Text>{location.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
          <Text style={globalStyles.label}>Amount</Text>
          <TextInput
            style={globalStyles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          {selectedLocation === 'Minimarket' && (
            <TextInput
              style={globalStyles.input}
              placeholder="Token"
              value={token}
              onChangeText={setToken}
            />
          )}
          <Button mode="contained" onPress={handleWithdraw}>
            Withdraw
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default WithdrawScreen;
