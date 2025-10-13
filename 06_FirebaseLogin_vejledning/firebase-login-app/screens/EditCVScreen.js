import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import GlobalStyles from "../style/GlobalStyle";
import { auth } from "../database/database";
import { useUserCv } from "../components/useUserCv";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

// Værdilister
const DK_REGIONS = ["", "Hovedstaden", "Sjælland", "Syddanmark", "Midtjylland", "Nordjylland"];
const EDU_LEVELS = ["", "Folkeskole", "Gymnasial", "Erhvervsuddannelse", "Bachelor", "Kandidat", "PhD"];
const AVAIL = ["", "Fuldtid", "Deltid", "Freelance/Kontrakt", "Studiejob", "Praktik"];

// vis arrays som kommasepareret tekst i inputs
const arrToInput = (v) => (Array.isArray(v) ? v.join(", ") : v || "");
const inputToArr = (s) =>
  (s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export default function EditCVScreen() {
  const uid = auth.currentUser?.uid ?? null;

  const {
    // NYT: headline
    headline, setHeadline,

    text, setText,
    photoUri, setPhotoUri,
    region, setRegion,
    educationLevel, setEducationLevel,
    age, setAge,
    yearsExp, setYearsExp,
    availability, setAvailability,
<<<<<<< Updated upstream
=======
    // remoteOk fjernet
>>>>>>> Stashed changes
    skills, setSkills,
    languages, setLanguages,
    salaryMin, setSalaryMin,
    loading, saving, error, save,
  } = useUserCv(uid);

  if (loading) return <Text>Henter...</Text>;

<<<<<<< Updated upstream
  // — Billedevalg via ImagePicker —
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
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 0.8 });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ingen adgang", "Giv adgang til billedbiblioteket i indstillinger.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false, quality: 0.8 });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  // — Gem: normaliser og send til hook —
  const onSave = () => {
    const payload = {
      headline: (headline || "").trim(),
      text,
      photoUri, // hook uploader hvis file://, ellers gemmer url
=======
  // Saml og normaliser payload før gem
  const onSave = () => {
    const payload = {
      headline: (headline || "").trim(),   // kort titel på kortet
      text,                                 // summary/fritekst
      photoUri,
>>>>>>> Stashed changes
      region,
      educationLevel,
      availability,
      age: age ? Number(age) : null,
      yearsExp: yearsExp ? Number(yearsExp) : null,
      salaryMin: salaryMin ? Number(salaryMin) : null,
      skills: inputToArr(skills),
      languages: inputToArr(languages),
<<<<<<< Updated upstream
=======
      // evt. keywords/searchText/embedding genereres i hook/CF
>>>>>>> Stashed changes
    };
    save(payload);
  };

  return (
    <KeyboardAvoidingView
      style={GlobalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={GlobalStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={GlobalStyles.title}>Rediger dit CV</Text>

        {/* Klikbart billede eller placeholder */}
        <TouchableOpacity onPress={chooseImage} style={{ alignSelf: "center" }}>
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

        {/* Headline (kort titel) */}
        <TextInput
          placeholder="Headline (fx: Frontend udvikler, Dataanalytiker)"
          placeholderTextColor="#888"
          style={GlobalStyles.input}
          value={headline}
          onChangeText={setHeadline}
        />

        {/* Fritekst / summary */}
        <TextInput
          placeholder="Kort profil/summary…"
          placeholderTextColor="#888"
          style={[GlobalStyles.input, { height: 160, textAlignVertical: "top" }]}
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* Region */}
        <Text>Region</Text>
        <View style={[GlobalStyles.input, { padding: 0 }]}>
          <Picker selectedValue={region} onValueChange={setRegion}>
            {DK_REGIONS.map((r) => (
              <Picker.Item key={r || "empty"} label={r || "Vælg…"} value={r} />
            ))}
          </Picker>
        </View>

        {/* Uddannelse */}
        <Text>Uddannelsesniveau</Text>
        <View style={[GlobalStyles.input, { padding: 0 }]}>
          <Picker selectedValue={educationLevel} onValueChange={setEducationLevel}>
            {EDU_LEVELS.map((e) => (
              <Picker.Item key={e || "empty"} label={e || "Vælg…"} value={e} />
            ))}
          </Picker>
        </View>

        {/* Alder + erfaring */}
        <TextInput
          placeholder="Alder (år)"
          keyboardType="number-pad"
          style={GlobalStyles.input}
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          placeholder="Erfaringsår (fx 3)"
          keyboardType="number-pad"
          style={GlobalStyles.input}
          value={yearsExp}
          onChangeText={setYearsExp}
        />

        {/* Tilgængelighed */}
        <Text>Tilgængelighed</Text>
        <View style={[GlobalStyles.input, { padding: 0 }]}>
          <Picker selectedValue={availability} onValueChange={setAvailability}>
            {AVAIL.map((a) => (
              <Picker.Item key={a || "empty"} label={a || "Vælg…"} value={a} />
            ))}
          </Picker>
        </View>

        {/* Skills + sprog (kommasepareret i UI) */}
        <TextInput
          placeholder="Skills (kommasepareret, fx: JavaScript, React, Firebase)"
          style={GlobalStyles.input}
          value={arrToInput(skills)}
          onChangeText={setSkills}
        />
        <TextInput
          placeholder="Sprog (kommasepareret, fx: Dansk, Engelsk)"
          style={GlobalStyles.input}
          value={arrToInput(languages)}
          onChangeText={setLanguages}
        />

        {/* Løn */}
        <TextInput
          placeholder="Ønsket min. løn (DKK/mdr)"
          keyboardType="number-pad"
          style={GlobalStyles.input}
          value={salaryMin}
          onChangeText={setSalaryMin}
        />

        <TouchableOpacity style={GlobalStyles.button} onPress={onSave} disabled={saving}>
          <Text style={GlobalStyles.buttonText}>{saving ? "Gemmer..." : "Gem CV"}</Text>
        </TouchableOpacity>

        {!!error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
