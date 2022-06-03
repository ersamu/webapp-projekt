import { useState, useEffect } from 'react';
import { Button, ScrollView, Text } from 'react-native';

import favoriteModel from '../models/favorites';

import { Base, Typography } from '../styles/';

export default function FavoriteForm({ route, navigation }) {
    const { reload } = route.params || false;
    const [stations, setStations] = useState([]);

    if (reload) {
        reloadStations();
    }

    async function reloadStations() {
        setStations(await favoriteModel.getStationsNotFav());
        navigation.navigate("Stationer", {reload: false});
    }

    useEffect(() => {
        reloadStations();
    }, []);

    async function addToFavs(stationToAdd) {
        await favoriteModel.addStation(stationToAdd);
        navigation.navigate("Dina favoriter", {reload: true});
    }

    const listOfStations = stations
    .map((station, index) => {
        return <Button
            title={station.AdvertisedLocationName}
            key={index}
            onPress={() => {
                addToFavs(station);
            }}
        />
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Välj stationer att lägga till som favoriter</Text>
            {listOfStations}
        </ScrollView>
    );
}
