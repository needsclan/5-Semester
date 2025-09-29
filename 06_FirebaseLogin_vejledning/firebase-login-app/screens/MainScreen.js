import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../database/database";
import GlobalStyles from "../style/GlobalStyle";

export default function MainScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout fejlede:", error.message);
    }
  };

  const userEmail = auth.currentUser?.email;

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Hej {userEmail} 👋</Text>
      <Text style={GlobalStyles.subtitle}>Du er nu logget ind!</Text>

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => navigation.navigate("EditCV")}
      >
        <Text style={GlobalStyles.buttonText}>Rediger CV</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => navigation.navigate("SwipeCV")}
      >
        <Text style={GlobalStyles.buttonText}>Se andre CV'er</Text>
      </TouchableOpacity>

      <TouchableOpacity style={GlobalStyles.button} onPress={handleLogout}>
        <Text style={GlobalStyles.buttonText}>Log ud</Text>
      </TouchableOpacity>
    </View>
  );
}
