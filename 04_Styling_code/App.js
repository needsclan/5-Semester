import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';


import ListScreen from './screens/ListScreen';
import ProfileScreen from './screens/ProfileScreen';

import { GlobalStyle } from './styles/GlobalStyle';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
              backgroundColor: '#FF0000',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
          },
          headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'Sergoe UI',
              fontWeight: 'semibold',
              color: '#fff', // Example color to match the rest of the app
          },
          tabBarStyle: {
              backgroundColor: '#FF0000',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#FFF2F2',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'List') {
                iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },
          
      })}
        >
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
