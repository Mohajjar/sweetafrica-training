"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import MultiStepViewer from "@/components/MultiStepViewer";

export default function ManagingExpectationsAndBoundaries() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["pre-clean-walkthroughs"],
  });

  const extraWorkSteps = [
    {
      title: "Assess the Situation",
      description:
        "Immediately evaluate the area to understand the extent of the additional cleaning required. Look for any specific spots, surfaces, or items that need attention beyond the original plan.",
    },
    {
      title: "Communicate with the Client",
      description:
        "Reach out to the client promptly to inform them of the extra work needed. Discuss the nature of the tasks, how long they might take, and any potential implications on scheduling or pricing.",
    },
    {
      title: "Prioritize the Tasks",
      description:
        "Determine which extra tasks are most urgent or important. Make a list and rank the tasks based on the client's priorities and the level of dirt or disarray.",
    },
    {
      title: "Gather Necessary Supplies",
      description:
        "Collect cleaning supplies, tools, and equipment needed to address the additional tasks effectively. Ensure you have everything required to meet the standards of cleanliness expected by the client.",
    },
    {
      title: "Perform the Extra Work",
      description:
        "Once approved, complete the additional tasks with the same level of quality and attention to detail as the rest of the job, following all standard procedures.",
    },
    {
      title: "Provide Feedback to the Client",
      description:
        "Once the extra work is completed, update the client on what was accomplished. Seek their feedback and ensure that they are satisfied with the additional services provided.",
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
                  currentLessonId="managing-expectations-and-boundaries"
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
                    Managing Expectations & Boundaries
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “The best time to solve a problem is before it starts.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    How to Set Boundaries Professionally
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Handling unexpected requests from clients professionally
                    involves several key steps. First, remain calm and composed.
                    Take a moment to listen actively to the client's needs and
                    clarify any details. Next, assess the feasibility of the
                    request. If it can be accommodated, communicate your plan
                    clearly. If the request cannot be fulfilled, explain the
                    reasons in a respectful manner and offer alternative
                    solutions.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    If You Spot Something That Needs Extra Work
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    When additional work is needed, it's important to
                    communicate effectively with clients. Be transparent and
                    clearly explain why the additional work is necessary.
                    Provide options, set expectations regarding timelines and
                    costs, and listen to their concerns. Always follow up after
                    the work is done to ensure satisfaction.
                  </p>

                  {/* Interactive Component */}
                  <MultiStepViewer steps={extraWorkSteps} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What NOT to Say
                  </h2>
                  <div className="space-y-2 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      During client interactions, it is important to maintain
                      professionalism by avoiding certain phrases. Here are some
                      examples:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Avoid using slang or informal language.</li>
                      <li>
                        Do not make negative comments about past clients or
                        colleagues.
                      </li>
                      <li>
                        Avoid saying "I don't know" without offering to find a
                        solution.
                      </li>
                      <li>
                        Do not interrupt the client; always listen actively.
                      </li>
                      <li>Avoid making promises you cannot keep.</li>
                    </ul>
                  </div>

                  <hr className="my-12 border-gray-200" />

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Polite, clear, and firm boundaries foster professional
                    relationships.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="managing-expectations-and-boundaries"
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
