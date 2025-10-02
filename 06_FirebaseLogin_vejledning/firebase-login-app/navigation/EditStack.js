import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditCVScreen from "../screens/EditCVScreen";
import CameraScreen from "../screens/CameraScreen";

const Stack = createNativeStackNavigator();

export default function EditStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EditCV" component={EditCVScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}