"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

type Opts = {
  moduleId: "welcome";
  /** lessons that must be completed to view this page */
  requireCompleted: string[];
  /** where to send the user if locked */
  redirectTo?: string;
};

/**
 * Redirects the user away if they haven't completed required lessons.
 * Use inside client components (lessons).
 */
export default function useLessonGate({
  moduleId,
  requireCompleted,
  redirectTo = "/course/welcome",
}: Opts) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      const ref = doc(db, "users", u.uid, "progress", moduleId);
      const snap = await getDoc(ref);
      const completed: string[] = (snap.data()?.completedLessonIds ??
        []) as string[];
      const ok = requireCompleted.every((id) => completed.includes(id));
      if (!ok) router.replace(redirectTo);
      setChecked(true);
    });
    return () => unsub();
  }, [moduleId, requireCompleted, redirectTo, router]);

  return checked; // optional “ready” flag if you want to delay rendering
}
