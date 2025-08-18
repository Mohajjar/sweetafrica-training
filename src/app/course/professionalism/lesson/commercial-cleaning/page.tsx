"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import Tabs from "@/components/Tabs";

export default function CommercialCleaning() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["residential-cleaning"],
  });

  const conductGuidelines = [
    {
      title: "Security and Professional Protocols",
      content:
        "This section highlights the security and professional protocols that need to be maintained by commercial cleaners in order to protect both the client’s business and the cleaner’s professional reputation. It is essential for cleaners to adhere to strict confidentiality agreements to safeguard sensitive information within the client's premises. Ensuring that all cleaning staff are properly trained in safety procedures and have undergone background checks is critical to establish trust and reliability. Moreover, commercial cleaners must use appropriate cleaning products and techniques that comply with industry regulations, demonstrating a commitment to safety and environmental responsibility. Maintaining transparency in communication regarding cleaning schedules, methods, and any incidents that may occur is vital for building long-lasting professional relationships. Additionally, having insurance coverage protects both the business and the cleaner against potential liabilities. By following these protocols, commercial cleaners can create a secure environment for clients while enhancing their own professional credibility in the market.",
    },
    {
      title: "Commercial Cleaning Priorities (Per Space)",
      content:
        "In this section, we will detail the cleaning priorities specific to different types of commercial spaces, ensuring that all areas are properly addressed. For offices, the focus should be on high-touch surfaces such as desks, keyboards, and doorknobs to reduce the spread of germs. Additionally, regular vacuuming and dusting of common areas and meeting rooms are essential to maintain a clean and professional environment. In retail spaces, maintaining cleanliness in high-traffic areas is crucial. This includes frequent sweeping and mopping of floors, cleaning display shelves, and ensuring fitting rooms are tidy. Special attention should also be given to restrooms to enhance customer experience. In healthcare facilities, cleaning protocols must adhere to strict hygiene standards. This involves disinfecting patient areas, waiting rooms, and medical equipment regularly. It is crucial to follow guidelines for infection control to ensure the safety of patients and staff. For restaurants, kitchen cleanliness is a top priority alongside dining areas. This includes proper sanitation of food prep areas, dining tables, and restrooms. Regular deep cleaning of equipment and thorough inspections are necessary to comply with health regulations. Lastly, in educational institutions, classrooms, hallways, and communal spaces should be cleaned regularly. Emphasis should be placed on disinfecting frequently touched surfaces, such as desks and lockers, to protect students and staff. By establishing cleaning priorities tailored to each type of commercial space, we can ensure a healthier and more inviting environment for employees and customers alike.",
    },
    {
      title: "Common Mistakes to Avoid in Commercial Jobs",
      content:
        "One common mistake in commercial cleaning jobs is overlooking areas that require regular attention, such as high-touch surfaces and corners. To avoid this, create a detailed checklist that includes all areas needing cleaning and ensure it is followed consistently. Another mistake is using the wrong cleaning products for specific surfaces, which can lead to damage or ineffective cleaning. Neglecting to communicate with clients about their specific needs can result in dissatisfaction. Establish clear communication channels and schedule regular check-ins to ensure that services meet client expectations. Finally, failing to perform quality control checks can lead to ongoing issues. Implement a quality control system that includes regular inspections and feedback mechanisms to maintain high standards and address any concerns promptly.",
    },
    {
      title: "What Clients Expect in Commercial Cleans",
      content:
        "Clients expect a high standard of cleanliness, reliability, and professionalism from commercial cleaning services. To meet these expectations, cleaners should implement thorough training programs for their staff to ensure consistency in service quality. Regular communication with clients is also crucial; this includes understanding their specific needs and preferences, which can vary from one client to another. Additionally, using advanced cleaning techniques and eco-friendly products can enhance client satisfaction, as many organizations are increasingly concerned about environmental sustainability. Timely service delivery and flexibility in scheduling are vital components as well, allowing clients to maintain their operations without disruption. Finally, soliciting feedback and being responsive to client concerns can foster stronger relationships and demonstrate a commitment to exceptional service. By focusing on these areas, commercial cleaners can effectively meet client expectations, ensuring lasting partnerships and client loyalty.",
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
                  currentLessonId="commercial-cleaning"
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
                    Commercial Cleaning
                  </h1>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “You’re not just cleaning a space — you’re protecting a
                    business.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What Makes Commercial Cleaning Unique
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Commercial cleaning services are tailored to meet the unique
                    needs of businesses and organizations, which often involve
                    larger spaces and a higher volume of traffic compared to
                    residential settings. One of the key characteristics of
                    commercial cleaning is the emphasis on efficiency and
                    thoroughness. Professional commercial cleaners are trained
                    to manage extensive areas, ensuring that every corner of an
                    office, retail space, or industrial facility is properly
                    maintained.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Another distinct characteristic is the use of specialized
                    equipment and cleaning products designed for commercial
                    environments. This includes advanced cleaning machines,
                    industrial-strength disinfectants, and eco-friendly
                    solutions that comply with health regulations. The aim is to
                    create a clean and safe environment for employees and
                    customers while minimizing downtime for the business.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Furthermore, commercial cleaning often requires a more
                    flexible schedule to accommodate the hours of operation of a
                    business. Many companies opt for after-hours cleaning
                    services to avoid disrupting daily operations, which
                    highlights the importance of reliability and professionalism
                    in this sector.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Finally, commercial cleaning services usually involve
                    contract-based arrangements, ensuring consistency in service
                    delivery. This professional approach not only fosters a
                    cleaner work environment but also enhances the overall image
                    and reputation of the business, contributing to a more
                    productive workplace.
                  </p>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “Your job is to clean thoroughly, without disrupting the
                    environment or systems in place.”
                  </blockquote>

                  <Tabs items={conductGuidelines} />
                  <hr className="my-12 border-gray-200" />

                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Commercial cleaning is defined by professionalism,
                    efficiency, and a focus on sanitation.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Lesson Summary
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    In summary, commercial cleaning requires a disciplined
                    approach that emphasizes control, consistency, and respect
                    for the business environment. Cleaners must follow
                    established guidelines to ensure the smooth operation of the
                    workplace.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="commercial-cleaning"
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
