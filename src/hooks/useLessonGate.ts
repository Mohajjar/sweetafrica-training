// src/hooks/useLessonGate.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import type { ModuleId } from "@/lib/curriculum"; // ✅ make sure we use the union type

type LessonGateOpts = {
  moduleId: ModuleId; // ✅ allow "welcome" | "fundamentals"
  requireCompleted?: string[]; // lesson ids that must be completed
  redirectTo?: string; // optional custom redirect
};

export default function useLessonGate(opts: LessonGateOpts) {
  const { moduleId, requireCompleted = [], redirectTo } = opts;
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }

      // Check the user's progress doc for this module
      const ref = doc(db, "users", u.uid, "progress", moduleId);
      const snap = await getDoc(ref);
      const completed: string[] = snap.data()?.completedLessonIds ?? [];

      const allMet = requireCompleted.every((id) => completed.includes(id));
      if (!allMet) {
        // by default, bounce them back to the module page
        router.replace(redirectTo ?? `/course/${moduleId}`);
      }
    });

    return () => unsub();
  }, [moduleId, requireCompleted, redirectTo, router]);
}
