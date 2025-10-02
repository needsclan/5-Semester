import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalStyle from "../style/GlobalStyle";

export default function CameraTest({ navigation }) {
  // 2) State og permission
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imagesArr, setImagesArr] = useState([]); // [{ uri }]
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState(false);
  const cameraRef = useRef(null);

  // 3) Håndtering af tilladelser
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <SafeAreaView style={GlobalStyle.container}>
        <Text style={GlobalStyle.text}>We need your permission to show the camera</Text>
        <TouchableOpacity style={{ marginTop: 12 }} onPress={requestPermission}>
          <Text style={GlobalStyle.buttonGallery}>Grant permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 4) Kamera-funktioner
  function toggleFacing() {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }

  async function snap() {
    if (!cameraRef.current) return;
    try {
      setLoading(true);
      const result = await cameraRef.current.takePictureAsync();
      setImagesArr((prev) => [...prev, { uri: result.uri }]);
    } catch (err) {
      console.log("Snap error:", err);
    } finally {
      setLoading(false);
    }
  }

  // 5) Toggle galleri
  function toggleGallery() {
    setGallery((prev) => !prev);
  }

  // 6) Galleriet
  const CameraGallery = () => (
    <View style={GlobalStyle.gallery}>
      <Text style={GlobalStyle.text}>Billeder taget: {imagesArr.length}</Text>
      <ScrollView horizontal style={{ marginTop: 8 }}>
        {imagesArr.length > 0 ? (
          imagesArr.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginRight: 8 }}
              onPress={() => navigation.navigate("image", { image: image.uri })}
            >
              <Image source={{ uri: image.uri }} style={{ width: 80, height: 80, borderRadius: 8 }} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={GlobalStyle.text}>No images taken</Text>
        )}
      </ScrollView>
    </View>
  );

  // 7) Return (CameraView uden children + overlay til knapper)
  return (
    <SafeAreaView style={GlobalStyle.safeview}>
      <View style={{ flex: 1 }}>
        {/* Kameraet fylder hele fladen */}
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} />

        {/* Overlay med kontroller nederst */}
        <View style={[StyleSheet.absoluteFill, styles.overlay]}>
          <View style={GlobalStyle.buttonContainer}>
            {/* Flip kamera */}
            <TouchableOpacity style={GlobalStyle.btn} onPress={toggleFacing}>
              <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Tag billede */}
            <TouchableOpacity style={GlobalStyle.snapbtn} onPress={snap} disabled={loading}>
              <Text style={GlobalStyle.text}>{loading ? "..." : ""}</Text>
            </TouchableOpacity>

            {/* Toggle galleri */}
            <TouchableOpacity style={GlobalStyle.btn} onPress={toggleGallery}>
              <Ionicons name="images-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          {gallery ? <CameraGallery /> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "flex-end",
  },
});
