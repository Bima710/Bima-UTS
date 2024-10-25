import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Text, Card, Button, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './styles';

interface Notification {
  id: string;
  title: string;
  body: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Failed to load notifications', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const updatedNotifications = notifications.filter((notif) => notif.id !== id);
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const renderItem = ({ item }: { item: Notification }) => (
    <Card style={globalStyles.card}>
      <Card.Content>
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
        <Button onPress={() => deleteNotification(item.id)} color="red">Delete</Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No notifications found.</Text>}
      />
    </View>
  );
};

export default NotificationScreen;
