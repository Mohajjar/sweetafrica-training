// src/lib/progress.ts
import type { ModuleId } from "@/lib/curriculum";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  arrayUnion,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";

/** Mark a lesson as completed (idempotent via arrayUnion). */
export async function markLessonComplete(
  uid: string,
  moduleId: ModuleId,
  lessonId: string
) {
  const ref = doc(db, "users", uid, "progress", moduleId);
  await setDoc(
    ref,
    {
      completedLessonIds: arrayUnion(lessonId),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Save a quiz attempt and set quizPassed=true when passed. */
export async function saveQuizAttempt(
  uid: string,
  moduleId: ModuleId,
  attempt: { percent: number; correct: number; total: number; passed: boolean }
) {
  // Store attempt in a subcollection
  const attemptsCol = collection(
    db,
    "users",
    uid,
    "quizzes",
    moduleId,
    "attempts"
  );
  await addDoc(attemptsCol, { ...attempt, ts: serverTimestamp() });

  // Update quiz meta + (optionally) mark progress.quizPassed
  const quizMetaRef = doc(db, "users", uid, "quizzes", moduleId);
  await setDoc(
    quizMetaRef,
    {
      last: { ...attempt, ts: serverTimestamp() },
      passed: attempt.passed,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  if (attempt.passed) {
    const progRef = doc(db, "users", uid, "progress", moduleId);
    await setDoc(
      progRef,
      { quizPassed: true, updatedAt: serverTimestamp() },
      { merge: true }
    );
  }
}
