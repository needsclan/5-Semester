// components/useUserCv.js
import { useEffect, useState, useCallback } from "react";
import { rtdb, storage } from "../database/database";
import { ref, update, get, child } from "firebase/database";
import { ref as sref, uploadBytes, getDownloadURL } from "firebase/storage";

export function useUserCv(uid) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // --- FELTER (inkl. headline) ---
  const [headline, setHeadline] = useState("");
  const [text, setText] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

  const [region, setRegion] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [age, setAge] = useState("");          // UI som string
  const [yearsExp, setYearsExp] = useState(""); 
  const [availability, setAvailability] = useState("");

  // UI holder skills/languages som kommasepareret tekst
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const [salaryMin, setSalaryMin] = useState("");

  // --- LOAD ---
  useEffect(() => {
    const load = async () => {
      if (!uid) return setLoading(false);
      try {
        const snap = await get(child(ref(rtdb), `cvs/${uid}`));
        if (snap.exists()) {
          const data = snap.val() || {};

          setHeadline(data.headline ?? "");
          setText(data.text ?? "");

          // læs begge mulige feltnavne for billede
          setPhotoUri(data.photoUrl ?? data.photoUri ?? null);

          setRegion(data.region ?? "");
          setEducationLevel(data.educationLevel ?? "");
          setAge(data.age != null ? String(data.age) : "");
          setYearsExp(data.yearsExp != null ? String(data.yearsExp) : "");
          setAvailability(data.availability ?? "");

          setSkills(
            Array.isArray(data.skills) ? data.skills.join(", ") : (data.skills ?? "")
          );
          setLanguages(
            Array.isArray(data.languages) ? data.languages.join(", ") : (data.languages ?? "")
          );
          setSalaryMin(data.salaryMin != null ? String(data.salaryMin) : "");
        }
      } catch (e) {
        setError(e.message || "Kunne ikke hente CV");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [uid]);

  // --- UPLOAD BILLEDE ---
  const uploadImageAsync = useCallback(async (uri, userId) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const type = blob.type || "image/jpeg";
    const ext = (type.split("/")[1] || "jpg").split(";")[0];
    const storageRef = sref(storage, `avatars/${userId}/profile.${ext}`);
    await uploadBytes(storageRef, blob, { contentType: type });
    return await getDownloadURL(storageRef);
  }, []);

  // --- SAVE (kan kaldes som save() eller save(payload)) ---
  const save = useCallback(async (payload = {}) => {
    if (!uid) return;

    setSaving(true);
    setError(null);

    try {
      // 1) billede
      let nextPhotoUrl = null;
      const src = payload.photoUri ?? photoUri;
      if (src?.startsWith?.("file://")) {
        nextPhotoUrl = await uploadImageAsync(src, uid);
      } else if (src?.startsWith?.("http")) {
        nextPhotoUrl = src;
      }

      // 2) normalisering
      const parseArr = (v, fallbackText) => {
        if (Array.isArray(v)) return v;
        const textVal = typeof v === "string" ? v : fallbackText || "";
        return textVal
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);
      };

      const next = {
        // tekstfelter
        headline: (payload.headline ?? headline ?? "").trim(),
        text: payload.text ?? text ?? "",

        // billede -> skriv til photoUrl (Swipe læser det)
        photoUrl: nextPhotoUrl ?? (payload.photoUrl ?? null),

        // søgefelter
        region: (payload.region ?? region) || null,
        educationLevel: (payload.educationLevel ?? educationLevel) || null,
        availability: (payload.availability ?? availability) || null,

        age: payload.age ?? (age ? Number(age) : null),
        yearsExp: payload.yearsExp ?? (yearsExp ? Number(yearsExp) : null),
        salaryMin: payload.salaryMin ?? (salaryMin ? Number(salaryMin) : null),

        skills: parseArr(payload.skills, skills).length
          ? parseArr(payload.skills, skills)
          : null,
        languages: parseArr(payload.languages, languages).length
          ? parseArr(payload.languages, languages)
          : null,

        ts: Date.now(),
      };

      // Fjern undefined (behold null — det sletter feltet i update)
      Object.keys(next).forEach((k) => {
        if (next[k] === undefined) delete next[k];
      });

      // 3) skriv – update overskriver kun de nævnte felter
      await update(ref(rtdb, `cvs/${uid}`), next);

    } catch (e) {
      setError(e.message || "Kunne ikke gemme CV");
    } finally {
      setSaving(false);
    }
  }, [
    uid, headline, text, photoUri, region, educationLevel, availability,
    age, yearsExp, salaryMin, skills, languages, uploadImageAsync
  ]);

  return {
    // state + setters
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
    salaryMin, setSalaryMin,

    // status + actions
    loading, saving, error, save,
  };
}
