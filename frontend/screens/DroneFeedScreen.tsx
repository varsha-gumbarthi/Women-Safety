import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface DroneFeedResponse {
  video_url: string;
}

const DroneFeedScreen: React.FC = () => {
  const [lat, setLat] = useState<string>('');
  const [long, setLong] = useState<string>('');
  const [videoURL, setVideoURL] = useState<string>('');

  const triggerDrone = async (): Promise<void> => {
    if (!lat || !long) {
      Alert.alert('Error', 'Enter both latitude and longitude');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post<DroneFeedResponse>(
        'http://127.0.0.1:8000/api/drone/dispatch/',
        {
          location_lat: lat,
          location_long: long,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVideoURL(response.data.video_url);
      Alert.alert('Drone Dispatched', 'Video feed available below.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || error.message);
      } else {
        console.log(error);
      }
      Alert.alert('Error', 'Could not dispatch drone.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Surveillance</Text>

      <TextInput
        placeholder="Latitude"
        keyboardType="numeric"
        value={lat}
        onChangeText={setLat}
        style={styles.input}
      />
      <TextInput
        placeholder="Longitude"
        keyboardType="numeric"
        value={long}
        onChangeText={setLong}
        style={styles.input}
      />

      <Button title="Dispatch Drone" onPress={triggerDrone} />

      {videoURL ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 10 }}>Drone Live Feed:</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(videoURL)}
          >
            {videoURL}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default DroneFeedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 10, borderRadius: 5,
  },
  link: { color: 'blue', textDecorationLine: 'underline' },
});
