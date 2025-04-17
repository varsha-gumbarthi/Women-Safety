import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

type User = {
  username: string;
  email: string;
  phone: string;
  is_police: boolean;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found. Redirecting to login.');
          navigation.replace('Login');
          return;
        }

        const response = await axios.get<User>('https://example.com/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Failed to fetch profile. Redirecting to login.');
        navigation.replace('Login');
      }
    };

    fetchUserProfile();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Role: {user.is_police ? 'Police' : 'Civilian'}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
