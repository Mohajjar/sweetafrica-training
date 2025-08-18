"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import Accordion from "@/components/Accordion";
import Tabs from "@/components/Tabs";

export default function TheCoreDifferenceBetweenStandardAndDeepCleaning() {
  // Gate: must have completed the previous lesson
  useLessonGate({
    moduleId: "professionalism",
    requireCompleted: ["when-something-goes-wrong"],
  });

  const accordionItems = [
    {
      title: "Introduction to Cleaning Types",
      content:
        "Cleaning is an essential aspect of maintaining hygiene and organization in our living and working spaces. It can generally be categorized into two main types: standard or routine cleaning and deep cleaning. Understanding these distinctions can help individuals and businesses choose the right approach to meet their needs.",
    },
    {
      title: "Key Components of Standard Cleaning",
      content:
        "In routine cleaning, attention is paid to high-touch areas like doorknobs, countertops, and bathrooms. These tasks are often simple and can be performed by individuals without specialized equipment. Regular routine cleaning helps to create a pleasant environment and contributes to overall health.",
    },
    {
      title: "Deep Cleaning Explained",
      content:
        "Deep cleaning, on the other hand, goes beyond the surface to remove hidden dirt and allergens that accumulate over time. This type of cleaning is more comprehensive and involves detailed tasks such as scrubbing grout, cleaning behind appliances, and sanitizing areas that are rarely touched.",
    },
    {
      title: "Importance of Deep Cleaning",
      content:
        "Deep cleaning is crucial for maintaining a healthy living environment, as it helps eliminate harmful bacteria, mold, and dust mites. It is recommended to perform deep cleaning periodically, such as once a season or prior to special occasions, to ensure that all areas of a space are thoroughly sanitized.",
    },
    {
      title: "When to Choose Each Type",
      content:
        "The choice between routine and deep cleaning depends largely on the condition of the space and specific needs. For daily maintenance, routine cleaning suffices, while deep cleaning is essential for seasonal refreshes or after significant events that may increase dirt levels.",
    },
    {
      title: "Conclusion on Cleaning Types",
      content:
        "Understanding the differences between routine and deep cleaning is vital for effective maintenance of your environment. By integrating both types of cleaning into your schedule, you can ensure a healthier, more organized space that meets your needs and those of others.",
    },
  ];

  const tabItems = [
    {
      title: "Assess Time Since Last Clean",
      content:
        "Begin by evaluating how long it has been since the last cleaning service. This helps determine the level of dirt accumulation and which cleaning service might be necessary for optimal results.",
    },
    {
      title: "Identify Visible vs. Hidden Dirt",
      content:
        "Look for both visible dirt, such as dust on surfaces, and hidden dirt in areas like carpets or behind furniture. Recognizing the types of dirt present is crucial in deciding the cleaning approach.",
    },
    {
      title: "Determine Clients' Needs",
      content:
        "Engage with the client to understand their specific cleaning needs and priorities. Consider factors like allergies, preparation for events, or maintenance preferences to tailor the cleaning service accordingly.",
    },
    {
      title: "Recommend Standard or Deep Clean",
      content:
        "Based on the assessments, recommend a cleaning solution. A standard clean is generally sufficient for regular maintenance, while a deep clean is necessary for more thorough sanitation, especially after an extended period.",
    },
    {
      title: "Conclusion",
      content:
        "By following these steps, you can effectively determine the appropriate cleaning service required, ensuring that the client's needs are met with the right type of clean.",
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
                  currentLessonId="the-core-difference-between-standard-and-deep-cleaning"
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
                    The Core Difference Between Standard and Deep Cleaning
                  </h1>

                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    A standard clean, also known as routine cleaning, typically
                    involves routine cleaning tasks that focus on maintaining
                    the cleanliness of a space. This includes vacuuming, dusting
                    surfaces, wiping down countertops, and cleaning bathrooms.
                    The goal is to keep the area tidy and hygienic on a regular
                    basis.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    In contrast, a deep clean is a more thorough process that
                    goes beyond the surface. It involves cleaning areas that are
                    often overlooked during standard cleaning, such as
                    baseboards, behind appliances, inside cupboards, and on
                    light fixtures. A deep clean is usually performed less
                    frequently and is ideal for removing built-up dirt,
                    allergens, and grime, resulting in a more extensive level of
                    cleanliness.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding these distinctions helps clients choose the
                    right type of cleaning service based on their needs, whether
                    for regular maintenance or a more comprehensive cleaning
                    solution.
                  </p>
                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    “If you can’t explain the difference, you can’t charge for
                    it.”
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What is a Standard Clean?
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    A standard clean focuses on surface maintenance tasks to
                    keep spaces looking tidy. This includes tasks such as
                    dusting, vacuuming, mopping floors, wiping down surfaces,
                    and ensuring that all areas are free from clutter. The goal
                    is to maintain an overall appearance that is neat and
                    presentable, which can contribute to a comfortable and
                    inviting environment. Regular standard cleaning can help
                    prolong the life of furnishings and fixtures by preventing
                    the buildup of dirt and grime.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What is a Deep Clean?
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    A deep clean encompasses thorough tasks that address hidden
                    dirt and buildup in various areas, including behind
                    appliances, under furniture, and within hard-to-reach
                    corners. This process often includes detailed cleaning of
                    upholstery, carpets, and drapery, as well as sanitizing
                    surfaces such as kitchen countertops and bathroom fixtures.
                    It's an essential part of maintaining a healthy living
                    environment, improving air quality, and prolonging the
                    lifespan of furnishings and fixtures. Additionally, it can
                    help identify potential maintenance issues before they
                    become more significant problems. Regular deep cleaning is
                    beneficial in creating a clean and comfortable home.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Key Tasks and Considerations
                  </h2>
                  <Accordion items={accordionItems} />

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Timing & Effort Comparison
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    For instance, a deep clean requires more time and effort
                    compared to a standard clean, as it involves meticulous
                    attention to detail and often includes tasks like carpet
                    cleaning, window washing, and thorough kitchen and bathroom
                    sanitization. On the other hand, a routine clean typically
                    focuses on surface cleaning and common areas, allowing for
                    quicker completion. Understanding these differences helps in
                    planning and organizing schedules effectively, ensuring that
                    adequate time and resources are allocated for each type of
                    cleaning task.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    How to Explain the Difference to Clients
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding the differences in cleaning services is
                    crucial for clients to identify their specific needs.
                    Clearly explaining the benefits and features of each service
                    can help clients make informed decisions. This not only
                    enhances their satisfaction but also fosters trust in the
                    services provided. Tailoring the communication to address
                    common concerns and preferences can further improve the
                    client experience. Overall, effective communication about
                    cleaning options leads to better clarity and fulfillment of
                    client requirements.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Evaluating Cleaning Service Needs
                  </h2>
                  <Tabs items={tabItems} />

                  <hr className="my-12 border-gray-200" />
                  <p className="text-lg font-medium text-gray-800 mt-8 text-center">
                    Clearly distinguishing between cleaning types is essential
                    for price and service integrity.
                  </p>

                  <LessonFooter
                    moduleId="professionalism"
                    lessonId="the-core-difference-between-standard-and-deep-cleaning"
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
