import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tabs = () => (
  <View style={styles.tabs}>
    <Text style={styles.tab}>Beranda</Text>
    <Text style={styles.tab}>History</Text>
  </View>
);

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tabs;
