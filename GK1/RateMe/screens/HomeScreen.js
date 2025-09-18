import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "../styles/styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RateMyPics</Text>
      <Text style={styles.subtitle}>Rate billeder med stjerner ⭐</Text>

      {/* Knap 1: Navigerer */}
      <Pressable
        style={[styles.button, styles.buttonPrimary]}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Text style={styles.buttonText}>Gå til Galleri</Text>
      </Pressable>

      {/* Knap 2: Dummy handling */}
      <Pressable
        style={[styles.button, styles.buttonGhost]}
        onPress={() => alert("Upload kommer snart 🤞")}
      >
        <Text style={styles.buttonTextGhost}>Upload (dummy)</Text>
      </Pressable>
    </View>
  );
}
