import React, {useEffect, useState} from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Avatar, Title, Text, } from 'react-native-paper';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@react-native-material/core";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Profile({navigation}) {

    const removeData = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }

    let user = AsyncStorage.getItem('UserData')

    const [profile, setProfile] = useState([]);
    const fetchUser = async () => {
        user = JSON.parse(await user);
        const res = await axios.get(process.env.API_URL + "/api/user/" + user);
        setProfile(res.data);
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchUser().then(setRefreshing(false));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetchUser().then(r => console.log(r));
    }, []);

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

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


                    <View style={styles.row}>

                        <Button title={"Logout"} style={{
                            marginRight: "5%",
                            width: "45%"
                        }} onPress={removeData}/>

                        <Button title={"Edit"} style={{
                            marginLeft: "5%",
                            width: "45%"
                        }}/>

                    </View>
                </View>
            </ScrollView>
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
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});