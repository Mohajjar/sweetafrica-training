"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import ProgressBar from "@/components/ProgressBar";
import { onAuthStateChanged } from "firebase/auth";

export default function FundamentalsModule() {
  const [percent, setPercent] = useState<number>(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // This module currently has 1 lesson
  const TOTAL_LESSONS = 1;

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;

      const ref = doc(db, "users", u.uid, "progress", "fundamentals");
      const unsubSnap = onSnapshot(ref, (snap) => {
        const completed = snap.data()?.completedLessonIds ?? [];
        setCompletedLessonIds(completed);
        setPercent(
          Math.min(100, Math.round((completed.length / TOTAL_LESSONS) * 100))
        );
      });

      return () => unsubSnap();
    });

    return () => unsubAuth();
  }, []);

  const lessons = [
    {
      id: "defining-cleaning",
      module: "Lesson 1",
      title: "Defining Cleaning",
      description:
        "Understand the core purpose of cleaning and how it differs from sanitizing and disinfecting.",
      link: "/course/fundamentals/lesson/defining-cleaning",
    },
  ];

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          {/* Hero */}
          <section className="rounded-3xl border bg-white p-8 md:p-12 shadow-sm mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Fundamentals of <span className="text-green-600">Cleaning</span>
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl text-lg font-light">
              Learn the essentials that make every cleaning routine safe,
              effective, and professional.
            </p>
            <div className="mt-6 md:mt-8">
              <ProgressBar percent={percent} />
            </div>
          </section>

          {/* Lessons */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg`}
              >
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  {lesson.module}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {lesson.description}
                </p>

                <Link
                  href={lesson.link}
                  className="inline-block rounded-full bg-green-500 hover:bg-green-600 transition-colors text-white px-5 py-2 text-sm font-semibold shadow-md"
                >
                  {completedLessonIds.includes(lesson.id)
                    ? "View Lesson"
                    : "Start Lesson"}{" "}
                  →
                </Link>
              </article>
            ))}
          </section>
        </Shell>
      </div>
    </AuthGuard>
  );
}
