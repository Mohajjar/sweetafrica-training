"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import { getLessons } from "@/lib/modules";
import Link from "next/link";

export default function WelcomeRecapPage() {
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
                  currentLessonId="recap" // Custom ID for the recap page
                  lessons={getLessons("welcome")}
                />
              </aside>

              {/* Right: content */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Welcome to Sweet Africa
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Module Recap
                  </h1>
                  <p className="text-xl text-gray-600 font-light mb-8">
                    Review the key concepts from this module before starting the
                    quiz.
                  </p>

                  <hr className="my-8 border-gray-200" />

                  <div className="space-y-6 text-base text-gray-700 leading-relaxed">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 1: Who We Are
                    </h3>
                    <p>
                      Introduces Sweet Africa Global LLC as a purpose-driven
                      company focused on consistent quality, respect, and
                      reliability, built for and by working-class professionals.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 2: Vision, Mission & Core Values
                    </h3>
                    <p>
                      Outlines our guiding principles: delivering dependable
                      quality through systems, taking pride in our work, and
                      fostering growth and respect for both people and spaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 3: Expectations & Communication
                    </h3>
                    <p>
                      Covers our professional standards, including punctuality,
                      clear communication, confidentiality, and a commitment to
                      safety and quality through checklists and PPE.
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
                    <Link
                      href="/course/welcome/quiz"
                      className="inline-flex items-center rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-3 text-sm font-semibold shadow-md"
                    >
                      Proceed to Quiz →
                    </Link>
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
