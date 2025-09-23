import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Indsæt din egen config her fra Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBPTT5IDnrGvZRQsg_RbVi0Cmm3Lc8ixt0",
  authDomain: "test-ba561.firebaseapp.com",
  projectId: "test-ba561",
  storageBucket: "test-ba561.firebasestorage.app",
  messagingSenderId: "459976644101",
  appId: "1:459976644101:web:47802769f70afdcce66e6c"
};
// Init kun én gang
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Brug RTDB-URL’en fra Realtime Database (Belgium = europe-west1)
export const rtdb = getDatabase(
  firebaseApp,
  "https://test-ba561-default-rtdb.europe-west1.firebasedatabase.app/"
  
);