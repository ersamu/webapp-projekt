import { useState, useEffect } from 'react';
import { Button, ScrollView, Text } from 'react-native';

import authModel from '../models/auth';
import favoriteModel from '../models/favorites';
import { Base, Typography } from '../styles';

export default function FavoritesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [stations, setStations] = useState([]);

    if (reload) {
        reloadStations();
    }

    async function reloadStations() {
        setStations(await favoriteModel.getStationsFav());
        navigation.navigate("Dina favoriter", {reload: false});
    }

    useEffect(() => {
        reloadStations();
    }, []);

    async function logOut() {
        await authModel.logout();
        setIsLoggedIn(false);
    }

    const listOfStations = stations
        .map((station, index) => {
            return <Button
                title={station.AdvertisedLocationName}
                key={index}
                onPress={() => {
                    navigation.navigate("Station", {
                        station: station
                    });
                }}
            />
        });

        let areFavorites = false;

        if (stations.length) {
            areFavorites = true;
        }

    return (
        <ScrollView style={Base.base}>
            <Button
                title="Logga ut"
                onPress={() => {
                    logOut();
                }}
            />
            <Button
                title="Lägg till fler stationer"
                onPress={() => {
                    navigation.navigate("Stationer");
                }}
            />
            <Text style={Typography.header2}>Mina favoritstationer</Text>
            {areFavorites
            ? listOfStations
            : <Text style={Typography.normal}>Du har inga favoritstationer</Text>
            }
        </ScrollView>
    );
}
