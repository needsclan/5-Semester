import React, { useState } from "react";
import { FlatList, Image, Dimensions, Pressable, View, Text } from "react-native";
import { IMAGES } from "../data/images";
import { useRatings } from "../context/RatingsContext";
import styles from "../styles/styles";

const { width, height } = Dimensions.get("window");

export default function GalleryScreen({ navigation }) {
  const { getAverage } = useRatings();
  const [index, setIndex] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={IMAGES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const i = Math.round(ev.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => {
          const avg = getAverage(item.id);

          return (
            <Pressable
              style={{ width, height }} // hver side = fuld skærm
              onPress={() => navigation.navigate("Details", { imageId: item.id })}
            >
              {/* Ydre container opdeler siden i (billede flex:1) + (bar fixed) */}
              <View style={{ flex: 1 }}>
                {/* Billede-område (fylder alt over baren) */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.url }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain" // brug "cover" hvis du vil undgå sorte kanter
                  />
                </View>

                {/* Fast bar nederst */}
                <View style={styles.galleryInfoBar}>
                  <Text style={styles.galleryInfoTitle}>{item.title}</Text>
                  <Text style={styles.galleryInfoRating}>Gns: {avg}/5</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
