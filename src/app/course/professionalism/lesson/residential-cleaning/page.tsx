"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import Tabs from "@/components/Tabs";

export default function ResidentialCleaning() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["deep-clean-timing-and-room-pacing"],
  });

  const conductGuidelines = [
    {
      title: "Respect for Privacy",
      content:
        "Cleaners must always respect the privacy of the homeowners. This means avoiding areas that are not designated for cleaning and not touching personal belongings unless instructed to do so.",
    },
    {
      title: "Professionalism",
      content:
        "Cleaners should maintain a professional demeanor at all times. This includes being punctual, wearing appropriate attire, and communicating clearly with the homeowner regarding any special cleaning requests or concerns.",
    },
    {
      title: "Reliable Communication",
      content:
        "Clear communication is essential. Cleaners should inform homeowners about their schedule, any changes, and provide updates on the cleaning process to ensure transparency and trust.",
    },
    {
      title: "Use of Appropriate Cleaning Products",
      content:
        "It is crucial for cleaners to use suitable cleaning products that are safe for the home and its occupants. Homeowners may have allergies or preferences, and cleaners should be aware of these to avoid potential issues.",
    },
    {
      title: "Attention to Detail",
      content:
        "Cleaners should focus on thoroughness and attention to detail. This means not just surface cleaning but also addressing hidden areas where dirt and dust can accumulate.",
    },
    {
      title: "Respect for Property",
      content:
        "Cleaners must handle all items within the home with care. This includes furniture, decor, and appliances, ensuring that nothing is damaged during the cleaning process.",
    },
    {
      title: "Feedback and Improvement",
      content:
        "Cleaners should be open to feedback from homeowners to improve their services. Constructive criticism is valuable for enhancing the quality of cleaning and meeting client expectations.",
    },
    {
      title: "Confidentiality",
      content:
        "Maintaining confidentiality about the homeowner's lifestyle, preferences, and any personal information is essential. Cleaners should uphold trust by not sharing details with outsiders.",
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
                  currentLessonId="residential-cleaning"
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
                    Residential Cleaning
                  </h1>
                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “It’s their home — treat it with skill and respect.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Professional Conduct in a Private Home
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Absolutely, maintaining professionalism in a client's
                    private space is crucial. It not only demonstrates respect
                    for their personal environment but also fosters trust and
                    rapport. When clients feel secure and valued, they are more
                    likely to engage openly and positively in the professional
                    relationship. This approach ensures that interactions are
                    respectful, appropriate, and conducive to a productive
                    partnership. Prioritizing professionalism helps create a
                    safe atmosphere where clients can share their concerns and
                    aspirations comfortably.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Conduct Guidelines
                  </h2>
                  <Tabs items={conductGuidelines} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Cleaning Around Pets & Children
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Cleaning around pets and children demands specific
                    strategies to ensure safety and respect for the household.
                    It is important to choose cleaning products that are
                    non-toxic and safe for both pets and children. Natural
                    cleaning solutions, such as vinegar and baking soda, can be
                    effective alternatives to harsh chemicals. Additionally, it
                    is crucial to keep cleaning supplies securely stored out of
                    reach to prevent accidental ingestion.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    When cleaning, involve older children in age-appropriate
                    tasks to teach them about responsibility and hygiene. For
                    pet owners, be mindful of the pets' reactions to certain
                    cleaning products and adjust your cleaning routine
                    accordingly.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Establishing a regular cleaning schedule can help maintain a
                    tidy environment while minimizing the potential for messes.
                    Always allow surfaces to dry completely before allowing pets
                    or children back into the area. Maintaining an organized
                    space not only keeps the home clean but also contributes to
                    a safer environment for everyone.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Handling Clutter, Dishes, and Laundry
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    By addressing clutter, dishes, and laundry with care, the
                    cleaner fosters a sense of reliability and professionalism.
                    This approach not only enhances the cleanliness of the space
                    but also builds a positive relationship with the client,
                    reinforcing their trust and respect for the cleaner's work.
                    Prioritizing attention to detail in these everyday tasks can
                    significantly impact the overall client experience, ensuring
                    that their home is not only tidy but also a reflection of
                    the care and effort invested in maintaining it.
                  </p>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “People don’t just see dirt in their homes — they feel it.”
                  </blockquote>
                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="residential-cleaning"
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
