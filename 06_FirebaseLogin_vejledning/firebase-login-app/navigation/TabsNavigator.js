import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SwipeStack from "./SwipeStack";
import EditCVScreen from "../screens/EditCVScreen";
import ProfileStack from "./ProfileStack"; // ⬅️ NY
import MessagesStack from "./MessagesStack";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator initialRouteName="SwipeCV" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="SwipeCV"
        component={SwipeStack}
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
    title: "Rediger CV",
    headerShown: true, // ✅ giver den hvide topbar
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="create-outline" size={size} color={color} />
    ),
  }}
/>
      <Tab.Screen
        name="Profile"
        component={ProfileStack} // ⬅️ Profil-stack
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
  name="Messages"
  component={MessagesStack}
  options={{
    title: "Messages",
    tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" size={size} color={color} />,
  }}
/>
    </Tab.Navigator>
  );
}
