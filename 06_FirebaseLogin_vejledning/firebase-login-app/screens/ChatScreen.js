// screens/ChatScreen.js
import React, { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
import {
  View, FlatList, TextInput, TouchableOpacity, Text,
  KeyboardAvoidingView, Platform
} from "react-native";
import { ref, onChildAdded, push, set, get, update, serverTimestamp } from "firebase/database";
import { rtdb, auth } from "../database/database";
import { useRoute, useNavigation } from "@react-navigation/native";

// henter et visningsnavn for en given bruger
const getUsername = async (uid) => {
  if (!uid) return null;
  const u = await get(ref(rtdb, `users/${uid}/username`));
  if (u.exists()) return u.val();
  const h = await get(ref(rtdb, `cvs/${uid}/headline`));
  if (h.exists()) return h.val();
  return uid;
};

export default function ChatScreen() {
  // navigation og parametre fra ruten
  const { params } = useRoute();
  const navigation = useNavigation();

  // id for chatten og modpartens bruger id
  const chatId = params?.chatId;
  const otherUid = params?.otherUid;

  // nuværende bruger id
  const uid = auth.currentUser?.uid;

  // state for beskeder, input tekst og visningsnavne
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [myName, setMyName] = useState("");
  const [otherName, setOtherName] = useState("");

  // reference til FlatList for autoscroll
  const flatListRef = useRef(null);

  // henter visningsnavne for begge parter
  useEffect(() => {
    (async () => {
      if (!uid || !otherUid) return;
      const [me, other] = await Promise.all([getUsername(uid), getUsername(otherUid)]);
      setMyName(me || "");
      setOtherName(other || "");
    })();
  }, [uid, otherUid]);

  // sætter skærmtitel til modpartens navn
  useLayoutEffect(() => {
    navigation.setOptions({ title: otherName || "Chat" });
  }, [navigation, otherName]);

  // realtime stream af beskeder for den valgte chat
  useEffect(() => {
    if (!chatId) return;
    setMsgs([]);

    const msgsRef = ref(rtdb, `messages/${chatId}`);
    const unsubscribe = onChildAdded(msgsRef, (snap) => {
      const m = snap.val();
      setMsgs((prev) => {
        if (prev.some(x => x.id === snap.key)) return prev;
        return [...prev, { id: snap.key, ...m }];
      });
    });

    return () => unsubscribe();
  }, [chatId]);

  // autoscroll til bunden når der kommer nye beskeder
  useEffect(() => {
    if (!flatListRef.current || msgs.length === 0) return;
    const t = setTimeout(() => {
      flatListRef.current?.scrollToEnd?.({ animated: true });
    }, 50);
    return () => clearTimeout(t);
  }, [msgs.length]);

  // sikrer at userChats noder findes for begge parter
  useEffect(() => {
    const init = async () => {
      if (!uid || !otherUid || !chatId) return;

      const myRef = ref(rtdb, `userChats/${uid}/${chatId}`);
      const otherRef = ref(rtdb, `userChats/${otherUid}/${chatId}`);

      const [mySnap, otherSnap] = await Promise.all([get(myRef), get(otherRef)]);
      if (!mySnap.exists()) {
        await set(myRef, { otherUid, otherUsername: otherName || otherUid, lastMessage: "", updatedAt: serverTimestamp() });
      }
      if (!otherSnap.exists()) {
        await set(otherRef, { otherUid: uid, otherUsername: myName || uid, lastMessage: "", updatedAt: serverTimestamp() });
      }
    };
    init();
  }, [uid, otherUid, chatId, myName, otherName]);

  // sender en tekstbesked og opdaterer metadata for begge parter
  const send = useCallback(async () => {
    const t = text.trim();
    if (!t || !uid || !chatId) return;
    setText("");

    const msgRef = push(ref(rtdb, `messages/${chatId}`));
    await set(msgRef, {
      text: t,
      senderId: uid,
      createdAt: serverTimestamp(),
    });

    const metaMe = { otherUid, otherUsername: otherName || otherUid, lastMessage: t, updatedAt: serverTimestamp() };
    const metaOther = { otherUid: uid, otherUsername: myName || uid, lastMessage: t, updatedAt: serverTimestamp() };

    await update(ref(rtdb, `userChats/${uid}/${chatId}`), metaMe);
    await update(ref(rtdb, `userChats/${otherUid}/${chatId}`), metaOther);
  }, [text, uid, otherUid, chatId, myName, otherName]);

  // simpel chat ui med liste og composer
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <FlatList
        ref={flatListRef}
        style={{ flex: 1, padding: 12 }}
        data={[...msgs].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))}
        keyExtractor={(m) => String(m.id)}
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

      <View style={{ flexDirection: "row", padding: 8, borderTopWidth: 1, borderColor: "#eee" }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Skriv en besked…"
          style={{ flex: 1, padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, marginRight: 8 }}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={send} style={{ paddingHorizontal: 16, justifyContent: "center", opacity: text.trim() ? 1 : 0.5 }}>
          <Text style={{ fontWeight: "700" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
