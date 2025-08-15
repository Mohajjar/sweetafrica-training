"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import { getLessons } from "@/lib/modules";

export default function DefiningCleaning() {
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
                  currentLessonId="defining-cleaning"
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
                    Defining Cleaning
                  </h1>
                  <p className="text-xl text-gray-600 font-light mb-8">
                    Cleaning is fundamentally about maintaining hygiene, order,
                    and a pleasant environment. Its core essence lies in the
                    removal of dirt, impurities, and clutter, which can harbor
                    harmful bacteria and promote an unhealthy living or working
                    space. Beyond appearance, it supports health, safety, and
                    productivity.
                  </p>

                  {/* Image placeholder + figcaption */}
                  <figure className="my-8">
                    <div className="aspect-[16/9] w-full rounded-xl border border-gray-200 bg-gray-100 grid place-items-center text-gray-400">
                      Image placeholder
                    </div>
                    <figcaption className="text-center text-sm text-gray-500 mt-2">
                      ― “Cleaning is the act of removing visible and invisible
                      matter from surfaces using tools, techniques, and cleaning
                      products.”
                    </figcaption>
                  </figure>

                  <hr className="my-8 border-gray-200" />

                  {/* Cleaning vs Sanitizing vs Disinfecting */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Cleaning vs. Sanitizing vs. Disinfecting
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>Cleaning</strong> removes dirt, debris, and
                      impurities from surfaces (often with soap, water, and
                      agitation). It tackles what you can see and much of what
                      you can’t.
                    </p>
                    <p>
                      <strong>Sanitizing</strong> reduces the number of germs on
                      a surface to safe levels defined by public-health
                      standards, typically using chemical sanitizers.
                    </p>
                    <p>
                      <strong>Disinfecting</strong> kills a broader range of
                      pathogens (including viruses and bacteria) using
                      EPA-listed disinfectants, providing a higher level of
                      microbial control than sanitizing.
                    </p>
                    <p className="text-gray-600">
                      In short: cleaning removes, sanitizing reduces,
                      disinfecting kills. All three matter for proper infection
                      control.
                    </p>
                  </div>

                  {/* Differences Explained – placeholder for your four graphics */}
                  <div className="my-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Differences Explained (visuals)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="aspect-square rounded-lg border border-gray-200 bg-gray-100 grid place-items-center text-xs text-gray-400"
                        >
                          Image {n}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      (We’ll drop in the final artwork here.)
                    </p>
                  </div>

                  <hr className="my-8 border-gray-200" />

                  {/* Why this matters */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Why This Matters in a Home
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>Cleaning</strong> lowers allergens, improves
                      appearance, and prevents grime build-up.
                    </p>
                    <p>
                      <strong>Sanitizing</strong> is key where food is prepared
                      or kids play — it reduces germ counts to safer levels.
                    </p>
                    <p>
                      <strong>Disinfecting</strong> targets high-touch points
                      (knobs, switches, bathroom fixtures), especially during
                      cold/flu season or when illness is present.
                    </p>
                    <p>
                      Together they protect health, reduce spread, and keep
                      homes comfortable.
                    </p>
                  </div>

                  <hr className="my-8 border-gray-200" />

                  {/* Real-World Examples */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Real-World Examples
                  </h2>
                  <ul className="list-disc pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Healthcare:</strong> Operating rooms are cleaned
                      and disinfected before/after surgery to prevent
                      infections.
                    </li>
                    <li>
                      <strong>Food industry:</strong> Surfaces, utensils, and
                      machinery are cleaned and sanitized to prevent
                      cross-contamination and foodborne illness.
                    </li>
                    <li>
                      <strong>Schools:</strong> Regular cleaning of classrooms
                      and restrooms supports health and a better learning
                      environment.
                    </li>
                    <li>
                      <strong>Offices:</strong> Clean desks and shared areas
                      reduce illness spread and improve morale.
                    </li>
                    <li>
                      <strong>Homes:</strong> High-touch points are cleaned and
                      often disinfected to protect families.
                    </li>
                  </ul>

                  <hr className="my-8 border-gray-200" />

                  {/* Lesson Summary */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Lesson Summary
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Cleaning is the first line of defense for hygiene. It
                    removes soils and many germs, paving the way for effective
                    sanitizing and disinfecting. A consistent routine protects
                    health, extends the life of spaces and belongings, and sets
                    the standard for professional quality.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="defining-cleaning"
                    requireAck={true}
                    ackLabel="I’ve read and understood this lesson."
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
