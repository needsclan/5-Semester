import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, useWindowDimensions } from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { ref, get, child } from "firebase/database";
import { rtdb, auth } from "../database/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function SwipeCVScreen() {
  const [cvs, setCvs] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();       // 👈 hook skal være herinde
  const { width, height } = useWindowDimensions();    // 👈 reagerer på rotation

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
      <View style={[GlobalStyles.container, { backgroundColor: "black" }]}>
        <Text style={GlobalStyles.title}>Ingen CV'er fundet</Text>
      </View>
    );
  }

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
              <ImageBackground
                source={{ uri: item.photoUrl }}
                style={{ width, height }}
                resizeMode="cover"
              >
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    // 🔽 løft overlay over tab-baren
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
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    // 🔽 samme her
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
