"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/**
 * When a user is logged in, upsert a root Firestore doc so they appear in the admin Users table.
 * - Does NOT overwrite existing fields (merge: true).
 * - Does NOT touch `role` so existing admin roles are preserved.
 */
export default function EnsureUserDoc() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      try {
        const ref = doc(db, "users", u.uid);
        await setDoc(
          ref,
          {
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            // don't write role here; admins may set it separately
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("ensureUserDoc failed", err);
      }
    });
    return () => unsub();
  }, []);

  return null;
}
