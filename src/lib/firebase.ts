// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// IMPORTANT: only initialize in the browser so Netlify build/prerender doesn't touch Firebase
const isBrowser = typeof window !== "undefined";

const app = isBrowser
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : undefined;

// We export auth/db as any on the server to avoid crashes during static export.
// In client components they will be real instances.
export const auth: any = isBrowser && app ? getAuth(app) : undefined;
export const db: any = isBrowser && app ? getFirestore(app) : undefined;

export { app };
