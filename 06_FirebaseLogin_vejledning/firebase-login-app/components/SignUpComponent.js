import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/database";
import GlobalStyles from "../style/GlobalStyle";

export default function Signup() {
  // state til email og kodeord
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funktion til at oprette ny bruger i firebase auth
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Bruger oprettet!");
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View>
      {/* overskrift */}
      <Text style={GlobalStyles.title}>Opret bruger</Text>

      {/* inputfelt til email */}
      <TextInput
        placeholder="Email"
        style={GlobalStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      {/* inputfelt til kodeord */}
      <TextInput
        placeholder="Kodeord"
        style={GlobalStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />

      {/* knap til at oprette bruger */}
      <TouchableOpacity style={GlobalStyles.button} onPress={handleSignup}>
        <Text style={GlobalStyles.buttonText}>Opret bruger</Text>
      </TouchableOpacity>
    </View>
  );
}
