import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import stationModel from '../models/stations';
import { Base, Typography } from '../styles';

export default function TrainMap() {
    const [markers, setMarkers] = useState([]);
    const [locationMarker, setLocationMarker] = useState([null]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shipRegion, setShipRegion] = useState(null);

    useEffect(() => {
        reloadStations();
    }, []);

    async function reloadStations() {
        setMarkers(await stationModel.getStationData());
        setShipRegion({
            latitude: 59.52,
            longitude: 15.61,
            latitudeDelta: 20,
            longitudeDelta: 0.1,
        })
    }

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setErrorMessage("Saknar tillstånd att hämta din plats!");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Här är jag"
                pinColor="#6495ED"
            />);
        })();
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Alla förseningar på karta</Text>
            <View style={Base.containerMap}>
                <MapView
                    style={styles.map}
                    initialRegion={shipRegion}
                    testID="map of delays"
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
                        >
                            <Callout>
                                <View>
                                    <Text style={Typography.titleStation}>{marker.name}</Text>
                                    <Text>{marker.delays}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
