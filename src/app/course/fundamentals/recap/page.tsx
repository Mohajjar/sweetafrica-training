"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import { getLessons } from "@/lib/modules";
import Link from "next/link";

export default function FundamentalsRecapPage() {
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
                  currentLessonId="recap" // Custom ID for the recap page
                  lessons={getLessons("fundamentals")}
                />
              </aside>

              {/* Right: lesson */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Fundamentals of Cleaning
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
                      Lesson 1: Defining Cleaning
                    </h3>
                    <p>
                      Introduces the core concepts of cleaning, sanitizing, and
                      disinfecting, establishing cleaning as the foundational
                      step for hygiene.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 2: Basic Cleaning Chemistry
                    </h3>
                    <p>
                      Explains the pH scale and how to select the right
                      products—acidic for minerals and alkaline for grease—to
                      clean effectively without damaging surfaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 3: Tools & Supplies
                    </h3>
                    <p>
                      Covers the essential toolkit, including vacuums, mops, and
                      high-quality microfiber cloths, emphasizing proper
                      maintenance and organization.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 4: Safety and Self-Protection
                    </h3>
                    <p>
                      Focuses on the correct use of Personal Protective
                      Equipment (PPE), best practices for chemical handling, and
                      how to respond to incidents.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 5: Cleaning Systems and Flow
                    </h3>
                    <p>
                      Introduces efficiency through systems, including the "top
                      to bottom, left to right" and "dry before wet" rules to
                      ensure a methodical workflow.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 6: Understanding Dirt & Debris
                    </h3>
                    <p>
                      Teaches how to identify different types of dirt to select
                      the right cleaning methods and introduces the concept of
                      "dwell time" for product effectiveness.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 7: Handling Different Rooms
                    </h3>
                    <p>
                      Provides a practical, room-by-room guide for bathrooms,
                      kitchens, living rooms, and bedrooms to ensure a
                      consistent and thorough process.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 8: Common Furniture & Fixtures
                    </h3>
                    <p>
                      Details the correct cleaning methods for various surfaces
                      like wood, glass, and upholstery to prevent damage and
                      achieve the best results.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 9: Final Inspection Habits
                    </h3>
                    <p>
                      Emphasizes the importance of a final walkthrough to ensure
                      quality, catch any missed spots, and guarantee client
                      satisfaction.
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
                    <Link
                      href="/course/fundamentals/quiz"
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
