import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwipeCVScreen from "../screens/SwipeCVScreen";
import CVDetailScreen from "../screens/CVDetailScreen";

const Stack = createNativeStackNavigator();

export default function SwipeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SwipeList" component={SwipeCVScreen} />
      <Stack.Screen name="CVDetail" component={CVDetailScreen} />
    </Stack.Navigator>
  );
}
