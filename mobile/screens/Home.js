
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import History from './History';
import Scan from "./Scan";
import Profile from './Profile';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

function Home({ navigation, route, screenName }) {


    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setName(user.Name);
                        setAge(user.Age);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if (name.length === 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                const user = {
                    Name: name
                };
                await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                Alert.alert('Success!', 'Your data has been updated.');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        // <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        if (route.name === 'Profile') {
                            iconName = 'user';
                            size = focused ? 25 : 20;
                            // color = focused ? '#f0f' : '#555';
                        } else if (route.name === 'History') {
                            iconName = 'history';
                            size = focused ? 25 : 20;
                            // color = focused ? '#f0f' : '#555';
                        } else if (route.name === 'Scan') {
                            iconName = 'expand';
                            size = focused ? 25 : 20;
                            // color = focused ? '#f0f' : '#555';
                        }
                        return (
                            <FontAwesome5
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        )
                    }
                })}
                tabBarOptions={{
                    tabBarActiveTintColor: '#f0f',
                    tabBarInactiveTintColor: '#555',
                    tabBarActiveBackgroundColor: '#fff',
                    tabBarInactiveBackgroundColor: '#999',
                    tabBarShowLabel: true,
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarShowIcon: true,
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ]
                }}
                activeColor='#f0edf6'
                inactiveColor='#3e2465'
                barStyle={{ backgroundColor: '#694fad' }}
            >
                <Tab.Screen
                    name={"History"}
                    component={History}
                />
                <Tab.Screen

                    name="Scan"
                    component={Scan}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    // options={{ tabBarBadge: 3 }}
                />
            </Tab.Navigator>
        // </NavigationContainer>
    )
}

export default Home;