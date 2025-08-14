"use client";

import { useEffect } from "react";
import type { ModuleId } from "@/lib/curriculum"; // <-- this path matters
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { markLessonComplete } from "@/lib/progress";

export default function useAutoGate(
  moduleId: ModuleId,
  currentLessonId: string,
  _requireCompleted: string[] = []
) {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      try {
        await markLessonComplete(u.uid, moduleId, currentLessonId);
      } catch (err) {
        console.error("markLessonComplete failed", err);
      }
    });
    return () => unsub();
  }, [moduleId, currentLessonId]);
}
