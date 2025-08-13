"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { markLessonComplete } from "@/lib/progress";
import Link from "next/link"; // Use Link for the back button
import CourseTracker from "@/components/CourseTracker";

export default function ExpectationsCommunication() {
  const router = useRouter();
  const [uid, setUid] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [saving, setSaving] = useState(false);
  const canFinish = ack && !!uid && !saving;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  const handleFinish = async () => {
    if (!uid) return;
    setSaving(true);
    try {
      await markLessonComplete(uid, "welcome", "expectations-communication");
      router.push("/course/welcome");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGuard>
      <Shell>
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left Column (Placeholder) */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="welcome"
                  currentLessonId="expectations-communication"
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
              </aside>

              {/* Right Column (Lesson Content) */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Sweet Africa Global LLC
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Expectations & Communication
                  </h1>
                  <p className="text-xl text-gray-600 font-light mb-8">
                    Clear expectations and respectful communication keep our
                    work consistent, professional, and safe — for clients and
                    teammates.
                  </p>
                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    How We Show Up
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>On time, in uniform, prepared.</strong> Respect
                      schedules and homes/businesses.
                    </p>
                    <p>
                      <strong>Phone etiquette.</strong> No personal calls
                      on-site except emergencies.
                    </p>
                    <p>
                      <strong>Confidentiality.</strong> Never disclose client
                      info or photos without approval.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Communication Standards
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>Speak up early.</strong> If something is unclear
                      or wrong, notify your lead ASAP.
                    </p>
                    <p>
                      <strong>Professional tone.</strong> Be direct, helpful,
                      and solutions-oriented.
                    </p>
                    <p>
                      <strong>Report issues.</strong> Document damages, hazards,
                      or access problems immediately.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Safety & Quality
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>Follow checklists.</strong> Routines create
                      consistent quality.
                    </p>
                    <p>
                      <strong>Use PPE when required.</strong> Safety first,
                      always.
                    </p>
                    <p>
                      <strong>Label & store.</strong> Keep supplies safe and
                      organized.
                    </p>
                  </div>

                  <div className="pt-6 mt-8 border-t border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ack}
                        onChange={(e) => setAck(e.target.checked)}
                        className="mt-1 h-5 w-5 rounded text-green-500 focus:ring-green-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-700 leading-6">
                        I acknowledge I’ve read and understood the expectations
                        and communication standards.
                      </span>
                    </label>

                    <div className="mt-6 flex items-center justify-between">
                      <Link
                        href="/course/welcome/lesson/vision-mission-values"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        ← Back
                      </Link>
                      <button
                        onClick={handleFinish}
                        disabled={!canFinish}
                        className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold shadow-md transition-colors ${
                          canFinish
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {saving ? "Saving…" : "I acknowledge & finish module →"}
                      </button>
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      </Shell>
    </AuthGuard>
  );
}
