import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, useWindowDimensions, Pressable } from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { ref, get, child } from "firebase/database";
import { rtdb, auth } from "../database/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

// Helpers
const toLabel = (v) => {
  if (v == null) return "";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") return Object.values(v).map(String).join(", ");
  return String(v);
};

const formatDKK = (n) =>
  typeof n === "number"
    ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : String(n);

export default function SwipeCVScreen() {
  const [cvs, setCvs] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const snapshot = await get(child(ref(rtdb), "cvs"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const me = auth.currentUser?.uid;
          const others = Object.entries(data)
            .filter(([uid]) => uid !== me)
            .map(([uid, val]) => ({ uid, ...val }));
          setCvs(others);
        } else {
          setCvs([]);
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

  const InfoBlock = ({ item }) => (
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
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: "#fff",
          marginBottom: 8,
        }}
      >
        {item.headline ? item.headline : "Andres CV"}
      </Text>

      {item.region ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>📍 {item.region}</Text>
      ) : null}

      {item.educationLevel ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>🎓 {item.educationLevel}</Text>
      ) : null}

      {item.age ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>👤 {item.age} år</Text>
      ) : null}

      {item.yearsExp ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>💼 {item.yearsExp} års erfaring</Text>
      ) : null}

      {item.availability ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>🕓 {item.availability}</Text>
      ) : null}

      {item.skills ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>🧠 {toLabel(item.skills)}</Text>
      ) : null}

      {item.languages ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>🌍 {toLabel(item.languages)}</Text>
      ) : null}

      {item.salaryMin ? (
        <Text style={{ fontSize: 16, color: "#fff" }}>
          💰 Ønsket min. løn: {formatDKK(item.salaryMin)} DKK/mdr
        </Text>
      ) : null}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={cvs}
        keyExtractor={(item) => item.uid}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          // 🔽 Hele skærmen er klikbar
          <Pressable
            style={{ width, height }}
            onPress={() =>
              // i onPress
              navigation.navigate("CVDetail", { cv: item })
            }
          >
            {item.photoUrl ? (
              <ImageBackground source={{ uri: item.photoUrl }} style={{ width, height }} resizeMode="cover">
                <InfoBlock item={item} />
              </ImageBackground>
            ) : (
              <View style={{ width, height, backgroundColor: "#111", alignItems: "center", justifyContent: "center", padding: 20 }}>
                <Text style={{ color: "#aaa", marginBottom: 12 }}>Ingen billede</Text>
                <InfoBlock item={item} />
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}
