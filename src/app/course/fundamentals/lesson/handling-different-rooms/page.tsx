"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function HandlingDifferentRooms() {
  useAutoGate("fundamentals", "handling-different-rooms");

  // Gate: must have completed "Understanding Dirt & Debris"
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["understanding-dirt-and-debris"],
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
                  currentLessonId="handling-different-rooms"
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
                    Handling Different Rooms in a Standard Home
                  </h1>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Section 1: Bathroom Cleaning
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To begin with, gather all necessary cleaning supplies,
                    including disinfectants, brushes, sponges, and cloths. Start
                    by removing any items from surfaces, such as toiletries and
                    towels, to clear the area for cleaning. Next, apply a
                    disinfectant to the toilet, sink, and shower areas. Allow
                    the disinfectant to sit for a few minutes to effectively
                    kill germs. Meanwhile, clean other surfaces such as mirrors
                    and countertops with a suitable cleaner. Once the
                    disinfectant has set, scrub the toilet using a toilet brush,
                    ensuring to reach under the rim and inside the bowl.
                    Finally, mop the floor, using a disinfectant solution to
                    eliminate any remaining bacteria and odors.
                  </p>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600 text-center">
                    “Don't miss the hidden spots like under the toilet base and
                    inside the top rim of the toilet bowl.”
                    <span className="block text-sm text-gray-500 mt-1">
                      Bathroom Cleaning Guide
                    </span>
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Section 2: Kitchen Cleaning
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To effectively clean the kitchen, it is essential to
                    prioritize areas where grease and food residue accumulate.
                    Begin by removing any items from countertops and stovetops
                    to allow for thorough cleaning. Utilize a degreasing cleaner
                    on surfaces that often collect grease, such as range hoods,
                    stovetops, and backsplashes. For food-contact surfaces, such
                    as cutting boards and countertops, use a sanitizing solution
                    to eliminate harmful bacteria. After applying the cleaner,
                    scrub the surfaces with a cloth or sponge to ensure all
                    residue is removed. Rinse with clean water and then sanitize
                    using a food-safe sanitizer.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Section 3: Living Room/Family Room Cleaning
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To maintain a clean and inviting living room, begin by
                    decluttering surfaces to ensure that cleaning can be
                    thorough. Dust all surfaces using a microfiber cloth or a
                    duster, starting from the highest points like shelves and
                    light fixtures, and working your way down to lower surfaces.
                    Pay special attention to electronics, as they can attract
                    dust. For furniture, use manufacturer-recommended cleaners
                    or a damp cloth for routine wiping. Regularly vacuum
                    upholstered furniture to remove debris and allergens, and
                    consider using a fabric refresher for an added touch of
                    freshness.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Section 4: Bedroom Cleaning
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    A clean bedroom is a sanctuary for rest and relaxation. The
                    process starts with decluttering and creating a clear space
                    to work. Remove any items that don't belong, such as dishes
                    or misplaced objects. Next, strip the bed and start a load
                    of laundry for the linens. This is a great time to dust all
                    surfaces, following the top-to-bottom rule. Start with
                    ceiling fans, light fixtures, and the tops of furniture,
                    then move to lower surfaces like nightstands and dressers.
                    Wipe down mirrors, windows, and any glass surfaces. After
                    dusting, vacuum the entire room thoroughly, including under
                    the bed and in the corners. If you have hard floors, mop
                    after vacuuming. Finally, make the bed with fresh linens,
                    empty the trash, and do a final walkthrough to ensure a
                    tidy, peaceful space.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="handling-different-rooms"
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
