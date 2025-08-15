"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function YouAreTheService() {
  // Gate: must have completed the "Fundamentals" module first
  // We check the last lesson of the previous module to ensure completion
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["final-inspection-habits"],
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
                  currentLessonId="you-are-the-service"
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
                    You are the Service
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “They’re not just buying the clean — they’re buying you.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    You Are the Face of the Brand
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Your presence can greatly influence how clients perceive you
                    and your brand. Factors like body language, tone of voice,
                    and even the way you dress can lead to different
                    interpretations. Being aware of these elements allows you to
                    present yourself in a way that aligns with your values and
                    the image you want to convey.
                  </p>

                  <blockquote className="my-6 text-center italic text-gray-600">
                    “Your attitude and energy walk in before your vacuum does.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    First Impressions Matter
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    First impressions are crucial as they establish the
                    foundation for client relationships. It is essential to
                    focus on the aspects that truly matter, such as
                    professionalism, active listening, and understanding client
                    needs. Creating a positive and engaging environment can
                    significantly influence how clients perceive your business
                    and its services.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Professional Presence Checklist
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Maintaining a professional presence creates trust throughout
                    the service by demonstrating reliability, competence, and
                    respect for clients and colleagues. When individuals present
                    themselves professionally, it fosters an environment of
                    confidence where clients feel secure in their interactions
                    and are more likely to engage positively.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    You’re Not Just Representing Yourself
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Every aspect of your conduct reflects on the Sweet Africa
                    brand. It is essential to embody the values and mission of
                    the brand in your actions and interactions. Strive for
                    professionalism, positivity, and integrity in all
                    situations, as this will not only enhance the brand's
                    reputation but also foster trust and loyalty among clients
                    and partners.
                  </p>

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Be the most reliable thing in the client's day.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="you-are-the-service"
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
