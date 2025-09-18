import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { GET_USERS_URL } from "../data/const"; 
// fx "https://randomuser.me/api/"  (uden ?results=)

// ---------------------------------------------------

export default function FetchListScreen() {
  const [user, setUser] = useState([]);
  const [msg, setMsg] = useState("");
  const [amount, setAmount] = useState(2);
  const [amountInput, setAmountInput] = useState("2");

  const loadUsers = async () => {
    try {
      // Byg korrekt URL
      const url = new URL(GET_USERS_URL);
      url.searchParams.set("results", String(amount));
      url.searchParams.set("inc", "name,picture,login"); // begræns til nødvendige felter

      console.log("Fetcher:", url.toString());

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Fetch fejlede");
      const data = await res.json();
      setUser(data.results || []);
      setMsg(`Brugere hentet: ${data.results?.length ?? 0}`);
    } catch (e) {
      setMsg("Fejl: " + e.message);
      setUser([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [amount]);

  return user.length > 0 ? (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, textAlign: "center", padding: 20 }}>
        Brugere i liste: {user.length}
      </Text>

      {/* 👉 TextInput feltet */}
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={amountInput}
        onChangeText={setAmountInput}
        onSubmitEditing={() => {
          const n = Math.max(1, Math.min(50, parseInt(amountInput, 10) || 1));
          setAmount(n);
          setAmountInput(String(n));
        }}
        placeholder="Antal (1-50)"
      />

      <View style={styles.listBox}>
        <ScrollView>
          {user.map((u) => (
            <View key={u.login?.uuid} style={styles.row}>
              <Image
                source={{ uri: u.picture?.thumbnail }}
                style={styles.avatar}
              />
              <Text style={styles.itemText}>
                {u.name?.first} {u.name?.last}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Text>{msg}</Text>
      <StatusBar style="auto" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>{msg || "Loading..."}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// ---------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  listBox: {
    height: 300,
    width: "80%",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  itemText: { fontSize: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    width: "40%",
    textAlign: "center",
  },
});
