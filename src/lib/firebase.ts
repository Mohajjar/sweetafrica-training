// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const isBrowser = typeof window !== "undefined";

// Initialize app first
const app = isBrowser
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : undefined;

// Safe exports for SSR/static export
export const auth: any = isBrowser && app ? getAuth(app) : undefined;

export const db: any =
  isBrowser && app
    ? initializeFirestore(app, {
        // Auto-detects when fetch streaming is blocked (AdBlock/VPN/proxy)
        experimentalAutoDetectLongPolling: true,
        // If you still have issues, use the stronger option instead:
        // experimentalForceLongPolling: true,

        // Durable local cache + multi-tab coordination
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    : undefined;

export { app };
