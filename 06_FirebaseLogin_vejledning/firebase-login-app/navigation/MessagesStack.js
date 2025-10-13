// navigation/MessagesStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();
export default function MessagesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: "Beskeder" }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Chat" }} />
    </Stack.Navigator>
  );
}
