
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './screens/Home';
import Login from './screens/Login';
import {Button} from "react-native";

const Stack = createStackNavigator();

function App() {


    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        // backgroundColor: '#0080ff'
                    },
                    // headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold'
                    }
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}

                    options={{
                        // headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={"Home"}
                    component={Home}
                    // options={{
                    //     headerRight: () => (
                    //         <Button
                    //             onPress={() => alert('This is a button!')}
                    //             title="Info"
                    //             color="#0080ff"
                    //         />
                    //     ),
                    // }}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;