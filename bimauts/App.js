import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PaymentScreenPulsa from './screens/PaymentScreenPulsa';
import PaymentScreenBPJS from './screens/PaymentScreenBPJS';
import PaymentScreenListrik from './screens/PaymentScreenListrik';
import ConfirmScreen from './screens/ConfirmScreen';
import HistoryScreen from './screens/HistoryScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PaymentPulsa" component={PaymentScreenPulsa} />
        <Stack.Screen name="PaymentBPJS" component={PaymentScreenBPJS} />
        <Stack.Screen name="PaymentListrik" component={PaymentScreenListrik} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
