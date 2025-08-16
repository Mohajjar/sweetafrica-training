"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import MultiStepViewer from "@/components/MultiStepViewer";

export default function WhenSomethingGoesWrong() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["managing-expectations-and-boundaries"],
  });

  const responseSteps = [
    {
      title: "Pause & Breathe",
      description:
        "Stay still. Reset. Don’t react emotionally. Clients mirror your tone — panic creates panic.",
    },
    {
      title: "Own It and Log It",
      description:
        "Use professional language and body language to acknowledge the issue. Always take 1–3 photos. Log the time and summary for step 3. Always remember, whatever issue you’re owning to, we’re owning it with you.",
    },
    {
      title: "Notify Management",
      description:
        "Incidents must be reported before the end of every job. Report anything broken, any complaint or argument, any unsafe feeling or environment, and any feedback that could impact the company’s reputation.",
    },
    {
      title: "Exit Calm",
      description:
        "If the situation escalates (angry client, injury, serious damage), step away and call your team lead or supervisor. Never argue with the customer. If a mistake happened, offer to fix what you can but never promise refunds, discounts, or service guarantees — those come from HQ.",
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
                  currentLessonId="when-something-goes-wrong"
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
                    When Something Goes Wrong
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “Mistakes don’t ruin trust — hiding them does.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The 4 Categories of On-the-Job Incidents
                  </h2>
                  <div className="text-base text-gray-700 leading-relaxed mb-6 space-y-4">
                    <div>
                      <strong>1. Accidents:</strong> Dropped or broken items,
                      spills that cause damage, scratches from wrong
                      product/tool.
                    </div>
                    <div>
                      <strong>2. Client Issues:</strong> Complaints about missed
                      areas, unreasonable demands, rude behavior, surprise
                      guests.
                    </div>
                    <div>
                      <strong>3. Cleaner Issues:</strong> Running behind
                      schedule, forgotten tools, misuse of a product.
                    </div>
                    <div>
                      <strong>4. Safety & Escalation Events:</strong> Feeling
                      unsafe, mold or biohazards, injury on-site, locked out.
                    </div>
                  </div>

                  {/* Interactive Component */}
                  <MultiStepViewer steps={responseSteps} />

                  <hr className="my-12 border-gray-200" />

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Lesson Summary
                  </h3>
                  <ul className="list-disc pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      Every cleaner will face an unexpected issue — what matters
                      is your <strong>response, not perfection</strong>.
                    </li>
                    <li>
                      Sweet Africa trains cleaners to act fast, stay calm, and
                      protect the client relationship.
                    </li>
                    <li>
                      The moment something goes wrong is the moment you earn
                      their trust — or lose it.
                    </li>
                    <li>
                      Report everything. Document clearly. Speak professionally.
                      Let leadership step in where needed.
                    </li>
                  </ul>

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Always take ownership, never hide or deflect.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="when-something-goes-wrong"
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
