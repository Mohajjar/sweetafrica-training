"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { markLessonComplete } from "@/lib/progress";
import { useRouter } from "next/navigation";
import useLessonGate from "@/hooks/useLessonGate";

export default function ToolsAndSupplies() {
  // 🔒 Gate: must finish Basic Cleaning Chemistry before this lesson
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["basic-cleaning-chemistry"],
  });

  const router = useRouter();
  const [uid, setUid] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  const handleFinish = async () => {
    if (!uid || !ack) return;
    setSaving(true);
    try {
      await markLessonComplete(uid, "fundamentals", "tools-and-supplies");
      // 👉 go to next lesson
      router.push("/course/fundamentals/lesson/surface-types-and-finishes");
    } finally {
      setSaving(false);
    }
  };

  const lessons = [
    {
      id: "defining-cleaning",
      title: "Defining Cleaning",
      href: "/course/fundamentals/lesson/defining-cleaning",
    },
    {
      id: "basic-cleaning-chemistry",
      title: "Basic Cleaning Chemistry",
      href: "/course/fundamentals/lesson/basic-cleaning-chemistry",
    },
    {
      id: "tools-and-supplies",
      title: "Tools & Supplies",
      href: "/course/fundamentals/lesson/tools-and-supplies",
    },
    {
      id: "surface-types-and-finishes",
      title: "Surface Types & Finishes",
      href: "/course/fundamentals/lesson/surface-types-and-finishes",
    },
    {
      id: "soil-types-and-methods",
      title: "Soil Types & Methods",
      href: "/course/fundamentals/lesson/soil-types-and-methods",
    },
    {
      id: "dilution-dwell-time-agitation",
      title: "Dilution, Dwell Time & Agitation",
      href: "/course/fundamentals/lesson/dilution-dwell-time-agitation",
    },
    {
      id: "ppe-and-safety",
      title: "PPE & Safety",
      href: "/course/fundamentals/lesson/ppe-and-safety",
    },
    {
      id: "routine-vs-deep-cleaning",
      title: "Routine vs. Deep Cleaning",
      href: "/course/fundamentals/lesson/routine-vs-deep-cleaning",
    },
    {
      id: "sequencing-and-checklists",
      title: "Sequencing & Checklists",
      href: "/course/fundamentals/lesson/sequencing-and-checklists",
    },
  ];

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left: tracker */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="fundamentals"
                  lessons={lessons}
                  currentLessonId="tools-and-supplies"
                />
              </aside>

              {/* Right: content */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Fundamentals of Cleaning
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Tools & Supplies
                  </h1>

                  <p className="text-gray-700 text-lg mb-6">
                    This lesson will cover essential tools (dusters, microfiber,
                    scrapers, squeegees), equipment (vacuums, mops, buckets,
                    extension poles), and the supplies that fit common cleaning
                    scenarios. We’ll add full content shortly.
                  </p>

                  <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
                    <strong className="text-gray-900">Coming soon:</strong> tool
                    selection by surface, microfiber grades, pad choices,
                    vacuum/filter types, and when to prefer mechanical removal
                    vs. chemical assist.
                  </div>

                  {/* Acknowledgement + nav */}
                  <div className="pt-6 mt-8 border-t border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ack}
                        onChange={(e) => setAck(e.target.checked)}
                        className="h-5 w-5 rounded text-green-500 focus:ring-green-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        I’ve reviewed this lesson (placeholder content) and am
                        ready to continue.
                      </span>
                    </label>

                    <div className="mt-6 flex items-center justify-between">
                      {/* Back → previous lesson */}
                      <Link
                        href="/course/fundamentals/lesson/basic-cleaning-chemistry"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        ← Back
                      </Link>

                      {/* Next / Complete */}
                      <button
                        onClick={handleFinish}
                        disabled={!ack || saving}
                        className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold shadow-md transition-colors ${
                          ack && !saving
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {saving ? "Saving…" : "Next Lesson →"}
                      </button>
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </Shell>
      </div>
    </AuthGuard>
  );
}
