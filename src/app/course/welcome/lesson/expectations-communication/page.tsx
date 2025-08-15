"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import useLessonGate from "@/hooks/useLessonGate";
import LessonFooter from "@/components/LessonFooter";
import { getLessons } from "@/lib/modules";

export default function ExpectationsCommunication() {
  // Gate: must have completed Lessons 1 and 2
  useLessonGate({
    moduleId: "welcome",
    requireCompleted: ["who-we-are", "vision-mission-values"],
  });

  // The automatic completion logic has been removed from here.
  return (
    <AuthGuard>
      <Shell>
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left Column: Tracker */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="welcome"
                  currentLessonId="expectations-communication"
                  lessons={getLessons("welcome")}
                />
              </aside>

              {/* Right Column (Lesson Content) */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Sweet Africa Global LLC
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Expectations & Communication
                  </h1>
                  <p className="text-xl text-gray-600 font-light mb-8">
                    Clear expectations and respectful communication keep our
                    work consistent, professional, and safe — for clients and
                    teammates.
                  </p>
                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    How We Show Up
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>On time, in uniform, prepared.</strong> Respect
                      schedules and homes/businesses.
                    </p>
                    <p>
                      <strong>Phone etiquette.</strong> No personal calls
                      on-site except emergencies.
                    </p>
                    <p>
                      <strong>Confidentiality.</strong> Never disclose client
                      info or photos without approval.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Communication Standards
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>Speak up early.</strong> If something is unclear
                      or wrong, notify your lead ASAP.
                    </p>
                    <p>
                      <strong>Professional tone.</strong> Be direct, helpful,
                      and solutions-oriented.
                    </p>
                    <p>
                      <strong>Report issues.</strong> Document damages, hazards,
                      or access problems immediately.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Safety & Quality
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      <strong>Follow checklists.</strong> Routines create
                      consistent quality.
                    </p>
                    <p>
                      <strong>Use PPE when required.</strong> Safety first,
                      always.
                    </p>
                    <p>
                      <strong>Label & store.</strong> Keep supplies safe and
                      organized.
                    </p>
                  </div>

                  <LessonFooter
                    moduleId="welcome"
                    lessonId="expectations-communication"
                    requireAck={true}
                    ackLabel="I acknowledge I’ve read and understood the expectations and communication standards."
                  />
                </article>
              </main>
            </div>
          </div>
        </div>
      </Shell>
    </AuthGuard>
  );
}
