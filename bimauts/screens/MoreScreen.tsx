import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button } from 'react-native-paper';

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="More Options" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>More Options</Title>
          <Paragraph>Explore additional features here.</Paragraph>
          {/* Add more options as needed */}
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
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default MoreScreen;
