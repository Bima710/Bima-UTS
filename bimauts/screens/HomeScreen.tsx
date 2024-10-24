import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Tabs from './Tabs';
import PromoBanner from './PromoBanner';
import BottomNav from './BottomNav';

const HomeScreen = () => (
  <View style={styles.container}>
    <Header />
    <Tabs />
    <PromoBanner />
    <BottomNav />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default HomeScreen;
