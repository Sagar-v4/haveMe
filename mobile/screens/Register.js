import React, { useState } from 'react';
import { View, StyleSheet, Alert, } from 'react-native';
import {TextInput, Button} from "@react-native-material/core";
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function Register({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setData = async () => {
        if (email.length === 0 || password.length === 0 || name.length === 0) {
            Alert.alert('Warning!', 'Empty field not allowed!.')
        } else if (password.length < 6) {
            Alert.alert('Warning!', 'Password least have 6 characters!.')
        } else {
            try {
                const user = {
                    "email": email,
                    "name": name,
                    "password": password
                }
                const res = await axios.post(process.env.API_URL + "/api/auth/register", user);
                await AsyncStorage.setItem('UserData', JSON.stringify(res.data._id));
                navigation.navigate("Home");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.body}>
            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                secureTextEntry
                style={styles.input}
                placeholder='Password'
                onChangeText={(value) => setPassword(value)}
            />
            <Button title={"Register"} onPress={setData}/>

            <Button
                style={{
                    position: "relative",
                    margin: 0,
                    padding: 0,
                    marginBottom: "-30%",
                    marginTop: "30%",
                }}
                title="Already have account? Login here"
                onPress={() => navigation.navigate('Login', {name: 'Login'})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "30%"
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})