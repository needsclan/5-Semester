import React, { useLayoutEffect } from "react";
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

export default function EditCVScreen({ navigation }) {
  const uid = auth.currentUser?.uid ?? null;

  const {
    headline, setHeadline,
    text, setText,
    photoUri, setPhotoUri,
    region, setRegion,
    educationLevel, setEducationLevel,
    age, setAge,
    yearsExp, setYearsExp,
    availability, setAvailability,
    skills, setSkills,
    languages, setLanguages,    
    loading, saving, error, save,
  } = useUserCv(uid);

  // — Gem: normaliser og send til hook —
  const onSave = () => {
    const payload = {
      headline: (headline || "").trim(),
      text,
      photoUri, // hook uploader hvis file://, ellers gemmer url
      region,
      educationLevel,
      availability,
      age: age ? Number(age) : null,
      yearsExp: yearsExp ? Number(yearsExp) : null,
      skills: inputToArr(skills),
      languages: inputToArr(languages),
    };
    save(payload);
  };

  // Header: lille "Gem" knap i højre side
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Rediger CV",
      headerRight: () => (
        <TouchableOpacity
          onPress={onSave}
          disabled={saving || loading}
          style={{ marginRight: 12, opacity: saving || loading ? 0.6 : 1 }}
        >
          <Text style={{ fontWeight: "700" }}>{saving ? "Gemmer…" : "Gem"}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, saving, loading, headline, text, photoUri, region, educationLevel, availability, age, yearsExp, skills, languages]);

  if (loading) return <Text style={{ padding: 16 }}>Henter…</Text>;

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
        {/* Topkort med billede + headline */}
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <TouchableOpacity onPress={chooseImage}>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{ width: 140, height: 140, borderRadius: 8, marginBottom: 8 }}
              />
            ) : (
              <View
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 8,
                  marginBottom: 8,
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
            placeholder="Headline (fx: Frontend udvikler, Dataanalytiker)"
            placeholderTextColor="#888"
            style={[GlobalStyles.input, { width: "100%" }]}
            value={headline}
            onChangeText={setHeadline}
          />
        </View>

        {/* Fritekst / summary */}
        <Text style={{ fontWeight: "700", marginBottom: 6 }}>Profil</Text>
        <TextInput
          placeholder="Kort profil/summary…"
          placeholderTextColor="#888"
          style={[GlobalStyles.input, { height: 160, textAlignVertical: "top" }]}
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* Region */}
        <Text style={{ fontWeight: "700", marginTop: 12 }}>Region</Text>
        <View style={[GlobalStyles.input, { padding: 0 }]}>
          <Picker selectedValue={region} onValueChange={setRegion}>
            {DK_REGIONS.map((r) => (
              <Picker.Item key={r || "empty"} label={r || "Vælg…"} value={r} />
            ))}
          </Picker>
        </View>

        {/* Uddannelse */}
        <Text style={{ fontWeight: "700", marginTop: 12 }}>Uddannelsesniveau</Text>
        <View style={[GlobalStyles.input, { padding: 0 }]}>
          <Picker selectedValue={educationLevel} onValueChange={setEducationLevel}>
            {EDU_LEVELS.map((e) => (
              <Picker.Item key={e || "empty"} label={e || "Vælg…"} value={e} />
            ))}
          </Picker>
        </View>

        {/* Alder + erfaring */}
        <Text style={{ fontWeight: "700", marginTop: 12 }}>Alder & erfaring</Text>
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
        <Text style={{ fontWeight: "700", marginTop: 12 }}>Tilgængelighed</Text>
        <View style={[GlobalStyles.input, { padding: 0 }]}>
          <Picker selectedValue={availability} onValueChange={setAvailability}>
            {AVAIL.map((a) => (
              <Picker.Item key={a || "empty"} label={a || "Vælg…"} value={a} />
            ))}
          </Picker>
        </View>

        {/* Skills + sprog */}
        <Text style={{ fontWeight: "700", marginTop: 12 }}>Skills & sprog</Text>
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

        {!!error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}

        {/* Ingen stor bundknap – “Gem” ligger i headeren */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
