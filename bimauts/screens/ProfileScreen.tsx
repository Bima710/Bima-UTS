import React from 'react';
import { View, Switch } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { globalStyles } from './styles';

const ProfileScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString();

  return (
    <View style={isDarkMode ? globalStyles.containerDark : globalStyles.containerLight}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={globalStyles.card}>
        <Card.Content>
          <Title style={globalStyles.title}>Bima</Title>
          <Paragraph>Phone: 081234567890</Paragraph>
          <Paragraph>Date: {today}</Paragraph>
          <Button onPress={toggleTheme}>
            Change Theme
          </Button>
          <View style={globalStyles.switchContainer}>
            <Text>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
          <Paragraph>Version 1.0.0</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProfileScreen;
