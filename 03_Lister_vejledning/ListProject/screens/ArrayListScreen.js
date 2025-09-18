import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { COUNTRIES } from "../data/const";

export default function CompareListScreen() {
  return (
    <View style={styles.container}>
      {/* FlatList version */}
      <Text style={styles.header}>FlatList</Text>
      <View style={styles.box}>
        <FlatList
          data={COUNTRIES}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>Land: {item}</Text>
          )}
        />
      </View>

      {/* ScrollView + .map version */}
      <Text style={styles.header}>ScrollView + map()</Text>
      <View style={styles.box}>
        <ScrollView>
          {COUNTRIES.map((country, index) => (
            <Text key={index} style={styles.item}>
              Land: {country}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  header: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  box: { height: 150, width: "80%", backgroundColor: "lightgrey", borderRadius: 10, borderWidth: 1, marginBottom: 20 },
  item: { fontSize: 15, textAlign: "center", padding: 10 },
});