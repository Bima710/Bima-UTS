import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from './styles';

type RootStackParamList = {
  Home: undefined;
  PaymentPulsa: { type: string };
  PaymentBPJS: { type: string };
  PaymentListrik: { type: string };
  History: undefined;
  Detail: { transaction: any };
  Profile: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const banners = [
  { src: "https://cdn.cloudflare.steamstatic.com//steam/apps/1156380/header_292x136.jpg", alt: "Special Offer Sale up to 80% off" },
  { src: "https://cdn.cloudflare.steamstatic.com//steam/apps/8930/header_292x136.jpg", alt: "New Arrivals" },
  { src: "https://cdn.cloudflare.steamstatic.com//steam/apps/413150/header_292x136.jpg", alt: "Limited Time Offer" },
  { src: "https://placehold.co/300x150", alt: "Buy One Get One Free" },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [balance, setBalance] = useState<number>(1000000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    const loadBalance = async () => {
      const storedBalance = await AsyncStorage.getItem('balance');
      if (storedBalance) {
        setBalance(JSON.parse(storedBalance));
      }
    };

    loadBalance();

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={globalStyles.container}>
      <Appbar.Header>
        <Appbar.Content title="All-U-Need" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={globalStyles.content}>
        <Card style={globalStyles.card}>
          <Card.Content>
            <Title>Hallo Bima</Title>
            <Paragraph>2024</Paragraph>
            <Title>Saldo: Rp {balance.toFixed(2)}</Title>
            <View style={globalStyles.buttonGroup}>
              <Button icon="swap-horizontal" mode="contained" onPress={() => {}}>
                Transfer
              </Button>
              <Button icon="cash" mode="contained" onPress={() => {}}>
                Tarik Tunai
              </Button>
              <Button icon="dots-horizontal" mode="contained" onPress={() => {}}>
                More
              </Button>
            </View>
          </Card.Content>
        </Card>
        <View style={globalStyles.transactionButtons}>
          <Button icon="cellphone" mode="contained" onPress={() => navigation.navigate('PaymentPulsa', { type: 'Pulsa' })}>
            Pulsa/Data
          </Button>
          <Button icon="flash" mode="contained" onPress={() => navigation.navigate('PaymentListrik', { type: 'Token Listrik' })}>
            Listrik
          </Button>
          <Button icon="shield" mode="contained" onPress={() => navigation.navigate('PaymentBPJS', { type: 'BPJS' })}>
            BPJS
          </Button>
        </View>
        <Card style={globalStyles.bannerCard}>
          <Card.Cover style={{ width: 300, height: 150 }} source={{ uri: banners[currentBanner].src }} />
        </Card>
        <View style={globalStyles.sliderButtons}>
          {banners.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setCurrentBanner(index)} style={globalStyles.sliderButton}>
              <View style={[globalStyles.dot, currentBanner === index && globalStyles.activeDot]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Appbar style={globalStyles.bottom}>
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} />
        <Appbar.Action icon="history" onPress={() => navigation.navigate('History')} />
        <Appbar.Action icon="wallet" onPress={() => navigation.navigate('PaymentPulsa', { type: 'Default' })} />
        <Appbar.Action icon="bell" onPress={() => {}} />
        <Appbar.Action icon="account" onPress={() => navigation.navigate('Profile')} />
      </Appbar>
    </View>
  );
};

export default HomeScreen;
