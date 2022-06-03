import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Auth from './components/Auth';
import Favorites from './components/Favorites';
import Start from './components/Start';
import TrainMap from './components/TrainMap';
import authModel from './models/auth';
import { Base } from './styles/index.js';

const routeIcons = {
  "Start": "home",
  "Förseningar": "train-outline",
  "Logga in": "lock-closed",
  "Favoriter": "star-outline",
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
        setIsLoggedIn(await authModel.loggedIn());
    })();
  }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = routeIcons[route.name] || "alert";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Start" component={Start} />
          <Tab.Screen name="Förseningar" component={TrainMap} />
          {isLoggedIn ?
            <Tab.Screen name="Favoriter">
              {() => <Favorites setIsLoggedIn={setIsLoggedIn}/>}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn}/>}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}
