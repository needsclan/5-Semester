// screens/ChatScreen.js
import React, { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
import {
  View, FlatList, TextInput, TouchableOpacity, Text,
  KeyboardAvoidingView, Platform
} from "react-native";
import { ref, onChildAdded, push, set, get, update } from "firebase/database";
import { rtdb, auth } from "../database/database";
import { useRoute, useNavigation } from "@react-navigation/native";

const getUsername = async (uid) => {
  if (!uid) return null;
  const u = await get(ref(rtdb, `users/${uid}/username`));
  if (u.exists()) return u.val();
  const h = await get(ref(rtdb, `cvs/${uid}/headline`));
  if (h.exists()) return h.val();
  return uid;
};

export default function ChatScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const chatId = params?.chatId;
  const otherUid = params?.otherUid;
  const uid = auth.currentUser?.uid;

  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [myName, setMyName] = useState("");
  const [otherName, setOtherName] = useState("");

  const flatListRef = useRef(null);

  // Hent navne én gang pr. deltagere
  useEffect(() => {
    (async () => {
      if (!uid || !otherUid) return;
      const [me, other] = await Promise.all([getUsername(uid), getUsername(otherUid)]);
      setMyName(me || "");
      setOtherName(other || "");
    })();
  }, [uid, otherUid]);

  // Sæt header titel = modpartens navn
  useLayoutEffect(() => {
    navigation.setOptions({ title: otherName || "Chat" });
  }, [navigation, otherName]);

  // realtime stream af beskeder (dedup + reset ved chat-skift)
  useEffect(() => {
    if (!chatId) return;
    setMsgs([]); // reset når man åbner anden chat

    const msgsRef = ref(rtdb, `messages/${chatId}`);
    const off = onChildAdded(msgsRef, (snap) => {
      const m = snap.val();
      setMsgs((prev) => {
        if (prev.some(x => x.id === snap.key)) return prev; // ✅ dedup
        return [...prev, { id: snap.key, ...m }];
      });
    });

    return () => off();
  }, [chatId]);

  // Auto-scroll til bunden når der kommer nye beskeder
  useEffect(() => {
    if (!flatListRef.current || msgs.length === 0) return;
    // lille timeout så layoutet er klar
    const t = setTimeout(() => {
      flatListRef.current?.scrollToEnd?.({ animated: true });
    }, 50);
    return () => clearTimeout(t);
  }, [msgs.length]);

  // sørg for userChats-noder findes, inkl. navne
  useEffect(() => {
    const init = async () => {
      if (!uid || !otherUid || !chatId) return;

      const myRef = ref(rtdb, `userChats/${uid}/${chatId}`);
      const otherRef = ref(rtdb, `userChats/${otherUid}/${chatId}`);

      const [mySnap, otherSnap] = await Promise.all([get(myRef), get(otherRef)]);
      if (!mySnap.exists()) {
        await set(myRef, { otherUid, otherUsername: otherName || otherUid, lastMessage: "", updatedAt: Date.now() });
      }
      if (!otherSnap.exists()) {
        await set(otherRef, { otherUid: uid, otherUsername: myName || uid, lastMessage: "", updatedAt: Date.now() });
      }
    };
    init();
  }, [uid, otherUid, chatId, myName, otherName]);

  const send = useCallback(async () => {
    const t = text.trim();
    if (!t || !uid || !chatId) return;
    setText("");

    const msgRef = push(ref(rtdb, `messages/${chatId}`));
    await set(msgRef, {
      text: t,
      senderId: uid,
      createdAt: Date.now(),
    });

    // opdater metadata på begge parter inkl. visningsnavne
    const now = Date.now();
    const metaMe = { otherUid, otherUsername: otherName || otherUid, lastMessage: t, updatedAt: now };
    const metaOther = { otherUid: uid, otherUsername: myName || uid, lastMessage: t, updatedAt: now };

    await update(ref(rtdb, `userChats/${uid}/${chatId}`), metaMe);
    await update(ref(rtdb, `userChats/${otherUid}/${chatId}`), metaOther);
  }, [text, uid, otherUid, chatId, myName, otherName]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <FlatList
        ref={flatListRef}
        style={{ flex: 1, padding: 12 }}
        data={[...msgs].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))}
        keyExtractor={(m) => String(m.id)}            // ✅ stabil string key
        renderItem={({ item }) => {
          const mine = item.senderId === uid;
          const label = mine ? myName : otherName;
          return (
            <View style={{ marginVertical: 4, maxWidth: "85%", alignSelf: mine ? "flex-end" : "flex-start" }}>
              <Text style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>{label}</Text>
              <View style={{ backgroundColor: mine ? "#d1f7c4" : "#eee", padding: 10, borderRadius: 12 }}>
                <Text>{item.text}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* composer */}
      <View style={{ flexDirection: "row", padding: 8, borderTopWidth: 1, borderColor: "#eee" }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Skriv en besked…"
          style={{ flex: 1, padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, marginRight: 8 }}
          onSubmitEditing={send}           // enter = send
          returnKeyType="send"
        />
        <TouchableOpacity onPress={send} style={{ paddingHorizontal: 16, justifyContent: "center" }}>
          <Text style={{ fontWeight: "700" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
