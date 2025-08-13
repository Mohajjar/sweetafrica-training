"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Link from "next/link";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import WelcomeQuizTile from "@/components/WelcomeQuizTile";

const TOTAL_LESSONS = 3;
const LESSON_LABEL: Record<string, string> = {
  "who-we-are": "Who We Are",
  "vision-mission-values": "Vision, Mission & Core Values",
  "expectations-communication": "Expectations & Communication",
};

export default function Dashboard() {
  const [courseStatus, setCourseStatus] = useState({
    title: "Welcome to Sweet Africa Global",
    lastLesson: "Not started",
    progress: 0,
    isCompleted: false,
    link: "/course/welcome",
  });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;

      const ref = doc(db, "users", u.uid, "progress", "welcome");
      const unsubSnap = onSnapshot(ref, (snap) => {
        const done = (snap.data()?.completedLessonIds ?? []) as string[];
        const progress = Math.min(
          100,
          Math.round((done.length / TOTAL_LESSONS) * 100)
        );
        const last = done.length ? done[done.length - 1] : null;

        setCourseStatus((prev) => ({
          ...prev,
          lastLesson: last ? LESSON_LABEL[last] ?? last : "Not started",
          progress,
          isCompleted: progress === 100,
        }));
      });

      return () => unsubSnap();
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
            {/* Main Course Card */}
            <div className="bg-white rounded-xl shadow-md border p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Your Training
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {courseStatus.title}
                  </h3>
                </div>
                {courseStatus.isCompleted ? (
                  <FaCheckCircle className="text-green-500 text-3xl mt-1" />
                ) : (
                  <FaPlay className="text-green-500 text-3xl mt-1" />
                )}
              </div>

              <p className="mt-4 text-gray-600">
                {courseStatus.progress > 0 ? (
                  <>
                    You last worked on:{" "}
                    <span className="font-medium text-gray-800">
                      {courseStatus.lastLesson}
                    </span>
                  </>
                ) : (
                  <>
                    You haven’t started yet. Begin with{" "}
                    <span className="font-medium">Who We Are</span>.
                  </>
                )}
              </p>

              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${courseStatus.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span>Progress</span>
                  <span>{courseStatus.progress}% complete</span>
                </div>
              </div>

              <Link
                href={courseStatus.link}
                className="mt-6 inline-flex items-center rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-3 text-sm font-semibold shadow-md"
              >
                {courseStatus.progress > 0
                  ? "Continue Training"
                  : "Start Training"}{" "}
                →
              </Link>
            </div>

            {/* Final Quiz tile (single quiz for the whole course) */}
            <WelcomeQuizTile />
          </div>
        </section>
      </Shell>
    </AuthGuard>
  );
}
