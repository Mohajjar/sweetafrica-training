"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function UnderstandingDirtAndDebris() {
  // Gate: must have completed "Cleaning Systems and Flow"
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["cleaning-systems-and-flow"],
  });

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left: tracker */}
              <aside className="md-col-span-1">
                <CourseTracker
                  moduleId="fundamentals"
                  currentLessonId="understanding-dirt-and-debris"
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
                    Understanding Dirt & Debris
                  </h1>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Identifying Dirt and Debris
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding the significance of tackling different types
                    of dirt and debris effectively is crucial for maintaining
                    hygiene, safety, and aesthetics in various environments.
                    Different surfaces and materials can harbor specific types
                    of dirt, stains, and debris that require tailored cleaning
                    methods. For instance, organic matter such as food waste may
                    attract pests, while dust and allergens can impact indoor
                    air quality. By recognizing the nature of the dirt or
                    debris, one can select the right tools and cleaning agents,
                    which enhances both efficiency and effectiveness.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Choosing the Right Cleaning Method
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Dirt type affects your product choice and cleaning strategy.
                    Using the wrong cleaner can make the situation worse. For
                    instance, oil-based stains require degreasers, while
                    water-based stains may respond better to traditional
                    detergents. It's essential to identify the specific type of
                    dirt or stain to select the most effective cleaning
                    solution. Additionally, consider the surface being cleaned,
                    as harsh chemicals can damage certain materials. Always test
                    a small area first to ensure compatibility and avoid any
                    adverse reactions.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Dwell Time Concept
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      Dwell time refers to the amount of time a cleaning product
                      remains in contact with a surface before being rinsed or
                      wiped away. This concept is critical in maximizing the
                      effectiveness of cleaning agents.
                    </p>
                    <p>
                      Many cleaning products require a specific dwell time to
                      break down dirt, grease, and other contaminants. For a
                      disinfectant to kill pathogens effectively, it must remain
                      wet on the surface for a recommended duration.
                      Insufficient dwell time can lead to incomplete cleaning.
                    </p>
                    <p>
                      Understanding and applying the appropriate dwell time is
                      essential for achieving optimal cleaning results with any
                      product. It ensures that soils are adequately removed,
                      pathogens are effectively eliminated, and overall cleaning
                      efficiency is maximized.
                    </p>
                  </div>

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Identifying dirt type leads to smarter, faster cleaning.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="understanding-dirt-and-debris"
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
