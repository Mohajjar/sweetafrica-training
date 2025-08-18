"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function ProductsAndSetupForDeepCleaning() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: [
      "the-core-difference-between-standard-and-deep-cleaning",
    ],
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
                  moduleId="professionalism"
                  currentLessonId="products-and-setup-for-deep-cleaning"
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
                    Products & Setup for Deep Cleaning
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “You don’t bring a feather duster to a grease war.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Must-Have Tools for Deep Cleans
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    To achieve a professional-grade deep clean, several
                    essential tools are required. First, a high-quality vacuum
                    cleaner with strong suction and various attachments is
                    crucial for removing dirt and debris from carpets,
                    upholstery, and hard-to-reach areas. Next, microfiber cloths
                    are important for dusting and wiping surfaces, as they trap
                    dust and dirt effectively without scratching. An all-purpose
                    cleaner is necessary for tackling various surfaces, while
                    specialized cleaners for glass, wood, and floors enhance the
                    cleaning process. A mop and bucket, or a steam mop, are
                    important for disinfecting hard floors, ensuring they are
                    sanitized and spotless. For bathrooms and kitchens, a scrub
                    brush or an abrasive sponge can help remove tough stains and
                    grime. Lastly, a set of gloves protects your hands while
                    cleaning, and optional tools like a carpet cleaner or nozzle
                    attachments for air vents may enhance the cleaning
                    thoroughness. Having these tools readily available can make
                    the deep cleaning process efficient and effective.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Product Categories to Master
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Critical product categories for deep cleaning include
                    surface cleaners, disinfectants, carpet cleaners, and
                    degreasers. Surface cleaners are essential for everyday
                    grime and dirt removal on various surfaces such as counters
                    and floors. Disinfectants are crucial for killing germs and
                    bacteria in high-touch areas. Carpet cleaners help in
                    removing stains and odors from carpets and upholstery, while
                    degreasers are designed to tackle tough grease and oils in
                    kitchens and industrial settings. Additionally, specialized
                    equipment like floor scrubbers and steam cleaners play
                    important roles in achieving thorough cleanliness,
                    particularly in larger spaces. Lastly, protective gear such
                    as gloves and masks is important to ensure safety during the
                    cleaning process.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Time-Saving Techniques for Deep Cleans
                  </h2>
                  <ol className="list-decimal pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      Create a cleaning schedule to break tasks into manageable
                      chunks.
                    </li>
                    <li>
                      Gather all necessary cleaning supplies before you start to
                      avoid interruptions.
                    </li>
                    <li>
                      Use multi-surface cleaners to reduce the number of
                      products needed.
                    </li>
                    <li>
                      Tackle one room at a time to maintain focus and
                      efficiency.
                    </li>
                    <li>
                      Declutter as you clean, removing unnecessary items to make
                      the process smoother.
                    </li>
                    <li>
                      Use timers to create a sense of urgency and keep you
                      motivated.
                    </li>
                    <li>
                      Prioritize high-traffic areas first to make an immediate
                      impact.
                    </li>
                  </ol>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Implementing these strategies can significantly reduce the
                    time spent on deep cleaning while ensuring thoroughness.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Mistakes to Avoid
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Identifying common mistakes that can impede deep cleaning
                    efforts is essential for achieving optimal results. One
                    frequent error is skipping necessary preparation, such as
                    decluttering the area before cleaning. This can lead to
                    inefficient use of time and ineffective cleaning. Another
                    mistake is using the wrong cleaning products for specific
                    surfaces, which can cause damage or fail to remove stains
                    effectively. Overlooking high-touch areas, such as doorknobs
                    and light switches, can also leave spaces less sanitized
                    than expected. Additionally, not allowing sufficient time
                    for each task can result in rushed cleaning and missed
                    spots. Failing to follow a systematic approach, like
                    starting from the top and working down, can lead to dirt and
                    debris being spread around rather than removed. Lastly,
                    neglecting to maintain cleaning tools, like vacuum filters
                    or mop heads, can diminish their effectiveness and
                    compromise the quality of the clean. Avoiding these common
                    pitfalls can enhance deep cleaning efforts and ensure a
                    thorough and efficient cleaning process.
                  </p>

                  <hr className="my-12 border-gray-200" />
                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Smart setup equals faster work and better results.
                  </p>
                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="products-and-setup-for-deep-cleaning"
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
