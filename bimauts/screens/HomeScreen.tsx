import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Payment: { type: string };
  History: undefined;
  Detail: { transaction: any };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const banners = [
  { src: "https://cdn.cloudflare.steamstatic.com//steam/apps/1156380/header_292x136.jpg", alt: "Special Offer Sale up to 80% off" },
  { src: "https://cdn.cloudflare.steamstatic.com//steam/apps/8930/header_292x136.jpg", alt: "New Arrivals" },
  { src: "https://cdn.cloudflare.steamstatic.com//steam/apps/413150/header_292x136.jpg", alt: "Limited Time Offer" },
  { src: "https://placehold.co/300x150", alt: "Buy One Get One Free" }
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="All-U-Need" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Hallo Bima</Title>
            <Paragraph>2024</Paragraph>
            <View style={styles.buttonGroup}>
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
        <View style={styles.transactionButtons}>
          <Button icon="cellphone" mode="contained" onPress={() => navigation.navigate('Payment', { type: 'Pulsa' })}>
            Pulsa/Data
          </Button>
          <Button icon="flash" mode="contained" onPress={() => navigation.navigate('Payment', { type: 'Token Listrik' })}>
            Listrik
          </Button>
          <Button icon="shield" mode="contained" onPress={() => navigation.navigate('Payment', { type: 'BPJS' })}>
            BPJS
          </Button>
        </View>
        <Card style={styles.bannerCard}>
          <Card.Cover source={{ uri: banners[currentBanner].src }} />
        </Card>
        <View style={styles.sliderButtons}>
          {banners.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setCurrentBanner(index)} style={styles.sliderButton}>
              <View style={[styles.dot, currentBanner === index && styles.activeDot]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} />
        <Appbar.Action icon="history" onPress={() => navigation.navigate('History')} />
        <Appbar.Action icon="wallet" onPress={() => navigation.navigate('Payment')} />
        <Appbar.Action icon="bell" onPress={() => {}} />
        <Appbar.Action icon="account" onPress={() => {}} />
      </Appbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  bannerCard: {
    marginBottom: 8,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sliderButton: {
    marginHorizontal: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#000',
  },
  card: {
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
