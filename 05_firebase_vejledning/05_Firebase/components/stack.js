import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CarList from "../screens/CarList";
import CarDetails from "../screens/CarDetails";
import AddEditCar from "../screens/AddEditCar";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Car List" component={CarList} />
      <Stack.Screen name="Car Details" component={CarDetails} />
      <Stack.Screen name="Add/Edit Car" component={AddEditCar} />
    </Stack.Navigator>
  );
}
