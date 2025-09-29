import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/database";
import GlobalStyles from "../style/GlobalStyle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Logget ind!");
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View>
      <Text style={GlobalStyles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={GlobalStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Kodeord"
        style={GlobalStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={GlobalStyles.button} onPress={handleLogin}>
        <Text style={GlobalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
