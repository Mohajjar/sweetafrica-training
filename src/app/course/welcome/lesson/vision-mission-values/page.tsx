"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { markLessonComplete } from "@/lib/progress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CourseTracker from "@/components/CourseTracker";
import useLessonGate from "@/hooks/useLessonGate";
import useAutoGate from "@/hooks/useAutoGate";
import LessonFooter from "@/components/LessonFooter";
import { getLessons } from "@/lib/modules";

export default function VisionMissionValues() {
  useAutoGate("welcome", "vision-mission-values");
  useLessonGate({
    moduleId: "welcome",
    requireCompleted: ["who-we-are"],
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      await markLessonComplete(u.uid, "welcome", "vision-mission-values");
    });
    return () => unsub();
  }, []);

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left Column (Navigation) */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="welcome"
                  currentLessonId="vision-mission-values"
                  lessons={getLessons("welcome")}
                />
              </aside>

              {/* Right Column (Lesson Content) */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Sweet Africa Global LLC
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Vision, Mission & Core Values
                  </h1>
                  <p className="text-xl text-gray-600 font-light mb-8">
                    This is how we think, work, and treat people — the standards
                    that guide every decision on every job.
                  </p>
                  <hr className="my-8 border-gray-200" />
                  {/* Vision */}
                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Our Vision
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To redefine what it means to be a cleaning professional —
                    turning ordinary work into extraordinary impact, one space
                    at a time.
                  </p>
                  {/* Mission */}
                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    To deliver consistent, high-quality cleaning services
                    tailored to each space — while developing professionals who
                    embody reliability, trust, and excellence.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    We do this by providing every team member with clear
                    expectations and strong training, focusing on execution over
                    perfectionism, and treating every space with the respect it
                    deserves. Growth doesn’t come from shortcuts, but from
                    repeatable systems, meaningful relationships, and pride in
                    the details that add up over time.
                  </p>
                  <hr className="my-8 border-gray-200" />
                  {/* Core Values */}
                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Our Core Values
                  </h2>
                  <h3 className="text-lg font-bold text-gray-800 mt-6">
                    Excellence through Consistency.
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    We don’t chase perfection — we deliver dependable quality.
                    It’s about getting the basics right, again and again, until
                    people trust us without question.
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mt-6">
                    Pride in the Work.
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    We honor cleaning as skilled labor. Every vacuum line, every
                    disinfected surface, every stocked cabinet reflects our
                    personal standards and the reputation of Sweet Africa
                    Global.
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mt-6">
                    Growth from the Ground Up.
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    We invest in people, not just positions. From day one,
                    you’re given the opportunity to build skills, prove
                    yourself, and move forward. We reward those who show up with
                    intention and take ownership of their development.
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mt-6">
                    Respect for the Space, Respect for the People.
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Every home or business we enter is someone’s livelihood,
                    sanctuary, or responsibility. We treat it accordingly — with
                    care, discretion, and professionalism.
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mt-6">
                    Speak Up, Show Up.
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    We value communication, honesty, and initiative. If
                    something is wrong, unclear, or can be done better — we
                    expect you to say something. If you’re committed, we’ve got
                    your back.
                  </p>
                  <LessonFooter
                    moduleId="welcome"
                    lessonId="vision-mission-values"
                    requireAck={false}
                  />
                </article>
              </main>
            </div>
          </div>
        </Shell>
      </div>
    </AuthGuard>
  );
}
