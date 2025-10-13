import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import ConfirmDeleteScreen from "../screens/ConfirmDeleteScreen";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ title: "Min profil" }}
      />
      <Stack.Screen
        name="ConfirmDelete"
        component={ConfirmDeleteScreen}
        options={{ title: "Slet profil" }}
      />
    </Stack.Navigator>
  );
}
