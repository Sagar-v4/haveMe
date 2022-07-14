import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Alert,
} from 'react-native';
import {Stack, TextInput, IconButton, Button} from "@react-native-material/core";
import CustomButton from '../components/CustomButton';
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Login({ navigation }) {

    // AsyncStorage.removeItem('UserData').then(r => )
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
                const res = await axios.post("https://haveme-api.herokuapp.com/api/auth/login", user);
                await AsyncStorage.setItem('UserData', JSON.stringify(res.data));
                navigation.navigate("Home");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.body} >
            {/*<Image*/}
            {/*    style={styles.logo}*/}
            {/*    source={require('../../assets/asyncstorage.png')}*/}
            {/*/>*/}
            <Text style={styles.text}>
                {/*Welcome to haveMe*/}
            </Text>
            <TextInput
                placeholder="Email" style={styles.input}
                onChangeText={(value) => setEmail(value)}
            />
            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    placeholder='Email'*/}
            {/*    onChangeText={(value) => setEmail(value)}*/}
            {/*/>*/}
            <TextInput
                secureTextEntry
                style={styles.input}
                placeholder='Password'
                onChangeText={(value) => setPassword(value)}
            />
            <Button title={"Login"} onPress={setData} />
            {/*<CustomButton*/}
            {/*    title='Login'*/}
            {/*    color='#1eb900'*/}
            {/*    onPressFunction={setData}*/}
            {/*/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#0080ff',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 130,
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