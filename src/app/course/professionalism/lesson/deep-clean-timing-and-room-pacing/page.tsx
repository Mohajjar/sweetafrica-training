"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import Accordion from "@/components/Accordion";

export default function DeepCleanTimingAndRoomPacing() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["products-and-setup-for-deep-cleaning"],
  });

  const timingGuidelines = [
    {
      title: "Kitchen Cleaning Time",
      content:
        "Cleaning the kitchen typically takes between 45 to 60 minutes. This timeframe allows for a thorough cleaning of surfaces, appliances, and floors.",
    },
    {
      title: "Bathroom Cleaning Duration",
      content:
        "The bathroom can be cleaned in approximately 40 to 50 minutes. This includes scrubbing the toilet, sink, shower, and floors to maintain hygiene.",
    },
    {
      title: "Bedroom Cleaning Estimate",
      content:
        "Cleaning the bedroom usually requires about 30 to 40 minutes. This involves dusting, changing linens, and organizing any clutter.",
    },
    {
      title: "Living Room Maintenance Time",
      content:
        "The living room generally takes 35 to 45 minutes to clean. This process includes dusting surfaces, vacuuming or sweeping, and tidying up.",
    },
    {
      title: "Entryway and Hall Cleaning",
      content:
        "Cleaning entryways and halls can be done in around 15 to 20 minutes. The focus is on tidying up shoes, coats, and any other items in the way.",
    },
    {
      title: "Impact of Infrequent Cleaning",
      content:
        "If a space hasn't been cleaned in over three months, it's advisable to add an extra 20 to 30% to the estimated cleaning time. This accounts for the accumulation of dirt and grime.",
    },
    {
      title: "Regular Cleaning Benefits",
      content:
        "Regular cleaning can help maintain a tidy environment and reduce the amount of time needed for deep cleans. Staying on top of chores minimizes buildup.",
    },
    {
      title: "Planning Your Cleaning Schedule",
      content:
        "Creating a cleaning schedule can assist in managing your time effectively. Allocate specific tasks to days of the week to ensure all areas are regularly maintained.",
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
                  currentLessonId="deep-clean-timing-and-room-pacing"
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
                    Deep Clean Timing & Room Pacing
                  </h1>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Room-by-Room Timing Guide
                  </h2>
                  <ul className="list-disc pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Living Room:</strong> 30 to 60 minutes. Focus on
                      dusting surfaces, vacuuming carpets, and cleaning
                      upholstery. Take extra time if there are decorative items
                      or electronics to clean.
                    </li>
                    <li>
                      <strong>Kitchen:</strong> 60 to 90 minutes. Prioritize
                      surface cleaning, appliance maintenance, and floor
                      scrubbing. Longer times may be needed for organizing
                      cabinets and deep cleaning the refrigerator.
                    </li>
                    <li>
                      <strong>Bathroom:</strong> 30 to 60 minutes. Clean
                      toilets, sinks, and showers thoroughly. Pay special
                      attention to grout and tile for a fresh look.
                    </li>
                    <li>
                      <strong>Bedroom:</strong> 30 to 45 minutes. Dust
                      furniture, vacuum carpets, and change linens. Additional
                      time may be required for organizing closets or drawers.
                    </li>
                    <li>
                      <strong>Home Office:</strong> 30 to 60 minutes. Dust
                      surfaces, clean electronics, and organize paperwork.
                      Extended cleaning may be necessary if paperwork is
                      cluttered.
                    </li>
                    <li>
                      <strong>Hallways and Stairs:</strong> 20 to 30 minutes.
                      Vacuum or sweep, and wipe down any railings or light
                      fixtures.
                    </li>
                  </ul>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    In general, preparation and planning can help streamline the
                    process, ensuring deep cleaning is effective and efficient.
                    Always have your cleaning supplies ready to maximize
                    productivity.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Timing Guidelines
                  </h2>
                  <Accordion items={timingGuidelines} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Entry Point Strategy – Where to Start
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    An entry point strategy allows you to prioritize tasks,
                    ensuring that you tackle the most challenging and visibly
                    dirty areas first. This approach helps to prevent the spread
                    of dirt and contamination as you move through the cleaning
                    process. Additionally, having a clear sequence improves
                    efficiency, as you can systematically work through each zone
                    without redundancy. Start by assessing the space,
                    identifying high-traffic areas, and noting any specific
                    problem spots. Once you have a plan, gather the necessary
                    supplies and equipment to streamline your efforts, and
                    ensure that you are equipped with the right techniques for
                    each cleaning task. This preparation will support a thorough
                    and effective deep cleaning experience.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Internal Pacing – How to Stay on Track
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Additionally, implementing a structured schedule can aid in
                    keeping the team focused and motivated. Regular
                    communication among team members enhances collaboration and
                    allows for quick adjustments if any issues arise. By setting
                    clear objectives for each phase of the cleaning process,
                    everyone involved can align their efforts and maintain a
                    consistent workflow. This approach not only boosts
                    efficiency but also fosters a sense of accountability within
                    the team, ultimately leading to a successful and thorough
                    cleaning operation. Regular feedback sessions can further
                    improve strategies and ensure continuous improvement in the
                    cleaning process.
                  </p>

                  <hr className="my-12 border-gray-200" />
                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Deep cleaning requires a balance of timing, technique, and
                    planning.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Lesson Summary
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    By organizing tasks and gathering necessary supplies
                    beforehand, you can streamline the cleaning process.
                    Moreover, employing the right techniques ensures that each
                    area is addressed thoroughly, leaving no corners overlooked.
                    The choice of cleaning products also plays a crucial role,
                    as using effective agents tailored for specific surfaces can
                    enhance results. Ultimately, a well-executed deep clean not
                    only restores the appearance of your space but also
                    contributes to a healthier environment. Embracing this
                    comprehensive approach transforms cleaning from a chore into
                    a satisfying accomplishment.
                  </p>
                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="deep-clean-timing-and-room-pacing"
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
