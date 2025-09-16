import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import DetailsScreen from '../screens/DetailsScreen';
import UserProfileScreen from '../screens/StackScreens/UserProfileScreen';
import AppDetailsScreen from '../screens/StackScreens/AppDetailsScreen';


const Stack = createStackNavigator();


// Eksporter som default, så App.js kan bruge den som component i Tab
export default function StackNavigation() {
return (
<Stack.Navigator initialRouteName="Details Screen">
<Stack.Screen name="Details Screen" component={DetailsScreen} />
<Stack.Screen name="User Profile" component={UserProfileScreen} />
<Stack.Screen name="App Details" component={AppDetailsScreen} />
</Stack.Navigator>
);
}