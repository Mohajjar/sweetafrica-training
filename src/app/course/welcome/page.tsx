"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import ProgressBar from "@/components/ProgressBar";
import { onAuthStateChanged } from "firebase/auth";

export default function CourseWelcome() {
  const [percent, setPercent] = useState<number>(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // This course has 3 lessons
  const TOTAL_LESSONS = 3;

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;
      const ref = doc(db, "users", u.uid, "progress", "welcome");
      const unsubSnap = onSnapshot(ref, (snap) => {
        const completed = (snap.data()?.completedLessonIds ?? []) as string[];
        setCompletedLessonIds(completed);
        setPercent(
          Math.min(100, Math.round((completed.length / TOTAL_LESSONS) * 100))
        );
      });
      return () => unsubSnap();
    });
    return () => unsubAuth();
  }, []);

  // Gating logic: each lesson unlocks when the previous one is completed
  const prereq: Record<string, string | null> = {
    "who-we-are": null,
    "vision-mission-values": "who-we-are",
    "expectations-communication": "vision-mission-values",
  };
  const isUnlocked = (id: string) => {
    const need = prereq[id];
    return need ? completedLessonIds.includes(need) : true;
  };

  const lessons = [
    {
      id: "who-we-are",
      module: "Module 1",
      title: "Who We Are",
      description:
        "Learn about our mission, our culture, and the people behind the brand.",
      link: "/course/welcome/lesson/who-we-are",
    },
    {
      id: "vision-mission-values",
      module: "Module 2",
      title: "Vision, Mission & Core Values",
      description:
        "Discover the principles and goals that drive our everyday work.",
      link: "/course/welcome/lesson/vision-mission-values",
    },
    {
      id: "expectations-communication",
      module: "Module 3",
      title: "Expectations & Communication",
      description:
        "Understand how we work together and deliver outstanding service.",
      link: "/course/welcome/lesson/expectations-communication",
    },
  ] as const;

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          {/* Hero Section */}
          <section className="rounded-3xl border bg-white p-8 md:p-12 shadow-sm mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Welcome to{" "}
              <span className="text-green-600">Sweet Africa Global</span>
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl text-lg font-light">
              This onboarding will guide you through our values, expectations,
              and everything you need to excel as part of our team.
            </p>
            <div className="mt-6 md:mt-8">
              <ProgressBar percent={percent} />
            </div>
          </section>

          {/* Lessons Grid */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => {
              const unlocked = isUnlocked(lesson.id);
              const isDone = completedLessonIds.includes(lesson.id);

              return (
                <article
                  key={lesson.id}
                  className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all ${
                    unlocked ? "hover:shadow-lg" : ""
                  }`}
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

                  {unlocked ? (
                    <Link
                      href={lesson.link}
                      className="inline-block rounded-full bg-green-500 hover:bg-green-600 transition-colors text-white px-5 py-2 text-sm font-semibold shadow-md"
                    >
                      {isDone ? "View Lesson" : "Start Lesson"} →
                    </Link>
                  ) : (
                    <span className="inline-block text-sm text-gray-500 font-medium bg-gray-100 rounded-full px-4 py-2">
                      Locked — complete previous lesson
                    </span>
                  )}
                </article>
              );
            })}

            {/* FINAL QUIZ — one card for the whole course */}
            {completedLessonIds.length >= 3 ? (
              <article className="relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  Section 1
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Quiz</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Take the final quiz of Section 1 to complete the course and
                  record your certification.
                </p>
                <Link
                  href="/course/welcome/quiz"
                  className="inline-block rounded-full bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 text-sm font-semibold shadow-md"
                >
                  Take Quiz →
                </Link>
              </article>
            ) : (
              <article className="relative rounded-2xl border bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  Section 1
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Quiz</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Locked — complete all lessons to unlock the quiz.
                </p>
                <span className="inline-block text-sm text-gray-500 font-medium bg-gray-100 rounded-full px-4 py-2">
                  Locked
                </span>
              </article>
            )}
          </section>
        </Shell>
      </div>
    </AuthGuard>
  );
}
