import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Card } from 'react-native-paper';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Notifications" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>No new notifications</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
  },
});

export default NotificationScreen;
