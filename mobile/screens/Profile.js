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

export default function Profile({ navigation }) {

    const user = {
        _id: "62a84917600df42f43fe2614",
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
                            uri: 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png',
                        }}
                        size={80}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop:15,
                            marginBottom: 5,
                        }]}>{profile.name}</Title>
                        {/*<Caption style={styles.caption}>{profile.email}</Caption>*/}
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="gender-male-female" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{profile.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{profile.mobile_number}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{profile.email}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="calendar" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{profile.dob}</Text>
                </View>
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