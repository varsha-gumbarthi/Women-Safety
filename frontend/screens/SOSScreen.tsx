import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOSScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const triggerSOS = async (): Promise<void> => {
    setLoading(true);
    try {
      // Ask for location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required for SOS.');
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get auth token
      const token = await AsyncStorage.getItem('token');

      // Send SOS request
      const response = await axios.post(
        'http://127.0.0.1:8000/api/sos/trigger/',
        {
          location_lat: latitude,
          location_long: longitude,
          threat_level: 'HIGH',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('SOS Sent', 'Authorities have been notified.');
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert('SOS Failed', 'Could not send SOS alert.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <Button title="Trigger SOS" onPress={triggerSOS} color="red" />
      )}
    </View>
  );
};

export default SOSScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: 'red' },
});
