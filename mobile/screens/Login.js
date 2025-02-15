import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, } from 'react-native';
import {TextInput, Button} from "@react-native-material/core";
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        navigation.navigate("Home");
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if (email.length === 0 || password.length === 0) {
            Alert.alert('Warning!', 'Empty field not allowed!.')
        } else {
            try {
                const user = {
                    "email": email,
                    "password": password
                }
                const res = await axios.post(process.env.API_URL + "/api/auth/login", user);
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
                placeholder="Email" style={styles.input}
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                secureTextEntry
                style={styles.input}
                placeholder='Password'
                onChangeText={(value) => setPassword(value)}
            />
            <Button title={"Login"} onPress={setData}/>

            <Button
                style={{
                    position: "relative",
                    margin: 0,
                    padding: 0,
                    marginBottom: "-50%",
                    marginTop: "50%",
                }}
                title="New? Register here"
                onPress={() => navigation.navigate('Register', {name: 'Register'})}
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