import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface SOSAlert {
  id: number;
  timestamp: string;
  threat_level: string;
  location_lat: number;
  location_long: number;
  drone_video_url?: string;
}

const SOSHistoryScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSOSHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get<SOSAlert[]>('http://127.0.0.1:8000/api/sos/history/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlerts(response.data);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSOSHistory();
  }, []);

  const renderItem = ({ item }: { item: SOSAlert }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(item.timestamp).toLocaleString()}</Text>
      <Text>Threat Level: {item.threat_level}</Text>
      <Text>Location: {item.location_lat.toFixed(4)}, {item.location_long.toFixed(4)}</Text>
      {item.drone_video_url && <Text>Drone Feed: {item.drone_video_url}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS History</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : alerts.length === 0 ? (
        <Text>No alerts found.</Text>
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default SOSHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
