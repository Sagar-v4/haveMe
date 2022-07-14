
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
    Button,
    Alert,
    TextInput,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from "@react-native-material/core";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

function Home({ navigation, route, screenName}) {


    return (
        // <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        if (route.name === 'Profile') {
                            iconName = 'user';
                            // size = focused ? 30 : 20;
                            color = focused ? '#6200ee' : '#555';
                        } else if (route.name === 'History') {
                            iconName = 'history';
                            // size = focused ? 30 : 20;
                            color = focused ? '#6200ee' : '#555';
                        } else if (route.name === 'Scan') {
                            iconName = 'expand';
                            // size = focused ? 30 : 20;
                            color = focused ? '#6200ee' : '#555';
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
            >
                <Tab.Screen
                    name={"History"}
                    component={History}
                    options={{ tabBarShowLabel: false }}

                />
                <Tab.Screen
                    name="Scan"
                    component={Scan}
                    options={{ tabBarShowLabel: false }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{ tabBarShowLabel: false }}
                />
            </Tab.Navigator>
        // </NavigationContainer>
    )
}


export default Home;