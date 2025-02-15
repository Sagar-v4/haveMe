import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, Alert, ToastAndroid} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Scan({ navigation }) {

    let user = AsyncStorage.getItem('UserData')

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showBox, setShowBox] = useState(true);

    const [QR, setQR] = useState();
    const [event, setEvent] = useState({});

    const showConfirmDialog = async () => {
        user = JSON.parse(await user);
        return Alert.alert(
            "Are your sure?",
            event.name,
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            const res = await axios.post(process.env.API_URL + "/api/presence/", {
                                "event_id": event._id,
                                "user_id": user,
                            });
                            ToastAndroid.show('Request successful!', ToastAndroid.LONG);
                        } catch (e) {
                            ToastAndroid.show(`Request fail! ${e.message}`, ToastAndroid.LONG);
                        } finally {
                            setShowBox(false);
                            // setScanned(false);
                        }
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [QR]);

    const findQR = async () => {

        // setScanned(true);
        setEvent(null);
        try {
            const res = await axios.get("process.env.API_URL/api/event/" + QR + "/qr");
            // res.data.map(r => {
            //     r.key = r._id;
            //     r.name = r.event_id.name;
            //     r.description = r.event_id.description;
            // });

            // ToastAndroid.show(`EVENT: ${res}`, ToastAndroid.LONG);
            setEvent(res.data);
            await showConfirmDialog();
            // }

        } catch (e) {
            setScanned(false);
        }
    };

    // useEffect(() => {
    //     findQR().then(r =>
    //         setScanned(event !== null));
    // }, [QR]);

    const handleBarCodeScanned = async ({type, data}) => {
        // if(data !== QR) {
        setQR(data);
        setScanned(true);
        await findQR().then(r => setScanned(event !== null));
        // ToastAndroid.show('Request cancelled!', ToastAndroid.SHORT);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!\n Event Details:${event}`);
        // }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => {

                // setQR(null);
                setScanned(false)
            }}/>}
        </View>

        // <View style={styles.screen}>
        //     {showBox && <View style={styles.box}></View>}
        //     <Button title="Delete" onPress={() => showConfirmDialog()}/>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
