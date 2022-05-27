import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import Train from './components/Train';
import Start from './components/Start';

const routeIcons = {
  "Start": "home",
  "Förseningar": "train",
  "Karta": "location",
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [delays, setDelays] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
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
          <Tab.Screen name="Förseningar" component={Train} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  startImg: {
    flex: 1,
    justifyContent: 'center',
  },

  textOverImg: {
    fontSize: 42,
    color: 'white',
    marginTop: 200,
    paddingLeft: 50,
    paddingRight: 50,
  },
});
