"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import ProgressBar from "@/components/ProgressBar";
import Shell from "@/components/Shell";
import AuthGuard from "@/components/AuthGuard";
import { moduleTitle, getLessons } from "@/lib/modules";
import type { ModuleId } from "@/lib/modules";
import { getTotalLessons } from "@/lib/curriculum";

export default function ModuleIndex({ moduleId }: { moduleId: ModuleId }) {
  const [percent, setPercent] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [firstUncompletedIndex, setFirstUncompletedIndex] = useState(0);

  const lessons = getLessons(moduleId);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;
      const ref = doc(db, "users", u.uid, "progress", moduleId);
      const unsubSnap = onSnapshot(ref, (snap) => {
        const done = (snap.data()?.completedLessonIds ?? []) as string[];
        setCompleted(done);

        const total = getTotalLessons(moduleId);
        setPercent(
          total ? Math.min(100, Math.round((done.length / total) * 100)) : 0
        );

        // Find the first lesson that is NOT completed
        const firstUncompleted = lessons.findIndex((l) => !done.includes(l.id));
        setFirstUncompletedIndex(
          firstUncompleted === -1 ? lessons.length : firstUncompleted
        );
      });
      return () => unsubSnap();
    });
    return () => unsubAuth();
  }, [moduleId, lessons]);

  const hasQuiz: Record<ModuleId, boolean> = {
    welcome: true,
    fundamentals: true,
    professionalism: false,
  };
  const total = getTotalLessons(moduleId);
  const isComplete = total ? completed.length >= total : false;

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <section className="rounded-3xl border bg-white p-8 md:p-12 shadow-sm mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              {moduleTitle[moduleId]}
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl text-lg font-light">
              Your progress through this section.
            </p>
            <div className="mt-6 md:mt-8">
              <ProgressBar percent={percent} />
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((l, index) => {
              const isLessonLocked = index > firstUncompletedIndex;
              const linkContent = (
                <div
                  className={`inline-block rounded-full px-5 py-2 text-sm font-semibold shadow-md transition-colors ${
                    isLessonLocked
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {completed.includes(l.id)
                    ? "View Lesson"
                    : isLessonLocked
                    ? "Locked"
                    : "Start Lesson"}{" "}
                  →
                </div>
              );

              return (
                <article
                  key={l.id}
                  className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all ${
                    isLessonLocked ? "opacity-60" : "hover:shadow-lg"
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    Lesson {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {l.title}
                  </h3>
                  {isLessonLocked ? (
                    linkContent
                  ) : (
                    <Link href={l.href}>{linkContent}</Link>
                  )}
                </article>
              );
            })}
          </section>

          {hasQuiz[moduleId] && (
            <section className="mt-8">
              <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Assessment</div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {moduleTitle[moduleId]} — Quiz
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {isComplete
                      ? "You’ve finished the lessons. Review the key concepts and then start the quiz."
                      : "Finish all lessons to unlock the section quiz."}
                  </p>
                </div>

                <Link
                  href={`/course/${moduleId}/recap`}
                  className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold shadow-md transition-colors ${
                    isComplete
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
                  }`}
                  aria-disabled={!isComplete}
                >
                  {isComplete ? "Review & Start Quiz →" : "Locked"}
                </Link>
              </div>
            </section>
          )}
        </Shell>
      </div>
    </AuthGuard>
  );
}
