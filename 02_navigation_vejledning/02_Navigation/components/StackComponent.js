import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CarList from "../screens/CarList";
import CarDetails from "../screens/CarDetails";
import AddEditCar from "../screens/AddEditCar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1) Din stack med CarList først
function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Car List" component={CarList} />
      <Stack.Screen name="Car Details" component={CarDetails} />
      <Stack.Screen name="Add/Edit Car" component={AddEditCar} />
    </Stack.Navigator>
  );
}

// 2) Dine tabs, hvor "Home" viser StackNavigation
export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          if (route.name === "Home") {
            return <Ionicons name={focused ? "home" : "home-outline"} size={size} />;
          }
          if (route.name === "Add/Edit") {
            return <Ionicons name={focused ? "car" : "car-outline"} size={size} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={StackNavigation} />
      <Tab.Screen name="Add/Edit" component={AddEditCar} />
    </Tab.Navigator>
  );
}
