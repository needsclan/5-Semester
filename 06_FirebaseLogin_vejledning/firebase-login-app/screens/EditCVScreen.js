// screens/EditCVScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { auth, rtdb } from "../database/database";
import { ref, set, get, child } from "firebase/database";

export default function EditCVScreen() {
  const [cv, setCv] = useState("");
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    // Hent eksisterende CV
    const load = async () => {
      try {
        if (!uid) return;
        const snap = await get(child(ref(rtdb), `cvs/${uid}`));
        if (snap.exists()) setCv(snap.val().text ?? "");
      } catch (e) {
        console.log("CV load error:", e.code || e.message);
      }
    };
    load();
  }, [uid]);

  const handleSave = async () => {
    try {
      if (!uid) {
        Alert.alert("Ikke logget ind", "Prøv at logge ind igen.");
        return;
      }
      await set(ref(rtdb, `cvs/${uid}`), { text: cv, ts: Date.now() });
      Alert.alert("Gemt", "Dit CV er gemt.");
    } catch (e) {
      Alert.alert("Fejl ved gem", `${e.code || ""}\n${e.message}`);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Rediger dit CV</Text>
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
