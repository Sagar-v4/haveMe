import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";

export default function Scan({ navigation }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const [QR, setQR] = useState();
    const [event, setEvent] = useState(null);

    const findQR = async () => {
        const res = await axios.get("http://localhost:5000/api/event/" + QR + "/qr");
        // res.data.map(r => {
        //     r.key = r._id;
        //     r.name = r.event_id.name;
        //     r.description = r.event_id.description;
        // });
        setEvent(res.data);
    };

    useEffect(() => {
        findQR().then(r =>
            setScanned(event !== null));
    }, [QR]);

    const handleBarCodeScanned = ({ type, data }) => {
        setQR(data);
        // setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!\n Event Details:${event}`);
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
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
