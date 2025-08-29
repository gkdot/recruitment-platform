import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Core services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics only in browser & if supported
export let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized.");
    } else {
      console.warn("Firebase Analytics not supported in this environment.");
    }
  });
}

// Connect to emulators in development
let authEmulatorConnected = false;
let firestoreEmulatorConnected = false;
let storageEmulatorConnected = false;

if (import.meta.env.DEV) {
  console.log("Connecting Firebase services to local emulators...");
  if (!authEmulatorConnected) {
    try {
      connectAuthEmulator(auth, "http://localhost:9099");
      authEmulatorConnected = true;
    } catch (err) {
      if (
        err instanceof Error &&
        err.message &&
        err.message.includes("emulator already connected")
      ) {
        // Ignore already connected error
      } else {
        console.error("Error connecting Auth emulator:", err);
      }
    }
  }
  if (!firestoreEmulatorConnected) {
    try {
      connectFirestoreEmulator(db, "localhost", 8080);
      firestoreEmulatorConnected = true;
    } catch (err) {
      if (
        err instanceof Error &&
        err.message &&
        err.message.includes("emulator already connected")
      ) {
        // Ignore already connected error
      } else {
        console.error("Error connecting Firestore emulator:", err);
      }
    }
  }
  if (!storageEmulatorConnected) {
    try {
      connectStorageEmulator(storage, "localhost", 9199);
      storageEmulatorConnected = true;
    } catch (err) {
      if (
        err instanceof Error &&
        err.message &&
        err.message.includes("emulator already connected")
      ) {
        // Ignore already connected error
      } else {
        console.error("Error connecting Storage emulator:", err);
      }
    }
  }
}

export default app;
