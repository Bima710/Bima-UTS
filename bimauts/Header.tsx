import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>All-U-Need</Text>
    <View style={styles.icons}>
      <Ionicons name="md-send" size={24} color="black" />
      <Ionicons name="md-wallet" size={24} color="black" />
      <Ionicons name="md-more" size={24} color="black" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});

export default Header;
