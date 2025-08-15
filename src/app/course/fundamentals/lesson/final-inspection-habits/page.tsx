"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function FinalInspectionHabits() {
  // Gate: must have completed "Common Furniture & Fixtures"
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["common-furniture-and-fixtures"],
  });

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
                  currentLessonId="final-inspection-habits"
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
                    Final Inspection Habits
                  </h1>
                  <p className="text-xl text-gray-600 font-light mb-8">
                    How to make sure no spot is missed, no mistake left behind,
                    and no doubt left in the client’s mind.
                  </p>

                  <hr className="my-8 border-gray-200" />

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600 text-center">
                    “Most complaints happen because of what gets missed – not
                    what was done badly.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    The Sweet Africa Final Pass System
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To ensure a thorough final walk-through and enhance client
                    satisfaction, create a detailed checklist covering all
                    aspects of the project. Include items such as functionality,
                    aesthetics, safety features, and cleanliness. Engage your
                    client throughout the process, using the checklist to guide
                    the review and encourage questions and feedback.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What to Check in Each Room
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    For the <strong>living room</strong>, focus on dusting all
                    surfaces, wiping down electronics, vacuuming carpets, and
                    cleaning windows. In the <strong>kitchen</strong>, pay
                    attention to wiping countertops, cleaning appliances inside
                    and out, sanitizing sinks, and mopping the floor. The{" "}
                    <strong>bathroom</strong> should prioritize scrubbing the
                    toilet, cleaning sinks and mirrors, disinfecting shower
                    areas, and mopping the floor. In the{" "}
                    <strong>bedroom</strong>, ensure to dust all furniture,
                    change bed linens, vacuum carpets, and clean windows.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Clean = Finished + Reset
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Cleanliness is more than just appearance; it embodies a
                    deeper sense of order and completion. A clean space fosters
                    productivity and creativity, as it removes distractions. The
                    practice of maintaining cleanliness can be viewed as a form
                    of self-respect and respect for others.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Create a Habit Loop
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To establish a reliable routine for final inspections,
                    develop a checklist that outlines all areas and tasks that
                    need to be inspected. Schedule a regular time for
                    inspections after cleaning is completed. Document findings
                    to identify patterns and provide constructive feedback to
                    the cleaning staff to promote learning and continuous
                    improvement.
                  </p>

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Final inspections foster trust and loyalty through attention
                    to small details.
                  </p>

                  <hr className="my-8 border-gray-200" />

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Lesson Summary
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Thorough final walkthroughs are crucial to achieving an
                    impeccable finish. They provide an opportunity to identify
                    and address any issues or inconsistencies before finalizing
                    the project, which can prevent costly rework and enhance
                    overall quality. By carefully examining each aspect, you can
                    confirm that the project reflects the desired outcome and
                    fulfills all requirements, ultimately leading to greater
                    satisfaction for both clients and team members.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="final-inspection-habits"
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
