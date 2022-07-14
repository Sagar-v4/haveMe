import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button} from "@react-native-material/core";

export default function Profile({navigation}) {


    const removeData = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }

    const user = {
        _id: "62c5a97fce60b5e215118764",
    }

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("https://haveme-api.herokuapp.com/api/user/" + user._id);
            setProfile(res.data);
        };
        fetchUser().then(r => console.log(r));
    }, [user._id]);


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                        source={{
                            uri: profile.avtar,
                        }}
                        size={80}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{profile.name}</Title>
                        {/*<Caption style={styles.caption}>{profile.email}</Caption>*/}
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="gender-male-female" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>{profile.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>{profile.mobile_number}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>{profile.email}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="calendar" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>{profile.dob}</Text>
                </View>

                <Button title={"Logout"} onPress={removeData} />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});