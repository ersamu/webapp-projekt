import config from '../config/config.json';
import storage from './storage';
import stationsModel from './stations';

const favorite = {
    getStationsFav: async function getStationsFav() {
        const token: any = await storage.readToken();
        const response = await fetch(`${config.base_url}/data?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token,
            },
        });
        const result = await response.json();

        let resultArtefact = [];

        if (result.data.length) {
            resultArtefact = JSON.parse(result.data[result.data.length-1]["artefact"]);
        }

        return resultArtefact;
    },

    getStationsNotFav: async function getStationsNotFav() {
        const allStations = await stationsModel.getStations();
        const favStations = await this.getStationsFav();

        let allStationsLocation = [];
        for (const station of allStations) {
            allStationsLocation.push(station["LocationSignature"]);
        }

        let favStationsLocation = [];
        for (const station of favStations) {
            favStationsLocation.push(station["LocationSignature"]);
        }

        let indexArray = [];
        for (const location of allStationsLocation) {
            if (favStationsLocation.includes(location)) {
                const index = allStationsLocation.indexOf(location);
                indexArray.push(index);
            }
        }

        for (let i = indexArray.length -1; i >= 0; i--) {
            allStations.splice(indexArray[i], 1);
        }

        return allStations;
    },

    addStation: async function addStation(newFavStation) {
        const favStations = await this.getStationsFav();
        favStations.push(newFavStation);

        const stringArray = JSON.stringify(favStations);

        const token: any = await storage.readToken();
        const data = {
            api_key: config.api_key,
            artefact: stringArray,
        };

        const response = await fetch(`${config.base_url}/data`, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token,
            },
            method: 'POST'
        });
        const result = await response.json();
        return result;
    }
}

export default favorite;
