// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Switch } from 'react-native';

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const changeLanguage = () => setLanguage(language === 'EN' ? 'ID' : 'EN');

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profileImage} />
      <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>Atanasius Raditya Herkristito</Text>
      <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>00000044898</Text>
      <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>29 Mei 2002</Text>
      <View style={styles.menu}>
        <Text style={[styles.menuText, { color: isDarkMode ? 'white' : 'black' }]}>Change Language</Text>
        <Button title={language} onPress={changeLanguage} />
      </View>
      <View style={styles.menu}>
        <Text style={[styles.menuText, { color: isDarkMode ? 'white' : 'black' }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: 'grey', true: 'teal' }}
          thumbColor={isDarkMode ? 'white' : 'black'}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <Text style={[styles.version, { color: isDarkMode ? 'white' : 'black' }]}>App Version 1.2024.09.05</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
  },
  version: {
    marginTop: 20,
    fontSize: 16,
  },
});
