
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import History from './History';
import Scan from "./Scan";
import Profile from './Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

function Home({ navigation, route, screenName}) {


    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    if (route.name === 'Profile') {
                        iconName = 'user';
                        color = focused ? '#6200ee' : '#555';
                    } else if (route.name === 'History') {
                        iconName = 'history';
                        color = focused ? '#6200ee' : '#555';
                    } else if (route.name === 'Scan') {
                        iconName = 'expand';
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
                options={{tabBarShowLabel: false}}

            />
            <Tab.Screen
                name="Scan"
                component={Scan}
                options={{tabBarShowLabel: false}}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{tabBarShowLabel: false}}
            />
        </Tab.Navigator>
    )
}


export default Home;