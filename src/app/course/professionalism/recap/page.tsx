"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import { getLessons } from "@/lib/modules";
import Link from "next/link";

export default function ProfessionalismRecapPage() {
  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left: tracker */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="professionalism"
                  currentLessonId="recap" // Custom ID for the recap page
                  lessons={getLessons("professionalism")}
                />
              </aside>

              {/* Right: content */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Professional Cleaning Service
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
                      Lesson 1: You are the Service
                    </h3>
                    <p>
                      Your professionalism, attitude, and appearance are just as
                      important as the cleaning itself. You represent the Sweet
                      Africa brand.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 2: Uniform, Gear & Hygiene Standards
                    </h3>
                    <p>
                      A clean and professional appearance builds trust with
                      clients. This includes a clean uniform, well-maintained
                      gear, and good personal hygiene.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 3: Communication On the Job
                    </h3>
                    <p>
                      Clear and professional communication before, during, and
                      after the job is key to managing expectations and building
                      trust.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 4: Pre-Clean Walkthroughs
                    </h3>
                    <p>
                      A thorough walkthrough helps to identify client needs, set
                      expectations, and create a plan for an efficient and
                      effective clean.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 5: Managing Expectations & Boundaries
                    </h3>
                    <p>
                      Learn how to handle unexpected requests, set professional
                      boundaries, and communicate effectively when additional
                      work is needed.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 6: When Something Goes Wrong
                    </h3>
                    <p>
                      A calm and professional response to accidents or issues is
                      crucial. Learn the four categories of incidents and the
                      four steps to responding to them.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 7: The Core Difference Between Standard and Deep
                      Cleaning
                    </h3>
                    <p>
                      Understand the key differences between a standard and a
                      deep clean, and how to explain them to clients to ensure
                      they get the service they need.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 8: Products & Setup for Deep Cleaning
                    </h3>
                    <p>
                      Learn about the essential tools and products for a deep
                      clean, and time-saving techniques to make the process more
                      efficient.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 9: Deep Clean Timing & Room Pacing
                    </h3>
                    <p>
                      A guide to estimating the time needed for each room in a
                      deep clean, and strategies for staying on track.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 10: Residential Cleaning
                    </h3>
                    <p>
                      Learn the best practices for cleaning in a client's home,
                      including respecting privacy and handling pets and
                      children.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 11: Commercial Cleaning
                    </h3>
                    <p>
                      Discover the unique demands of cleaning commercial spaces,
                      including security protocols and cleaning priorities for
                      different types of businesses.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Lesson 12: Move-In / Move-Out Cleaning
                    </h3>
                    <p>
                      The most thorough cleaning service, this lesson covers the
                      ultimate checklist for preparing a home for its next
                      resident.
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
                    <Link
                      href="/course/professionalism/quiz"
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
