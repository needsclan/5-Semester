import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import GalleryScreen from "./screens/GalleryScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { RatingsProvider } from "./context/RatingsContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <RatingsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Rate billede" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RatingsProvider>
  );
}
