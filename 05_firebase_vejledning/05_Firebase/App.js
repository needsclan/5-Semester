import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Firebase init
import { rtdb } from "./database/firebase";

// Navigation
import StackNavigation from "./components/stack"; // 👈 din stack
import AddEditCar from "./screens/AddEditCar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Hjem"
            component={StackNavigation}
            options={{
              tabBarIcon: () => <Ionicons name="home" size={20} />,
            }}
          />
          <Tab.Screen
            name="Add"
            component={AddEditCar}
            options={{
              tabBarIcon: () => <Ionicons name="add" size={20} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
