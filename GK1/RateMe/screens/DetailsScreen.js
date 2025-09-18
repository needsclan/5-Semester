import React, { useMemo } from "react";
import { SafeAreaView, View, Text, Image, FlatList, ScrollView } from "react-native";
import styles from "../styles/styles";
import { IMAGES } from "../data/images";
import { useRatings } from "../context/RatingsContext";
import StarRating from "../components/StarRating";

export default function DetailsScreen({ route }) {
  const { imageId } = route.params;
  const image = IMAGES.find(x => x.id === imageId);
  const { getRating, setRating, getHistory, getAverage } = useRatings();

  const current = getRating(image.id);
  const average = getAverage(image.id);
  const rows = useMemo(
    () => [...getHistory(image.id)].sort((a,b)=>b.ts-a.ts),
    [imageId, getHistory]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 32 }}>
        <Image source={{ uri: image.url }} style={styles.detailImage} />
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.subtitle}>Gns: {average}/5 – Din: {current || 0}/5</Text>

        <StarRating value={current} onChange={(val) => setRating(image.id, val)} size={34} />

        <Text style={[styles.subtitle, { marginTop: 16 }]}>Din historik:</Text>
        <FlatList
          data={rows}
          keyExtractor={(item, idx) => String(item.ts) + idx}
          style={{ width: "92%" }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" }}>
              <Text style={{ fontWeight: "600" }}>{item.value}/5</Text>
              <Text style={{ color: "#666", fontSize: 12 }}>
                {new Date(item.ts).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
