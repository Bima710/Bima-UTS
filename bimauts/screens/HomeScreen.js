// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All-U-Need</Text>
      <View style={styles.buttonContainer}>
        <Button title="Pulsa" onPress={() => navigation.navigate('Input', { type: 'Pulsa' })} />
        <Button title="Token Listrik" onPress={() => navigation.navigate('Input', { type: 'Token Listrik' })} />
        <Button title="BPJS" onPress={() => navigation.navigate('Input', { type: 'BPJS' })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});
