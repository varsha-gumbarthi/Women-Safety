import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

interface RegisterForm {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  is_police: boolean;
}

interface RegisterScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    is_police: false,
  });

  const handleChange = (name: keyof RegisterForm, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/users/register/', {
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        password2: form.confirmPassword,
        is_police: form.is_police,
      });
      Alert.alert("Registration successful. Please login.");
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert("Registration failed", JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={(text) => handleChange('username', text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => handleChange('password', text)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => handleChange('confirmPassword', text)}
      />

      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});
