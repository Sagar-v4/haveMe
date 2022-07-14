import React, {useEffect, useState} from 'react';
import {ListItem} from "@react-native-material/core";
import AntDesign from '@expo/vector-icons/AntDesign';
import { RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import * as moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function History({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchPresence().then(setRefreshing(false));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    let user = AsyncStorage.getItem('UserData')

    const [Items, setItems] = useState([])

    const fetchPresence = async () => {
        user = JSON.parse(await user);
        const res = await axios.get("https://haveme-api.herokuapp.com/api/presence/" + user + "/user");
        res.data.map(r => {
            r.key = r._id;
            r.name = r.event_id.name;
            r.description = r.event_id.description;
        });
        setItems(res.data);
    };

    useEffect(() => {
        fetchPresence().then(r => console.log(r));
    }, []);

    return (

        <>
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {Items.reverse().map((i) => {
                            return (<ListItem
                                key={i.createdAt}
                                title={i.name}
                                leading={i.verified
                                    ? <AntDesign name="checkcircle" size={24} color="green"/>
                                    : <AntDesign name="closecircle" size={24} color="red"/>}
                                secondaryText={i.description}
                                meta={moment.utc(i.createdAt).local().startOf('seconds').fromNow()}
                            />)
                        }
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};
