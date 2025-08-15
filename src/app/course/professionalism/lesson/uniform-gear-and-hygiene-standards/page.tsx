"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function UniformGearAndHygieneStandards() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["you-are-the-service"],
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
                  currentLessonId="uniform-gear-and-hygiene-standards"
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
                    Uniform, Gear & Hygiene Standards
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “Clients trust clean people. That trust starts with how you
                    show up.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Dress Like You Belong in Their Home
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Presenting a tidy appearance holds great significance. A
                    neat appearance conveys respect for oneself and others,
                    indicating that an individual values the situations they
                    enter and the people they encounter. In a professional
                    environment, a tidy appearance can enhance credibility and
                    authority. Colleagues and clients are more likely to trust
                    someone who presents themselves well, as it reflects
                    professionalism and attention to detail.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Fragrance and Hygiene Standards
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Cleaners should practice good personal hygiene, including
                    regular handwashing and wearing clean uniforms. They should
                    also maintain short nails and avoid wearing strong perfumes
                    or scents. When using air fresheners, opt for natural or
                    hypoallergenic options to prevent overwhelming scents.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Maintaining Gear and Tools
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    The state of your cleaning gear plays a significant role in
                    shaping client perceptions. Clean and well-maintained
                    equipment reflects professionalism and attention to detail.
                    When clients see that you take care of your tools, they are
                    more likely to trust that you will apply the same care to
                    their space. Worn-out or dirty tools may not clean
                    effectively, leading to unsatisfactory results.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Non-Verbal Communication in Client Interactions
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Conveying professionalism and competence without words can
                    be achieved through several key non-verbal cues. Body
                    language plays a crucial role; standing tall with an open
                    posture exudes confidence. Maintaining appropriate eye
                    contact shows engagement and sincerity. Dressing
                    appropriately for the context reflects care and respect.
                  </p>

                  <hr className="my-8 border-gray-200" />

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Lesson Summary
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Looking clean and prepared before starting any cleaning task
                    is important. It sets a professional tone and demonstrates
                    respect for the environment being cleaned. A neat appearance
                    can also boost confidence and create a more positive
                    mindset, making the cleaning process more efficient and
                    leading to better results.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="uniform-gear-and-hygiene-standards"
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
