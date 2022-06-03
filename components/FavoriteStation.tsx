import { ScrollView, Text } from 'react-native';
import { useState, useEffect } from 'react';

import delayModel from '../models/delays';
import { Base, Typography } from '../styles';

export default function DelayList({ route }) {
    const { station } = route.params;
    const [delays, setDelays] = useState([]);

    useEffect(() => {
        (async () => {
            setDelays(await delayModel.getDelays());
        })();
    }, []);

    let delaysExist = false;

    function delayMinutes(firstTime: string, newTime: string): number {
        const time1 = new Date(firstTime.substring(0, 23) + "Z");
        const time2 = new Date(newTime.substring(0, 23) + "Z");
        const timediff = (time2.getTime() - time1.getTime()) / 1000 / 60;
        return timediff;
    }

    const delaysList = delays.map((item, index) => {
        if (station.LocationSignature === item.FromLocation[0].LocationName) {
            delaysExist = true;
            const delayedTime = delayMinutes(item.AdvertisedTimeAtLocation, item.EstimatedTimeAtLocation);
            return <Text
                key={index}
                style={Typography.normal}
                >
                    Tågnummer: {item.AdvertisedTrainIdent}{"\n"}
                    Försenad: {delayedTime} min{"\n"}
                </Text>
        }
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>{station.AdvertisedLocationName}</Text>

            {delaysExist
            ? delaysList
            : <Text style={Typography.normal}>Inga förseningar just nu</Text>
            }
        </ScrollView>
    )
};
