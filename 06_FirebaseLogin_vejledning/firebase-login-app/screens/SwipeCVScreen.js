import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { ref, get, child } from "firebase/database";
import { rtdb, auth } from "../database/database";

const { width } = Dimensions.get("window");

export default function SwipeCVScreen() {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const snapshot = await get(child(ref(rtdb), "cvs"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const others = Object.entries(data)
            .filter(([uid]) => uid !== auth.currentUser?.uid)
            .map(([uid, val]) => ({ uid, ...val }));
          setCvs(others);
        }
      } catch (error) {
        console.error("Fejl:", error.message);
      }
    };
    loadCVs();
  }, []);

  if (cvs.length === 0) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Ingen CV'er fundet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cvs}
      keyExtractor={(item) => item.uid}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{
            width: width,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={GlobalStyles.title}>Andres CV</Text>
          <Text style={GlobalStyles.subtitle}>{item.text}</Text>
        </View>
      )}
    />
  );
}
