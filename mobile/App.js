
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './screens/Home';
import Login from './screens/Login';

const Stack = createStackNavigator();

function App() {

    const [screenName, setScreenName] = useState("Home");

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#0080ff'
                    },
                    headerTintColor: '#ffffff',
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
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={screenName}
                    screenName ={screenName}
                    setScreenName={setScreenName}
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;