"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Quiz from "@/components/Quiz";
import { welcomeQuiz } from "@/lib/quiz";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveQuizAttempt } from "@/lib/progress";
import CourseTracker from "@/components/CourseTracker";

export default function WelcomeQuizPage() {
  const router = useRouter();
  const [uid, setUid] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Require all 3 lessons before taking the quiz
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return router.replace("/login");
      setUid(u.uid);
      // gate: need 3 completed lessons
      const ref = doc(db, "users", u.uid, "progress", "welcome");
      const snap = await getDoc(ref);
      const completed = (snap.data()?.completedLessonIds ?? []) as string[];
      if ((completed?.length ?? 0) < 3) {
        setBlocked(true);
      }
      setReady(true);
    });
    return () => unsub();
  }, [router]);

  const handlePass = async ({
    percent,
    correct,
    total,
  }: {
    percent: number;
    correct: number;
    total: number;
  }) => {
    if (!uid) return;
    await saveQuizAttempt(uid, "welcome", {
      percent,
      correct,
      total,
      passed: true,
    });
    router.push("/course/welcome"); // or show a “certificate” page next
  };

  const handleFail = async ({
    percent,
    correct,
    total,
  }: {
    percent: number;
    correct: number;
    total: number;
  }) => {
    if (!uid) return;
    await saveQuizAttempt(uid, "welcome", {
      percent,
      correct,
      total,
      passed: false,
    });
    // stay on page so they can retake
  };

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left: tracker */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="welcome"
                  currentLessonId={"quiz"}
                  lessons={[
                    {
                      id: "who-we-are",
                      title: "Who We Are",
                      href: "/course/welcome/lesson/who-we-are",
                    },
                    {
                      id: "vision-mission-values",
                      title: "Vision, Mission & Core Values",
                      href: "/course/welcome/lesson/vision-mission-values",
                    },
                    {
                      id: "expectations-communication",
                      title: "Expectations & Communication",
                      href: "/course/welcome/lesson/expectations-communication",
                    },
                  ]}
                />
                <div className="mt-4 text-xs text-gray-500">
                  Final Quiz (not counted as a lesson)
                </div>
              </aside>

              {/* Right: quiz card */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Quiz Section 1 — Welcome Module
                    </h1>
                    <Link href="/course/welcome" className="text-sm underline">
                      ← Back to Module
                    </Link>
                  </div>

                  {!ready ? (
                    <p className="mt-6 text-gray-600">Loading…</p>
                  ) : blocked ? (
                    <div className="mt-6 rounded-xl border p-4 bg-yellow-50 text-yellow-800">
                      Please complete all lessons first.{" "}
                      <Link href="/course/welcome" className="underline">
                        Go to module
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-6">
                      <Quiz
                        title="Check your understanding"
                        questions={welcomeQuiz}
                        passingPercent={80}
                        onPass={handlePass}
                        onFail={handleFail}
                      />
                    </div>
                  )}
                </article>
              </main>
            </div>
          </div>
        </Shell>
      </div>
    </AuthGuard>
  );
}
