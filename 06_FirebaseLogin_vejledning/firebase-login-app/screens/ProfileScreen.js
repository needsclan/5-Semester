import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { auth } from "../database/database";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

const Btn = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      padding: 14,
      borderRadius: 12,
      marginVertical: 8,
      backgroundColor: "#eee",
    }}
  >
    <Text style={{ textAlign: "center", fontWeight: "600" }}>{title}</Text>
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [newPass, setNewPass] = useState("");

  // prompt state
  const [pwVisible, setPwVisible] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pendingAction, setPendingAction] = useState(null); // "email" | "password"

  // lille skraldespand i header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ConfirmDelete")}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const reauth = async (password) => {
    const cred = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, cred);
  };

  const askPasswordThen = (action) => {
    setPendingAction(action);
    setPwInput("");
    setPwVisible(true);
  };

  const onConfirmPassword = async () => {
    try {
      setPwVisible(false);
      if (pendingAction === "email") {
        await reauth(pwInput);
        await updateEmail(user, newEmail.trim());
        Alert.alert("Opdateret", "E-mail er ændret.");
      } else if (pendingAction === "password") {
        if (newPass.length < 6) return Alert.alert("For kort", "Min. 6 tegn.");
        await reauth(pwInput);
        await updatePassword(user, newPass);
        setNewPass("");
        Alert.alert("Opdateret", "Kodeord er ændret.");
      }
    } catch (e) {
      Alert.alert("Fejl", e.message);
    } finally {
      setPendingAction(null);
      setPwInput("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Logget ind som: {user?.email}
      </Text>

      {/* Skift e-mail */}
      <Text style={{ fontWeight: "700", marginTop: 14 }}>Ny e-mail</Text>
      <TextInput
        value={newEmail}
        onChangeText={setNewEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 6 }}
      />
      <Btn title="Gem ny e-mail" onPress={() => askPasswordThen("email")} />

      {/* Skift kodeord */}
      <Text style={{ fontWeight: "700", marginTop: 14 }}>Nyt kodeord</Text>
      <TextInput
        value={newPass}
        onChangeText={setNewPass}
        placeholder="Nyt kodeord"
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 6 }}
      />
      <Btn title="Gem nyt kodeord" onPress={() => askPasswordThen("password")} />

      <View style={{ height: 12 }} />
      <Btn
        title="Log ud"
        onPress={async () => {
          try {
            await signOut(auth);
          } catch (e) {
            Alert.alert("Fejl", e.message);
          }
        }}
      />

      {/* Password prompt modal */}
      <Modal
        visible={pwVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPwVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
              Indtast dit nuværende kodeord
            </Text>
            <TextInput
              value={pwInput}
              onChangeText={setPwInput}
              secureTextEntry
              placeholder="Nuværende kodeord"
              style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 6 }}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
              <TouchableOpacity onPress={() => setPwVisible(false)} style={{ marginRight: 16 }}>
                <Text style={{ fontWeight: "600" }}>Annuller</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirmPassword}>
                <Text style={{ fontWeight: "700" }}>Bekræft</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
