import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../database/database";
import { Ionicons } from "@expo/vector-icons";

import SwipeStack from "./SwipeStack";          // ⬅️ brug stacken
import EditCVScreen from "../screens/EditCVScreen";
// import SwipeCVScreen from "../screens/SwipeCVScreen"; // ⬅️ fjern denne

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator initialRouteName="SwipeCV" screenOptions={{ headerShown: false }}>
      {/* Swipe-fanen bruger nu en stack */}
      <Tab.Screen
        name="SwipeCV"
        component={SwipeStack}               // ⬅️ her!
        options={{
          title: "Swipe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

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

      <Tab.Screen
        name="Logout"
        component={DummyScreen}
        options={{
          title: "Log ud",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                try { await signOut(auth); } catch (e) { console.error("Logout fejlede:", e.message); }
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DummyScreen() { return null; }
