import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, useWindowDimensions } from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { ref, get, child } from "firebase/database";
import { rtdb, auth } from "../database/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function SwipeCVScreen() {
  // State til at gemme CV'er
  const [cvs, setCvs] = useState([]);
  // Højde på tab bar, bruges til at placere overlay
  const tabBarHeight = useBottomTabBarHeight();
  // Skærmens bredde og højde, bruges til at gøre FlatList slides fullscreen
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // Henter CV'er fra Firebase Realtime Database
    const loadCVs = async () => {
      try {
        const snapshot = await get(child(ref(rtdb), "cvs"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Filtrerer det aktuelle brugers CV fra og laver array af de øvrige
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

  // Viser tekst, hvis der ikke findes nogen CV'er
  if (cvs.length === 0) {
    return (
      <View style={[GlobalStyles.container, { backgroundColor: "black" }]}>
        <Text style={GlobalStyles.title}>Ingen CV'er fundet</Text>
      </View>
    );
  }

  // Viser CV'er i en FlatList, der kan swipes horisontalt
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={cvs}
        keyExtractor={(item) => item.uid}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            {item.photoUrl ? (
              // Hvis CV'et har et billede, bruges det som baggrund
              <ImageBackground
                source={{ uri: item.photoUrl }}
                style={{ width, height }}
                resizeMode="cover"
              >
                {/* Overlay med tekst nederst på billedet */}
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: tabBarHeight + 16,
                    padding: 20,
                    backgroundColor: "rgba(0,0,0,0.35)",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 8 }}>
                    Andres CV
                  </Text>
                  <Text style={{ fontSize: 16, color: "#fff" }}>
                    {item.text}
                  </Text>
                </View>
              </ImageBackground>
            ) : (
              // Hvis der ikke er billede, vises en sort baggrund
              <View
                style={{
                  width,
                  height,
                  backgroundColor: "#111",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Text style={{ color: "#aaa", marginBottom: 12 }}>Ingen billede</Text>
                {/* Overlay med tekst også her */}
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: tabBarHeight + 16,
                    padding: 20,
                    backgroundColor: "rgba(0,0,0,0.35)",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 8 }}>
                    Andres CV
                  </Text>
                  <Text style={{ fontSize: 16, color: "#fff" }}>
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
