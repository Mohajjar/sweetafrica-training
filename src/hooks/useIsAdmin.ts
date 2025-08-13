"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";

type AdminState = {
  loading: boolean;
  isAdmin: boolean;
  uid: string | null;
  user: User | null;
};

/**
 * Subscribes to the signed-in user's Firestore doc at `users/{uid}`
 * and returns `isAdmin` when `role === "admin"`.
 */
export default function useIsAdmin(): AdminState {
  const [state, setState] = useState<AdminState>({
    loading: true,
    isAdmin: false,
    uid: null,
    user: null,
  });

  useEffect(() => {
    let unsubUserDoc: Unsubscribe | null = null;

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      // If signed out
      if (!u) {
        if (unsubUserDoc) unsubUserDoc();
        setState({ loading: false, isAdmin: false, uid: null, user: null });
        return;
      }

      // If signed in
      setState((s) => ({ ...s, loading: true, uid: u.uid, user: u }));

      const userRef = doc(db, "users", u.uid);
      unsubUserDoc = onSnapshot(
        userRef,
        (snap) => {
          const role = snap.data()?.role as string | undefined;
          setState({
            loading: false,
            isAdmin: role === "admin",
            uid: u.uid,
            user: u,
          });
        },
        () => {
          // On error, fail closed (non-admin)
          setState({ loading: false, isAdmin: false, uid: u.uid, user: u });
        }
      );
    });

    return () => {
      unsubAuth();
      if (unsubUserDoc) unsubUserDoc();
    };
  }, []);

  return state;
}
