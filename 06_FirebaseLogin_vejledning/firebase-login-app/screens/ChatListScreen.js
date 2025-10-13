// screens/ChatListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { rtdb, auth } from "../database/database";

export default function ChatListScreen({ navigation }) {
  const uid = auth.currentUser?.uid;
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!uid) return;
    const q = query(ref(rtdb, `userChats/${uid}`), orderByChild("updatedAt"));
    const off = onValue(q, (snap) => {
      const val = snap.val() || {};
      const arr = Object.entries(val).map(([chatId, v]) => ({
        chatId,
        otherUid: v.otherUid,
        otherUsername: v.otherUsername || v.otheruid || v.otherUid, // fallback
        lastMessage: v.lastMessage || "",
        updatedAt: v.updatedAt || 0,
      }));
      arr.sort((a, b) => b.updatedAt - a.updatedAt);
      setItems(arr);
    });
    return () => off();
  }, [uid]);

  const open = (chatId, otherUid, otherUsername) => {
    navigation.navigate("Chat", { chatId, otherUid, otherUsername });
  };

  if (!uid) return <Text style={{ padding: 16 }}>Login kræves</Text>;
  if (!items.length) return <Text style={{ padding: 16 }}>Ingen beskeder endnu</Text>;

  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.chatId}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => open(item.chatId, item.otherUid, item.otherUsername)}
          style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee", flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          {/* Lille avatar med initialer (valgfrit) */}
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontWeight: "700" }}>
              {item.otherUsername?.slice(0,1)?.toUpperCase() || "?"}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700" }}>
              {item.otherUsername || item.otherUid}
            </Text>
            <Text style={{ color: "#666" }} numberOfLines={1}>
              {item.lastMessage || "…"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
