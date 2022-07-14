
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

function App() {

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold'
                    }
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{title: 'haveMe'}}
                />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{title: 'haveMe', headerLeft: () => null}}
                />

                <Stack.Screen
                    name={"Home"}
                    component={Home}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;