import React, { useState } from 'react';
import { View, Switch, Image, Picker } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import globalStyles from './styles';

const ProfileScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString();
  const [language, setLanguage] = useState('en');

  return (
    <View style={isDarkMode ? globalStyles.containerDark : globalStyles.containerLight}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={globalStyles.content}>
        <Image
          source={{ uri: 'https://i.imgur.com/YcP0tik.jpeg' }}
          style={globalStyles.profilePhoto}
        />
        <View style={globalStyles.userInfo}>
          <Text style={globalStyles.userName}>Bima</Text>
          <Text style={globalStyles.userPhone}>00000045997</Text>
          <Text>{`Today's date: ${today}`}</Text>
        </View>
        <View style={globalStyles.switchContainer}>
          <Text>Change Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
        <View style={globalStyles.languageContainer}>
          <Text>Change Language</Text>
          <Picker
            selectedValue={language}
            style={globalStyles.languageSwitch}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            {/* Add more languages as needed */}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
