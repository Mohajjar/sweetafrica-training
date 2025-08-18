"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import Accordion from "@/components/Accordion";

export default function MoveInMoveOutCleaning() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["short-term-rental-turnovers"],
  });

  const cleaningChecklist = [
    {
      title: "General (All Rooms)",
      content:
        "Dust all surfaces from top to bottom. Clean light fixtures and ceiling fans. Wipe down walls, baseboards, and doors. Clean windows, windowsills, and tracks. Vacuum all carpets and clean all hard floors.",
    },
    {
      title: "Kitchen",
      content:
        "Clean inside and outside of all cabinets and drawers. Clean and disinfect countertops and sinks. Deep clean all appliances including the oven, refrigerator, and microwave. Mop the floor.",
    },
    {
      title: "Bathrooms",
      content:
        "Scrub and disinfect the toilet, shower, bathtub, and sink. Clean mirrors and light fixtures. Wipe down cabinets and drawers. Mop the floor.",
    },
    {
      title: "Bedrooms and Living Areas",
      content:
        "Clean closets, including shelves and rods. Dust all surfaces and fixtures. Ensure all floors are thoroughly vacuumed and cleaned.",
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
                  moduleId="professionalism"
                  currentLessonId="move-in-move-out-cleaning"
                  lessons={getLessons("professionalism")}
                />
              </aside>

              {/* Right: lesson */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Professional Cleaning Service
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Move-In / Move-Out Cleaning
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “You’re not just cleaning a space; you’re preparing a new
                    beginning.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Goal of a Move-In/Move-Out Clean
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Move-in/move-out cleaning is one of the most thorough
                    services offered. The primary goal is to prepare a home for
                    its next resident, ensuring every inch of the property is
                    clean and sanitized. For a move-out, this helps the former
                    resident get their security deposit back. For a move-in, it
                    provides the new resident with a fresh, healthy start in
                    their new home.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Key Differences from a Standard Clean
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    The biggest difference is that the property is empty. This
                    allows access to areas that are usually hidden by furniture
                    and belongings. A move-in/move-out clean is a deep clean of
                    the entire home, top to bottom. It includes tasks that are
                    typically add-ons to a standard service, like cleaning the
                    inside of cabinets, drawers, and appliances.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Ultimate Move-In/Move-Out Checklist
                  </h2>
                  <Accordion items={cleaningChecklist} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Common Challenges and How to Handle Them
                  </h2>
                  <ul className="list-disc pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Unexpected Leftover Items:</strong> If the
                      previous resident left items behind, contact your
                      supervisor or the client immediately for instructions. Do
                      not dispose of anything without permission.
                    </li>
                    <li>
                      <strong>Heavy Grime and Neglect:</strong> Some properties
                      may be in poor condition. Be prepared with heavy-duty
                      cleaners and allow for extra time. Always manage client
                      expectations about what can realistically be achieved.
                    </li>
                    <li>
                      <strong>No Power or Water:</strong> Confirm that all
                      utilities are active before the cleaning day. If they are
                      not, you cannot properly clean, and the appointment will
                      need to be rescheduled.
                    </li>
                  </ul>

                  <hr className="my-12 border-gray-200" />
                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    A perfect move-out clean closes one chapter and opens
                    another.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Lesson Summary
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Move-in/move-out cleaning is a detailed and comprehensive
                    service that sets the stage for a new resident. It requires
                    a systematic approach, attention to detail, and the right
                    tools to tackle everything from empty cabinets to
                    baseboards. By following a thorough checklist, you can
                    ensure a consistent, high-quality result that leaves the
                    home in pristine condition.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="move-in-move-out-cleaning"
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
