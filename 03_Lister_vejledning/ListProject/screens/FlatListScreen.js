import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import {CARS} from "../data/const"; // eller: import { CARS } from "../data/cars";

export default function FlatListScreen() {
  console.log("CARS:", Array.isArray(CARS), CARS?.length);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, textAlign: "center", padding: 20 }}>
        1 Mine biler - Flatlist
      </Text>

      <View style={styles.listBox}>
        <FlatList
          data={CARS}          
          renderItem={({ item }) => (
            <Text style={styles.itemText}>Bil: {item}</Text>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  listBox: { height: 150, width: "80%", backgroundColor: "lightgrey", borderRadius: 10, borderWidth: 1 },
  itemText: { fontSize: 15, textAlign: "center", padding: 10 },
});
