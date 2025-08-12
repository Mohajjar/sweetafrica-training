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

  // For now we hardcode: this module has 3 lessons total
  const TOTAL_LESSONS = 3;

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;

      const ref = doc(db, "users", u.uid, "progress", "welcome");
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
      link: null, // This lesson is not available yet
    },
    {
      id: "expectations-communication",
      module: "Module 3",
      title: "Expectations & Communication",
      description:
        "Understand how we work together and deliver outstanding service.",
      link: null, // This lesson is not available yet
    },
  ];

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
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all
                  ${lesson.link ? "hover:shadow-lg" : ""}`}
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

                {lesson.link ? (
                  <Link
                    href={lesson.link}
                    className="inline-block rounded-full bg-green-500 hover:bg-green-600 transition-colors text-white px-5 py-2 text-sm font-semibold shadow-md"
                  >
                    {completedLessonIds.includes(lesson.id)
                      ? "View Lesson"
                      : "Start Lesson"}{" "}
                    →
                  </Link>
                ) : (
                  <span className="inline-block text-sm text-gray-500 font-medium bg-gray-100 rounded-full px-4 py-2">
                    Coming Soon
                  </span>
                )}
              </article>
            ))}
          </section>
        </Shell>
      </div>
    </AuthGuard>
  );
}
