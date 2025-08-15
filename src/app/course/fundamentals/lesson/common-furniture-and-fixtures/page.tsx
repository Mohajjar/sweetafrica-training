"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function CommonFurnitureAndFixtures() {
  // Gate: must have completed "Handling Different Rooms"
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["handling-different-rooms"],
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
                  currentLessonId="common-furniture-and-fixtures"
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
                    Common Furniture & Fixtures
                  </h1>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Understanding Common Furniture & Fixtures
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      Common household furniture and fixtures that require
                      regular cleaning and maintenance include sofas, chairs,
                      tables, and beds. Sofas and chairs often accumulate dust,
                      pet hair, and stains. Regular vacuuming and spot cleaning
                      can help maintain their condition.
                    </p>
                    <p>
                      Tables, whether wooden or glass, should be wiped down
                      regularly to prevent the buildup of grime and food
                      particles. Other fixtures, such as light fixtures,
                      shelves, and decorative items, also need attention.
                      Establishing a regular cleaning routine for these items
                      not only contributes to a tidy appearance but also
                      enhances the overall hygiene of your home environment.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Correct Cleaning Methods for Different Surfaces
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      For <strong>glass surfaces</strong>, use a glass cleaner
                      or a mixture of vinegar and water to achieve a streak-free
                      shine. Apply with a microfiber cloth to avoid scratches.
                    </p>
                    <p>
                      <strong>Wood surfaces</strong> require a gentle approach.
                      Use a damp cloth for dusting and a wood cleaner for deeper
                      cleaning, making sure to never saturate the wood.
                    </p>
                    <p>
                      For <strong>stainless steel</strong>, use a specific
                      stainless steel cleaner or a mixture of soapy water. Wipe
                      in the direction of the grain to prevent streaking.
                    </p>
                    <p>
                      <strong>Carpets</strong> should be vacuumed regularly. For
                      stains, use a carpet cleaner or a vinegar-water solution,
                      blotting instead of rubbing to lift the stain.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    How to Clean Upholstered Furniture
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      Start by vacuuming the entire piece of furniture using an
                      upholstery attachment. This removes loose dirt, dust, and
                      pet hair. Pay special attention to crevices and under
                      cushions. For spot cleaning, check the manufacturer's tag
                      for the cleaning code (W, S, W/S, or X). Use the
                      appropriate cleaning solution and blot the stain gently
                      with a clean, white cloth. Never rub, as this can spread
                      the stain. For a deeper clean, a portable upholstery
                      cleaner or a steam cleaner can be very effective. Always
                      allow the furniture to dry completely before using it
                      again.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Pro Tips for Cleaning Delicate Materials
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    For wood, always use a soft, lint-free cloth to avoid
                    scratches, and apply a suitable wood conditioner or polish
                    to maintain its finish. When cleaning fabric, test any
                    cleaning solution on a hidden area first to prevent
                    discoloration, and consider using a gentle brush to remove
                    dust without damaging the fibers. For glass, use a
                    streak-free cleaner and a microfiber cloth to achieve a
                    clear shine, and avoid cleaning in direct sunlight to
                    prevent streaks from forming.
                  </p>

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Correct cleaning methods are essential to maintain furniture
                    longevity and aesthetics.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="common-furniture-and-fixtures"
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
