"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";

export default function SafetyAndSelfProtection() {
  useAutoGate("fundamentals", "safety-and-self-protection");

  // Gate: must have completed "Tools & Supplies"
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["tools-and-supplies"],
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
                  currentLessonId="safety-and-self-protection"
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
                    Safety and Self-Protection
                  </h1>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Importance of Personal Protective Equipment (PPE)
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Personal protective equipment (PPE) is essential for
                    ensuring safety and health during cleaning tasks. It
                    includes items such as gloves, masks, goggles, and
                    protective clothing that serve as barriers against hazards
                    such as chemicals, pathogens, and physical injuries. Proper
                    training in how to select, use, and maintain PPE is crucial.
                    By consistently using the correct PPE, workers can protect
                    themselves from potential hazards, thereby decreasing the
                    likelihood of accidents and health issues related to
                    cleaning tasks. This proactive approach promotes a safer
                    working environment and enhances overall workplace safety
                    culture.
                  </p>

                  <figure className="my-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Core PPE Items for Cleaners
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
                    Best Practices for Chemical Handling
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Handling chemicals safely is essential to prevent accidents
                    or health issues. This includes following label instructions
                    and being aware of dangerous mixtures. It is important to
                    wear appropriate personal protective equipment, such as
                    gloves, goggles, and masks, to minimize exposure.
                    Additionally, proper storage of chemicals in clearly labeled
                    containers and following disposal guidelines can help ensure
                    a safe working environment. Regular training and
                    communication about chemical safety practices should also be
                    implemented to maintain awareness and preparedness among all
                    personnel.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Recognizing Unsafe Cleaning Conditions
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Identifying unsafe conditions in the work environment is
                    essential to ensure safety. Being aware of these hazards can
                    prevent accidents before they happen. Regularly inspecting
                    the workplace, providing safety training, and encouraging
                    open communication about potential dangers are key
                    strategies to enhance safety. Employees should be trained to
                    recognize signs of danger, such as faulty equipment,
                    cluttered workspaces, insufficient lighting, and lack of
                    safety gear. Implementing safety protocols and encouraging a
                    culture of vigilance can significantly reduce the risk of
                    incidents and promote a safer work environment for everyone.
                  </p>

                  <figure className="my-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Spotting Unsafe Situations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="aspect-video rounded-lg border border-gray-200 bg-gray-100 grid place-items-center text-xs text-gray-400"
                        >
                          Image {n} from Screenshot
                        </div>
                      ))}
                    </div>
                  </figure>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Responding to Incidents
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Effective communication during an incident is essential.
                    Individuals should be trained on how to report incidents
                    promptly and accurately, ensuring all necessary details are
                    conveyed. Additionally, having knowledge of first aid can
                    help mitigate the effects of an injury or emergency
                    situation, potentially saving lives. Regular drills and
                    training sessions can enhance preparedness, ensuring
                    everyone knows their role and responsibilities when an
                    incident occurs. Understanding the importance of these
                    protocols can lead to quicker response times and improved
                    outcomes in critical situations.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="safety-and-self-protection"
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
