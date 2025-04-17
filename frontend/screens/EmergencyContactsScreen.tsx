import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Contact {
    id: number;
    name: string;
    relation: string;
    phone: string;
    email?: string;
}

interface FormState {
    name: string;
    relation: string;
    phone: string;
    email: string;
}

const EmergencyContactsScreen: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [form, setForm] = useState<FormState>({ name: '', relation: '', phone: '', email: '' });

    const fetchContacts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get<Contact[]>('http://127.0.0.1:8000/api/contacts/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContacts(response.data);
        } catch (error) {
            Alert.alert('Error', 'Could not fetch contacts');
        }
    };

    const handleChange = (name: keyof FormState, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const handleAdd = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post('http://127.0.0.1:8000/api/contacts/', form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForm({ name: '', relation: '', phone: '', email: '' });
            fetchContacts();
        } catch (error) {
            Alert.alert('Error', 'Could not add contact');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/contacts/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchContacts();
        } catch (error) {
            Alert.alert('Error', 'Could not delete contact');
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Emergency Contacts</Text>

            <TextInput
                placeholder="Name"
                style={styles.input}
                value={form.name}
                onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
                placeholder="Relation"
                style={styles.input}
                value={form.relation}
                onChangeText={(text) => handleChange('relation', text)}
            />
            <TextInput
                placeholder="Phone"
                style={styles.input}
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => handleChange('phone', text)}
            />
            <TextInput
                placeholder="Email (optional)"
                style={styles.input}
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
            />
            <Button title="Add Contact" onPress={handleAdd} />

            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name} ({item.relation})</Text>
                        <Text>Phone: {item.phone}</Text>
                        {item.email && <Text>Email: {item.email}</Text>}
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={styles.delete}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default EmergencyContactsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10,
    },
    card: {
        padding: 15, backgroundColor: '#f2f2f2', borderRadius: 8, marginBottom: 10,
    },
    name: { fontWeight: 'bold', marginBottom: 5 },
    delete: { color: 'red', marginTop: 5 },
});
