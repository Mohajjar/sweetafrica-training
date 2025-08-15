"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function CommunicationOnTheJob() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["uniform-gear-and-hygiene-standards"],
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
                  currentLessonId="communication-on-the-job"
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
                    Communication On the Job
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “Professional cleaning isn’t quiet work — it’s clear work.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What to Communicate Before the Job
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Before beginning any cleaning task, it is essential to
                    confirm the details to ensure client satisfaction and
                    clarity. This includes discussing specific requirements,
                    preferences, and any areas of concern. Clear communication
                    helps establish expectations and fosters a positive
                    relationship with the client.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Communication During the Cleaning Process
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Effective communication during the cleaning process fosters
                    trust and helps establish a collaborative relationship with
                    clients. It allows for quick adjustments based on their
                    specific needs and preferences, ensuring a satisfying
                    experience. By actively listening and providing updates,
                    cleaning professionals can reassure clients that their
                    expectations are being prioritized.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Handling Problems with Clear Communication
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Addressing mistakes professionally not only helps in
                    correcting the issue at hand but also reinforces the
                    reputation of the service. When a service provider
                    acknowledges errors and takes steps to rectify them, it
                    demonstrates accountability and commitment to customer
                    satisfaction. This proactive approach can enhance trust with
                    clients and contribute to a positive image in the industry.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What to Say When Wrapping Up
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Final interactions leave lasting impressions; end on a
                    professional note. This sets the stage for future
                    engagements and helps maintain a positive reputation.
                    Acknowledge contributions, express gratitude, and leave the
                    door open for future opportunities.
                  </p>

                  <blockquote className="my-6 text-center italic text-gray-600">
                    “Clear communication builds trust and understanding on the
                    job.”
                  </blockquote>

                  <hr className="my-8 border-gray-200" />

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Closing interactions professionally enhances client
                    relationships.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="communication-on-the-job"
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
