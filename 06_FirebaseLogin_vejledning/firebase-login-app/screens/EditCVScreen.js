// screens/EditCVScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { auth, rtdb, storage } from "../database/database";
import { ref, set, get, child } from "firebase/database";
import { ref as sref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function EditCVScreen() {
  const [cv, setCv] = useState("");
  const [photoUri, setPhotoUri] = useState(null); // kan være file:// eller https://
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const load = async () => {
      try {
        if (!uid) return;
        const snap = await get(child(ref(rtdb), `cvs/${uid}`));
        if (snap.exists()) {
          const data = snap.val();
          setCv(data.text ?? "");
          if (data.photoUrl) setPhotoUri(data.photoUrl); // hent URL fra DB
        }
      } catch (e) {
        console.log("CV load error:", e.code || e.message);
      }
    };
    load();
  }, [uid]);

  const chooseImage = () => {
    Alert.alert("Profilbillede", "Vælg hvordan du vil tilføje et billede", [
      { text: "Kamera", onPress: openCamera },
      { text: "Bibliotek", onPress: openGallery },
      { text: "Annuller", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ingen adgang", "Giv kameratilladelse i indstillinger.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ingen adgang", "Giv adgang til billedbiblioteket i indstillinger.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  // --- Upload til Storage med korrekt contentType og stabil sti ---
  const uploadImageAsync = async (uri, userId) => {
    // hent fil som blob
    const res = await fetch(uri);
    const blob = await res.blob();

    const type = blob.type || "image/jpeg";      // fx image/jpeg, image/png, image/heic
    const ext = type.split("/")[1] || "jpg";     // "jpeg" | "png" | "heic" ...

    // brug mappe pr. bruger -> undgår problemer med dots i rules
    const storageRef = sref(storage, `avatars/${userId}/profile.${ext}`);

    // sørg for contentType
    await uploadBytes(storageRef, blob, { contentType: type });

    // hent offentlig URL
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    try {
      if (!uid) {
        Alert.alert("Ikke logget ind", "Prøv at logge ind igen.");
        return;
      }

      let photoUrl = null;
      if (photoUri?.startsWith("file://")) {
        // lokalt billede -> upload til Storage
        photoUrl = await uploadImageAsync(photoUri, uid);
      } else if (photoUri?.startsWith("http")) {
        // allerede en URL (fra tidligere gemt)
        photoUrl = photoUri;
      }

      await set(ref(rtdb, `cvs/${uid}`), {
        text: cv,
        photoUrl: photoUrl ?? null,
        ts: Date.now(),
      });

      Alert.alert("Gemt", "Dit CV er gemt.");
    } catch (e) {
      console.log("STORAGE UPLOAD ERROR:", e.code, e.message, e.serverResponse, e.customData);
      Alert.alert("Fejl ved gem", `${e.code || "unknown"}\n${e.message}`);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Rediger dit CV</Text>

      {/* Klikbart billede / placeholder */}
      <TouchableOpacity onPress={chooseImage}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 140, height: 140, borderRadius: 8, marginBottom: 12 }}
          />
        ) : (
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 8,
              marginBottom: 12,
              backgroundColor: "#eee",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="camera-outline" size={40} color="#666" />
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Skriv dit CV her…"
        placeholderTextColor="#888"
        style={[GlobalStyles.input, { height: 220, textAlignVertical: "top" }]}
        value={cv}
        onChangeText={setCv}
        multiline
      />

      <TouchableOpacity style={GlobalStyles.button} onPress={handleSave}>
        <Text style={GlobalStyles.buttonText}>Gem CV</Text>
      </TouchableOpacity>
    </View>
  );
}
