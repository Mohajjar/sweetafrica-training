"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Link from "next/link";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getModuleTitle, getTotalLessons } from "@/lib/curriculum";

type CourseStatus = {
  title: string;
  lastLesson: string;
  progress: number;
  isCompleted: boolean;
  link: string;
};

const LESSON_LABEL_WELCOME: Record<string, string> = {
  "who-we-are": "Who We Are",
  "vision-mission-values": "Vision, Mission & Core Values",
  "expectations-communication": "Expectations & Communication",
};

const LESSON_LABEL_FUNDAMENTALS: Record<string, string> = {
  "defining-cleaning": "Defining Cleaning",
  // add more when you add lessons
};

export default function Dashboard() {
  const [welcomeStatus, setWelcomeStatus] = useState<CourseStatus>({
    title: getModuleTitle("welcome"),
    lastLesson: "Not started",
    progress: 0,
    isCompleted: false,
    link: "/course/welcome",
  });

  const [fundamentalsStatus, setFundamentalsStatus] = useState<CourseStatus>({
    title: getModuleTitle("fundamentals"),
    lastLesson: "Not started",
    progress: 0,
    isCompleted: false,
    link: "/course/fundamentals",
  });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;

      // Welcome progress
      {
        const total = getTotalLessons("welcome") || 3;
        const ref = doc(db, "users", u.uid, "progress", "welcome");
        const unsub = onSnapshot(ref, (snap) => {
          const done = (snap.data()?.completedLessonIds ?? []) as string[];
          const progress = Math.min(
            100,
            Math.round((done.length / total) * 100)
          );
          const last = done.length ? done[done.length - 1] : null;

          setWelcomeStatus((prev) => ({
            ...prev,
            lastLesson: last
              ? LESSON_LABEL_WELCOME[last] ?? last
              : "Not started",
            progress,
            isCompleted: progress === 100,
          }));
        });
        // clean up when auth changes
        return () => unsub();
      }
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;

      // Fundamentals progress
      {
        const total = getTotalLessons("fundamentals") || 1;
        const ref = doc(db, "users", u.uid, "progress", "fundamentals");
        const unsub = onSnapshot(ref, (snap) => {
          const done = (snap.data()?.completedLessonIds ?? []) as string[];
          const progress = Math.min(
            100,
            Math.round((done.length / total) * 100)
          );
          const last = done.length ? done[done.length - 1] : null;

          setFundamentalsStatus((prev) => ({
            ...prev,
            lastLesson: last
              ? LESSON_LABEL_FUNDAMENTALS[last] ?? last
              : "Not started",
            progress,
            isCompleted: progress === 100,
          }));
        });
        return () => unsub();
      }
    });

    return () => unsubAuth();
  }, []);

  return (
    <AuthGuard>
      <Shell>
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Your training at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Welcome Card */}
            <ModuleCard status={welcomeStatus} />

            {/* Fundamentals Card */}
            <ModuleCard status={fundamentalsStatus} />

            {/* Placeholder for future features */}
            <div className="bg-white rounded-xl shadow-md border p-6 md:p-8 flex flex-col items-center justify-center text-center text-gray-500 lg:col-span-2">
              <p className="text-lg">More features and courses coming soon!</p>
            </div>
          </div>
        </section>
      </Shell>
    </AuthGuard>
  );
}

function ModuleCard({ status }: { status: CourseStatus }) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6 md:p-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-1">Your Training</div>
          <h3 className="text-2xl font-bold text-gray-900">{status.title}</h3>
        </div>
        {status.isCompleted ? (
          <FaCheckCircle className="text-green-500 text-3xl mt-1" />
        ) : (
          <FaPlay className="text-green-500 text-3xl mt-1" />
        )}
      </div>

      <p className="mt-4 text-gray-600">
        {status.progress > 0 ? (
          <>
            You last worked on:{" "}
            <span className="font-medium text-gray-800">
              {status.lastLesson}
            </span>
          </>
        ) : (
          <>You haven’t started yet. Begin with the first lesson.</>
        )}
      </p>

      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${status.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2 text-gray-600">
          <span>Progress</span>
          <span>{status.progress}% complete</span>
        </div>
      </div>

      <Link
        href={status.link}
        className="mt-6 inline-flex items-center rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-3 text-sm font-semibold shadow-md"
      >
        {status.progress > 0 ? "Continue Training" : "Start Training"} →
      </Link>
    </div>
  );
}
