import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native'; // Remove this if using expo-router
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SOSScreen from '../screens/SOSScreen';
import DroneFeedScreen from '../screens/DroneFeedScreen';
import EmergencyContactsScreen from '../screens/EmergencyContactsScreen';
import SOSHistoryScreen from '../screens/SOSHistoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Profile' : 'Login'}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="SOS" component={SOSScreen} />
          <Stack.Screen name="SOS History" component={SOSHistoryScreen} />
          <Stack.Screen name="Contacts" component={EmergencyContactsScreen} />
          <Stack.Screen name="Drone Feed" component={DroneFeedScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
