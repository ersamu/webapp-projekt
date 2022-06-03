import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavoritesList from './FavoritesList';
import FavoriteForm from './FavoriteForm';
import FavoriteStation from "./FavoriteStation";

const Stack = createNativeStackNavigator();

export default function Favorites(props) {
    return (
        <Stack.Navigator initialRouteName="Dina favoriter">
            <Stack.Screen name="Dina favoriter">
                {(screenProps) => <FavoritesList {...screenProps}
                setIsLoggedIn={props.setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Station" component={FavoriteStation} />
            <Stack.Screen name="Stationer" component={FavoriteForm} />
        </Stack.Navigator>
    );
};
