import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // ✅ ikon-bibliotek

import ArrayListScreen from "./screens/ArrayListScreen";
import FetchListScreen from "./screens/FetchListScreen";
import FlatListScreen from "./screens/FlatListScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "ArrayList") {
              iconName = "globe";       // 🌍 til lande
            } else if (route.name === "FetchList") {
              iconName = "people";      // 👥 til brugere
            } else if (route.name === "FlatList") {
              iconName = "car";         // 🚗 til biler
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="ArrayList" component={ArrayListScreen} />
        <Tab.Screen name="FetchList" component={FetchListScreen} />
        <Tab.Screen name="FlatList" component={FlatListScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
