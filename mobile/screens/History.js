import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    RefreshControl,
    FlatList,
    SectionList,
    TextInput,
    Pressable,
    Alert,
    ToastAndroid,
    Modal,
} from 'react-native';

import axios from "axios";

export default function History({ navigation }) {

    const user = {
        _id: "62a84917600df42f43fe2614",
    }

    const [Items, setItems] = useState([])

    const fetchPresence = async () => {
        const res = await axios.get("https://haveme-api.herokuapp.com/api/presence/" + user._id + "/user");
        res.data.map(r => {
            r.key = r._id;
            r.name = r.event_id.name;
            r.description = r.event_id.description;
        });
        setItems(res.data);
    };

    useEffect(() => {
        fetchPresence().then(r => console.log(r));
    }, [user._id]);

    const [Refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        fetchPresence().then( setRefreshing(false) );
    }

    const [showDetails, SetshowDetails] = useState(false);

    const [item, setItem] = useState('');

    const onPressHandler = (item) => {
        setItem(item);
        SetshowDetails(true);
    }

    return (

        <>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Items}
          renderItem={({ item }) => (

              <Pressable
                  onPress={onPressHandler.bind(this, item)}
                  // hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  android_ripple={{ color: '#00f' }}
                  style={({ pressed }) => [
                      // { backgroundColor: pressed ? '#dddddd' : '#00ff00' },
                      // styles.button
                  ]}
              >
                  <View style={styles.item}>
                      <Text style={styles.text}>{item.name}</Text>
                  </View>
              </Pressable>

          )}
          refreshControl={
            <RefreshControl
              refreshing={Refreshing}
              onRefresh={onRefresh}
              colors={['#ff00ff']}
            />
          }
        />
            <Modal
                visible={showDetails}
                transparent
                onRequestClose={() =>
                    SetshowDetails(false)
                }
                animationType='fade'
                hardwareAccelerated
            >
                <View style={styles.centered_view}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            <Text style={styles.text_modal}>{item.name}</Text>
                        </View>
                        <View style={styles.warning_body}>
                            <Text style={styles.text_modal}>Description: {item.description}</Text>
                        </View>
                        <View style={styles.warning_body}>
                            <Text style={styles.text_modal}>Message: {item.message}</Text>
                        </View>
                        <Pressable
                            onPress={() => SetshowDetails(false)}
                            style={styles.warning_button}
                            android_ripple={{color:'#fff'}}
                        >
                            <Text style={styles.text_modal}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            </>

    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    item: {
        margin: 2,
        backgroundColor: '#4ae1fa',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 20,
        // fontStyle: 'italic',
        margin: 10,
    },
    body_modal: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    text_modal: {
        color: '#000000',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    input: {
        width: 200,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_modal: {
        width: 300,
        // height: 300,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
    },
    warning_title: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    warning_body: {
        // height: 100,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    warning_button:{
        backgroundColor:'#00ffff',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    }
});