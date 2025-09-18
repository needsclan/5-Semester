import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import StackNavigation from './components/StackComponent';


const Tab = createBottomTabNavigator();


export default function App() {
return (
<NavigationContainer>
<Tab.Navigator initialRouteName="Home">
  <Tab.Screen name="Details" component={StackNavigation} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
  <Tab.Screen name="Home" component={HomeScreen} />
</Tab.Navigator>
</NavigationContainer>
);
}