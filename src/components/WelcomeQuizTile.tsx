"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";

export default function WelcomeQuizTile() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonsDone, setLessonsDone] = useState<number>(0);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);
  const [lastPercent, setLastPercent] = useState<number | null>(null);

  // Track current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  // Subscribe to progress + quiz meta
  useEffect(() => {
    if (!uid) {
      setLoading(true);
      setLessonsDone(0);
      setQuizPassed(false);
      setLastPercent(null);
      return;
    }

    const progRef = doc(db, "users", uid, "progress", "welcome");
    const quizRef = doc(db, "users", uid, "quizzes", "welcome");

    let unsubProg: Unsubscribe | null = null;
    let unsubQuiz: Unsubscribe | null = null;

    unsubProg = onSnapshot(progRef, (snap) => {
      const doneArr = Array.isArray(snap.data()?.completedLessonIds)
        ? (snap.data()!.completedLessonIds as unknown[])
        : [];
      setLessonsDone(doneArr.length);
      setLoading(false);
    });

    unsubQuiz = onSnapshot(quizRef, (snap) => {
      const data = snap.data() as
        | { passed?: boolean; last?: { percent?: number } }
        | undefined;
      setQuizPassed(Boolean(data?.passed));
      setLastPercent(
        typeof data?.last?.percent === "number" ? data!.last!.percent : null
      );
    });

    return () => {
      if (unsubProg) unsubProg();
      if (unsubQuiz) unsubQuiz();
    };
  }, [uid]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border p-6 md:p-8">
        <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-56 bg-gray-200 rounded" />
      </div>
    );
  }

  const unlocked = lessonsDone >= 3;

  return (
    <div className="bg-white rounded-xl shadow-md border p-6 md:p-8">
      <div className="text-xs font-semibold text-gray-500 mb-1">Section 1</div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">Section 1 - Quiz</h4>

      {!unlocked ? (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Locked — complete all lessons in Section 1 to unlock the quiz.
          </p>
          <span className="inline-block text-sm text-gray-500 font-medium bg-gray-100 rounded-full px-4 py-2">
            Locked
          </span>
        </>
      ) : quizPassed ? (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Passed{lastPercent != null ? ` — last score ${lastPercent}%` : ""}.
            You can view your certificate or retake the quiz anytime.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
              ✓ Passed
            </span>
            <Link
              href="/course/welcome/quiz/success"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-5 py-2 text-sm font-semibold shadow"
            >
              View Certificate
            </Link>
            <Link
              href="/course/welcome/quiz"
              className="inline-flex items-center rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 text-sm font-semibold shadow"
            >
              Review / Retake →
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Take the Section 1 quiz to complete this section and record your
            certification.
          </p>
          <Link
            href="/course/welcome/quiz"
            className="inline-flex items-center rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 text-sm font-semibold shadow"
          >
            Take Quiz →
          </Link>
        </>
      )}
    </div>
  );
}
