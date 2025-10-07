// navigation/TabsNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../database/database";
import { Ionicons } from "@expo/vector-icons";

import SwipeCVScreen from "../screens/SwipeCVScreen";
import EditCVScreen from "../screens/EditCVScreen";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="SwipeCV"
      screenOptions={{ headerShown: false }}
    >
      {/* fanen til at swipe igennem andres cv'er */}
      <Tab.Screen
        name="SwipeCV"
        component={SwipeCVScreen}
        options={{
          title: "Swipe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      {/* fanen til at redigere eget cv */}
      <Tab.Screen
        name="EditCV"
        component={EditCVScreen}
        options={{
          title: "Rediger",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />

      {/* logout-fane, som logger brugeren ud af firebase */}
      <Tab.Screen
        name="Logout"
        component={DummyScreen}
        options={{
          title: "Log ud",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
          // knappen erstattes af en custom knap som kalder signOut
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                try {
                  await signOut(auth);
                } catch (e) {
                  console.error("Logout fejlede:", e.message);
                }
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// bruges kun som placeholder til logout-fanen
function DummyScreen() {
  return null;
}
