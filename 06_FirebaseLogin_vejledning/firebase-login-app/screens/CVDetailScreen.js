// screens/CVDetailScreen.js
import React from "react";
import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function CVDetailScreen() {
  const { height } = useWindowDimensions();
  const { params } = useRoute();
  const navigation = useNavigation();
  const cv = params?.cv;

  if (!cv) return null;

  return (
    <Pressable style={{ flex: 1, backgroundColor: "#000" }} onPress={() => navigation.goBack()}>
      <View style={{ flex: 1, padding: 24 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height * 0.1 }}>
          <Text style={{ fontSize: 24, fontWeight: "800", color: "#fff", marginBottom: 12 }}>CV</Text>
          <Text style={{ fontSize: 16, color: "#fff", lineHeight: 22 }}>{cv.text || ""}</Text>
        </ScrollView>
      </View>
    </Pressable>
  );
}
