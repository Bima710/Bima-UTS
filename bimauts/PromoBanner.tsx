import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromoBanner = () => (
  <View style={styles.banner}>
    <Text style={styles.offer}>SPECIAL OFFER</Text>
    <Text style={styles.sale}>SALE UPTO 80% OFF</Text>
  </View>
);

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#ffcc00',
    padding: 20,
    alignItems: 'center',
  },
  offer: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sale: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d9534f',
  },
});

export default PromoBanner;
