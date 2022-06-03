import delaysModel from './delays';

const stations = {
    getStations: async function getStations() {
        const response = await fetch("https://trafik.emilfolino.se/stations");
        const result = await response.json();
        return result.data;
    },

    getStationData: async function getStationData() {
        const stations = await this.getStations();
        const delays = await delaysModel.getDelays();

        function stationObject() {
            return stations.reduce(function (acc, current) {
                let key = current["LocationSignature"];
                if (!acc[key]) {
                    acc[key] = [];
                }

                let coordinates = fixCoordinates(current["Geometry"]["WGS84"]);
                let station = {name: current["AdvertisedLocationName"], latitude: coordinates[1], longitude: coordinates[0], delays: []};
                acc[key].push(station);
                return acc;
            }, {})
        }

        function fixCoordinates(point) {
            let coordinates = point.substring(7, point.length-1);
            let coordinatesArray = coordinates.split(" ");

            return coordinatesArray.map(Number);
        }
        
        function delayMinutes(firstTime, newTime) {
            const time1 = new Date(firstTime.substring(0, 23) + "Z");
            const time2 = new Date(newTime.substring(0, 23) + "Z");
            const timediff = (time2.getTime() - time1.getTime()) / 1000 / 60;
            return timediff;
        }

        const allStations = stationObject();

        for (const key in delays) {
            let minutesDelay = delayMinutes(delays[key].AdvertisedTimeAtLocation, delays[key].EstimatedTimeAtLocation);
            let testStr = "Tåg " + delays[key].AdvertisedTrainIdent + " " + minutesDelay + " min \n";
            allStations[delays[key].FromLocation[0].LocationName][0].delays.push(testStr);
        }

        let stationsWithDelays = [];
        for (const key in allStations) {
            if (allStations[key][0].delays.length) {
                stationsWithDelays.push(allStations[key][0]);
            }
        }

        return stationsWithDelays;
    }
}

export default stations;
