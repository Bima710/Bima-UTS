import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PaymentScreenPulsa from './screens/PaymentScreenPulsa';
import PaymentScreenBPJS from './screens/PaymentScreenBPJS';
import PaymentScreenListrik from './screens/PaymentScreenListrik';
import ConfirmationScreen from './screens/ConfirmationScreen';
import HistoryScreen from './screens/HistoryScreen';
import DetailScreen from './screens/DetailScreen';
import PinScreen from './screens/PinScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import QRISScreen from './screens/QRISScreen';
import TransferScreen from './screens/TransferScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import MoreScreen from './screens/MoreScreen';
import ConfirmTransferScreen from './screens/ConfirmTransferScreen';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PaymentPulsa" component={PaymentScreenPulsa} />
          <Stack.Screen name="PaymentBPJS" component={PaymentScreenBPJS} />
          <Stack.Screen name="PaymentListrik" component={PaymentScreenListrik} />
          <Stack.Screen name="Confirm" component={ConfirmationScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Pin" component={PinScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="QRIS" component={QRISScreen} />
          <Stack.Screen name="Transfer" component={TransferScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawScreen} />
          <Stack.Screen name="More" component={MoreScreen} />
          <Stack.Screen name="ConfirmTransfer" component={ConfirmTransferScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
