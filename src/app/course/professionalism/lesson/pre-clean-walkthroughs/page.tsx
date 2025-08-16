"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import MultiStepViewer from "@/components/MultiStepViewer"; // Import the new component

export default function PreCleanWalkthroughs() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["communication-on-the-job"],
  });

  const walkthroughSteps = [
    {
      title: "Greet the Client Professionally",
      description:
        "Begin the walkthrough by greeting the client with a friendly and professional demeanor. Establishing a positive rapport from the outset sets a cooperative tone for the entire process.",
    },
    {
      title: "Ask About Specific Needs",
      description:
        "Inquire about the client's specific cleaning requirements and preferences. This includes understanding the areas of focus, any special concerns, and the desired outcomes for the cleaning service.",
    },
    {
      title: "Observe All Areas Closely",
      description:
        "Carefully examine each area that requires cleaning. Take your time to assess the cleanliness, identify any problem spots, and note the overall condition of the space. This observation is crucial for planning effective cleaning.",
    },
    {
      title: "Take Mental Notes or Document Findings",
      description:
        "As you observe, either memorize key findings or jot them down for reference. Documenting your observations helps in creating a tailored cleaning plan that addresses the client's needs accurately.",
    },
    {
      title: "Confirm Task Boundaries and Conditions",
      description:
        "Before concluding the walkthrough, confirm any specific boundaries regarding the cleaning tasks and any special conditions that may apply. This clarity ensures that both you and the client share the same understanding of the job scope.",
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
                  currentLessonId="pre-clean-walkthroughs"
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
                    Pre-Clean Walkthroughs
                  </h1>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What to Ask During a Walkthrough
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Identifying the right questions to ask can guide the
                    conversation and uncover critical information about the
                    client's requirements, fostering a collaborative
                    environment.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What to Look for During the Walkthrough
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Assessing key areas helps in preparing for cleaning tasks
                    and brings attention to particular client concerns, allowing
                    for a targeted and efficient approach.
                  </p>

                  {/* Interactive Component */}
                  <MultiStepViewer steps={walkthroughSteps} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Walkthrough Do's and Don'ts
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Maintaining professional etiquette is essential for creating
                    a positive impression. Demonstrating respect, attentiveness,
                    and a helpful attitude fosters a comfortable environment and
                    enhances the client's overall experience.
                  </p>

                  <hr className="my-12 border-gray-200" />

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    A pre-clean walkthrough is essential for client satisfaction
                    and clarity.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="pre-clean-walkthroughs"
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
