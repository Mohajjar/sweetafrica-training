"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function CleaningSystemsAndFlow() {
  // Gate: must have completed "Safety and Self-Protection"
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["safety-and-self-protection"],
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
                  currentLessonId="cleaning-systems-and-flow"
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
                    Cleaning Systems and Flow
                  </h1>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Why Systems Matter
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      A systematic approach to cleaning is crucial for
                      maintaining a hygienic and organized environment. This
                      method not only promotes efficiency but also ensures that
                      no area is overlooked. One of the primary benefits is the
                      time saved during the cleaning process, as a well-planned
                      routine allows for tasks to be completed more swiftly and
                      effectively.
                    </p>
                    <p>
                      Additionally, a systematic approach reduces the risk of
                      cross-contamination, which is essential for health and
                      safety. By following a consistent method, individuals can
                      create a cleaner and safer space, whether in homes,
                      offices, or public areas. Moreover, such an approach can
                      lead to longer-lasting cleanliness, as regular maintenance
                      prevents the buildup of dirt and grime.
                    </p>
                    <p>
                      Overall, adopting a systematic method for cleaning
                      enhances productivity, promotes health, and contributes to
                      a more pleasant environment for everyone.
                    </p>
                  </div>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600 text-center">
                    “A cleaner with a system is 10x faster and more consistent
                    than one without.”
                    <span className="block text-sm text-gray-500 mt-1">
                      Cleaning Systems Lesson
                    </span>
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Core Rule – Top to Bottom, Left to Right
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    This principle emphasizes a systematic approach to cleaning,
                    where starting from the highest point allows debris and dust
                    to fall to lower surfaces, ensuring that every area is
                    addressed without revisiting previously cleaned spots.
                    Following this methodical path minimizes the chances of
                    overlooking areas while maximizing efficiency and
                    effectiveness in the cleaning process.
                  </p>

                  <figure className="my-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Systematic Cleaning Directions
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="aspect-square rounded-lg border border-gray-200 bg-gray-100 grid place-items-center text-xs text-gray-400"
                        >
                          Image {n} from Screenshot
                        </div>
                      ))}
                    </div>
                  </figure>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Task Order Within a Room
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding the sequence of tasks is crucial for improving
                    efficiency and avoiding redundancy in work processes. By
                    organizing tasks logically, teams can streamline their
                    efforts, ensuring that everyone is clear on their
                    responsibilities and that resources are utilized
                    effectively. This proactive approach minimizes errors and
                    maximizes productivity, contributing to overall project
                    success.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Room Entry Strategy – Where to Start
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Proper entry strategy helps maintain cleanliness throughout
                    the process. It establishes a foundation for organization
                    and efficiency, minimizing the chances of
                    cross-contamination and ensuring that all materials are
                    handled correctly. By adhering to a systematic approach,
                    teams can avoid unnecessary mess, streamline workflows, and
                    foster a more productive environment. This disciplined
                    method not only promotes hygiene but also enhances overall
                    safety and quality in operations.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The “Dry Before Wet” Rule
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding the importance of the 'dry before wet' rule
                    can enhance cleaning effectiveness by ensuring that surfaces
                    are first free of dust and debris before applying any wet
                    cleaning methods. This approach prevents the trapping of
                    dirt and grime, leading to more thorough cleaning results.
                    It also helps avoid streaks and ensures that cleaning
                    solutions can work effectively on the surface. Adhering to
                    this rule can save time and resources while achieving a
                    cleaner environment.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Zone vs. Task Cleaning Styles
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding different cleaning styles helps in choosing
                    the most effective approach for various settings. Each
                    environment may have specific requirements and challenges,
                    making it essential to assess the best methods for
                    cleanliness and hygiene. For instance, in a residential
                    setting, a thorough deep clean may be necessary
                    periodically, while a more routine cleanup may suffice for
                    daily maintenance. In commercial spaces, adhering to health
                    regulations and ensuring a presentable environment can
                    dictate a more regimented cleaning schedule. Moreover,
                    understanding the unique characteristics of different
                    surfaces and materials can influence the choice of cleaning
                    agents and tools. Ultimately, recognizing the diverse
                    cleaning styles enables a tailored approach that enhances
                    effectiveness and efficiency across multiple contexts.
                  </p>

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Always prioritize a clear flow in your cleaning process for
                    the best results.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="cleaning-systems-and-flow"
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
