"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import Tabs from "@/components/Tabs";

export default function ShortTermRentalTurnovers() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["commercial-cleaning"],
  });

  const turnoverPriorities = [
    {
      title: "Speed and Efficiency",
      content:
        "Short-term rental turnovers are all about speed. The property needs to be perfectly clean and ready for the next guest in a very short window. This means having a clear, efficient system is non-negotiable.",
    },
    {
      title: "Hotel-Level Cleanliness",
      content:
        "Guests expect a level of cleanliness similar to a hotel. This includes fresh linens, spotless bathrooms, and a kitchen that looks untouched. Every detail matters for guest reviews.",
    },
    {
      title: "Restocking and Staging",
      content:
        "Beyond cleaning, turnovers involve restocking essentials like toilet paper, soap, and coffee. It also includes staging the property to look exactly like the listing photos, which means arranging pillows, towels, and decor perfectly.",
    },
    {
      title: "Damage and Maintenance Reporting",
      content:
        "You are the eyes and ears for the property owner. A key part of the turnover is to inspect for any damage left by the previous guest and report any maintenance issues, like a leaky faucet or a burnt-out lightbulb, immediately.",
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
                  currentLessonId="short-term-rental-turnovers"
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
                    Short-Term Rental Turnovers
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “Every turnover is a new first impression.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Unique Demands of Short-Term Rentals
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Cleaning a short-term rental is different from a standard
                    residential or commercial job. It combines the detail of a
                    deep clean with the speed of a hotel room turnover. The goal
                    is not just to clean, but to reset the space to a perfect,
                    welcoming state for the next guest. A five-star review often
                    depends on the quality of the turnover.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Turnover Priorities
                  </h2>
                  <Tabs items={turnoverPriorities} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    The Turnover Checklist: A Step-by-Step Guide
                  </h2>
                  <ol className="list-decimal pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Entry and Assessment:</strong> As you enter,
                      immediately look for any obvious damage or major messes.
                      Take photos of anything unusual before you begin cleaning.
                    </li>
                    <li>
                      <strong>Strip and Remove:</strong> Strip all beds of their
                      linens and gather all used towels. Collect all trash from
                      every room.
                    </li>
                    <li>
                      <strong>Kitchen First:</strong> Start with the kitchen.
                      Wash any dishes, wipe down all appliances and countertops,
                      and clean the inside of the microwave. Check the
                      refrigerator for any leftover food.
                    </li>
                    <li>
                      <strong>Bedrooms and Bathrooms:</strong> Clean and
                      disinfect all bathrooms thoroughly. In the bedrooms, dust
                      all surfaces and make the beds with fresh linens.
                    </li>
                    <li>
                      <strong>General Cleaning:</strong> Vacuum and mop all
                      floors. Clean all glass surfaces and mirrors.
                    </li>
                    <li>
                      <strong>Restock and Stage:</strong> Restock all amenities
                      like toilet paper, paper towels, soaps, and coffee. Stage
                      the property to match the listing photos—fluff pillows,
                      fold towels neatly, and arrange decor.
                    </li>
                    <li>
                      <strong>Final Walkthrough:</strong> Do a final walkthrough
                      to ensure everything is perfect. Check for any missed
                      spots, and make sure the property smells fresh and clean.
                    </li>
                  </ol>

                  <hr className="my-12 border-gray-200" />
                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    A flawless turnover is the key to a successful short-term
                    rental.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Lesson Summary
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Short-term rental turnovers are a specialized skill that
                    requires speed, attention to detail, and a focus on guest
                    experience. By following a consistent checklist and
                    understanding the unique priorities of these properties, you
                    can ensure a five-star rating for cleanliness every time.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="short-term-rental-turnovers"
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
