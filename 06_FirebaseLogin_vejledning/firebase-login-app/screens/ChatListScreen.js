// screens/ChatListScreen.js
import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text } from "react-native";
import { ref, onValue, query, orderByChild, get, remove } from "firebase/database";
import { rtdb, auth } from "../database/database";
import ChatListItem from "../components/ChatListItem";

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
        otherUsername: v.otherUsername || v.otheruid || v.otherUid,
        lastMessage: v.lastMessage || "",
        updatedAt: v.updatedAt || 0,
      }));
      arr.sort((a, b) => b.updatedAt - a.updatedAt);
      setItems(arr);
    });
    return () => off();
  }, [uid]);

  const open = useCallback((it) => {
    navigation.navigate("Chat", {
      chatId: it.chatId,
      otherUid: it.otherUid,
      otherUsername: it.otherUsername,
    });
  }, [navigation]);

  const deleteChat = useCallback(async (it) => {
    if (!uid) return;
    const { chatId, otherUid } = it;

    // Fjern din reference
    await remove(ref(rtdb, `userChats/${uid}/${chatId}`));

    // Hvis modparten ikke længere har chatten → ryd beskederne
    const otherSnap = await get(ref(rtdb, `userChats/${otherUid}/${chatId}`));
    if (!otherSnap.exists()) {
      await remove(ref(rtdb, `messages/${chatId}`));
    }
  }, [uid]);

  if (!uid) return <Text style={{ padding: 16 }}>Login kræves</Text>;
  if (!items.length) return <Text style={{ padding: 16 }}>Ingen beskeder endnu</Text>;

  return (
    <FlatList
      data={items}
      keyExtractor={(it) => String(it.chatId)}
      renderItem={({ item }) => (
        <ChatListItem item={item} onPress={open} onDelete={deleteChat} />
      )}
    />
  );
}
