import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNav = () => (
  <View style={styles.nav}>
    <Ionicons name="md-home" size={24} color="black" />
    <Ionicons name="md-list" size={24} color="black" />
    <Ionicons name="md-notifications" size={24} color="black" />
    <Ionicons name="md-chatbubbles" size={24} color="black" />
    <Ionicons name="md-person" size={24} color="black" />
  </View>
);

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});

export default BottomNav;
