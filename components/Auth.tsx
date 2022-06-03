import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./Login";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName="Inloggning">
            <Stack.Screen name="Inloggning">
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Registrera" component={Register} />
        </Stack.Navigator>
    );
};
