"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Link from "next/link";
import { FaPlay, FaCheckCircle, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getModuleTitle, getTotalLessons, ModuleId } from "@/lib/curriculum";

type CourseStatus = {
  title: string;
  lastLesson: string;
  progress: number;
  isCompleted: boolean;
  link: string;
};

const LESSON_LABELS: Record<ModuleId, Record<string, string>> = {
  welcome: {
    "who-we-are": "Who We Are",
    "vision-mission-values": "Vision, Mission & Core Values",
    "expectations-communication": "Expectations & Communication",
  },
  fundamentals: {
    "defining-cleaning": "Defining Cleaning",
    "basic-cleaning-chemistry": "Basic Cleaning Chemistry",
    "tools-and-supplies": "Tools & Supplies",
    "safety-and-self-protection": "Safety and Self-Protection",
    "cleaning-systems-and-flow": "Cleaning Systems and Flow",
    "understanding-dirt-and-debris": "Understanding Dirt & Debris",
    "handling-different-rooms": "Handling Different Rooms",
    "common-furniture-and-fixtures": "Common Furniture & Fixtures",
    "final-inspection-habits": "Final Inspection Habits",
  },
  professionalism: {
    "you-are-the-service": "You are the Service",
  },
};

export default function Dashboard() {
  const [statuses, setStatuses] = useState<Record<ModuleId, CourseStatus>>({
    welcome: {
      title: getModuleTitle("welcome"),
      lastLesson: "Not started",
      progress: 0,
      isCompleted: false,
      link: "/course/welcome",
    },
    fundamentals: {
      title: getModuleTitle("fundamentals"),
      lastLesson: "Not started",
      progress: 0,
      isCompleted: false,
      link: "/course/fundamentals",
    },
    professionalism: {
      title: getModuleTitle("professionalism"),
      lastLesson: "Not started",
      progress: 0,
      isCompleted: false,
      link: "/course/professionalism",
    },
  });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) return;

      const moduleIds: ModuleId[] = [
        "welcome",
        "fundamentals",
        "professionalism",
      ];
      const unsubscribers = moduleIds.map((moduleId) => {
        const totalLessons = getTotalLessons(moduleId);
        const ref = doc(db, "users", u.uid, "progress", moduleId);
        return onSnapshot(ref, (snap) => {
          const done = (snap.data()?.completedLessonIds ?? []) as string[];
          const progress =
            totalLessons > 0
              ? Math.min(100, Math.round((done.length / totalLessons) * 100))
              : 0;
          const last = done.length ? done[done.length - 1] : null;

          setStatuses((prev) => ({
            ...prev,
            [moduleId]: {
              ...prev[moduleId],
              lastLesson: last
                ? LESSON_LABELS[moduleId][last] ?? last
                : "Not started",
              progress,
              isCompleted: progress === 100,
            },
          }));
        });
      });

      return () => unsubscribers.forEach((unsub) => unsub());
    });

    return () => unsubAuth();
  }, []);

  const canStartFundamentals = statuses.welcome.isCompleted;
  const canStartProfessionalism = statuses.fundamentals.isCompleted;

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
            <ModuleCard status={statuses.welcome} />
            <ModuleCard
              status={statuses.fundamentals}
              isLocked={!canStartFundamentals}
              lockedReason="Complete 'Welcome' module first."
            />
            <ModuleCard
              status={statuses.professionalism}
              isLocked={!canStartProfessionalism}
              lockedReason="Complete 'Fundamentals' module first."
            />
          </div>
        </section>
      </Shell>
    </AuthGuard>
  );
}

function ModuleCard({
  status,
  isLocked = false,
  lockedReason = "Complete previous module.",
}: {
  status: CourseStatus;
  isLocked?: boolean;
  lockedReason?: string;
}) {
  const linkContent = (
    <div
      className={`mt-6 inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold shadow-md transition-colors ${
        isLocked
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      {isLocked
        ? "Locked"
        : status.progress > 0
        ? "Continue Training"
        : "Start Training"}{" "}
      →
    </div>
  );

  return (
    <div
      className={`bg-white rounded-xl shadow-md border p-6 md:p-8 ${
        isLocked ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-1">Your Training</div>
          <h3 className="text-2xl font-bold text-gray-900">{status.title}</h3>
        </div>
        {isLocked ? (
          <FaLock className="text-gray-400 text-3xl mt-1" />
        ) : status.isCompleted ? (
          <FaCheckCircle className="text-green-500 text-3xl mt-1" />
        ) : (
          <FaPlay className="text-green-500 text-3xl mt-1" />
        )}
      </div>
      <p className="mt-4 text-gray-600">
        {isLocked ? (
          lockedReason
        ) : status.progress > 0 ? (
          <>
            You last worked on:{" "}
            <span className="font-medium text-gray-800">
              {status.lastLesson}
            </span>
          </>
        ) : (
          "You haven’t started yet. Begin with the first lesson."
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
      {isLocked ? linkContent : <Link href={status.link} legacyBehavior>{linkContent}</Link>}
    </div>
  );
}
