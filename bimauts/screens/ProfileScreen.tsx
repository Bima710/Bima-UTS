import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Switch } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const loadTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme) {
        setIsDarkMode(theme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  const today = new Date().toLocaleDateString();

  return (
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <Appbar.Header>
        <Appbar.Content title={t('Profile')} />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Image
            source={{ uri: 'https://placekitten.com/200/200' }}
            style={styles.image}
          />
          <Title style={styles.title}>Bima</Title>
          <Paragraph>Phone: 081234567890</Paragraph>
          <Paragraph>Date: {today}</Paragraph>
          <Button onPress={toggleLanguage}>
            {t('Change Language')}
          </Button>
          <View style={styles.switchContainer}>
            <Text>{t('Dark Mode')}</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
          <Paragraph>Version 1.0.0</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
  },
  card: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#000',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default ProfileScreen;