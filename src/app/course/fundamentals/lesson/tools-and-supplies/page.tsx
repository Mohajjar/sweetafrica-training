"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import useLessonGate from "@/hooks/useLessonGate";
import { getLessons } from "@/lib/modules";
import LessonFooter from "@/components/LessonFooter";
import useAutoGate from "@/hooks/useAutoGate";

export default function ToolsAndSupplies() {
  useAutoGate("fundamentals", "tools-and-supplies");
  // 🔒 Gate: must finish Basic Cleaning Chemistry before this lesson
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["basic-cleaning-chemistry"],
  });

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left: tracker */}
              <aside className="md-col-span-1">
                <CourseTracker
                  moduleId="fundamentals"
                  lessons={getLessons("fundamentals")}
                  currentLessonId="tools-and-supplies"
                />
              </aside>

              {/* Right: content */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Fundamentals of Cleaning
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Tools & Supplies
                  </h1>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Cleaning Equipment Overview
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      One of the primary tools for effective professional
                      cleaning is a high-quality vacuum cleaner. It is important
                      to select a vacuum that is suitable for the types of
                      surfaces you will be cleaning, such as carpets, hardwood
                      floors, or upholstery. Regularly checking and replacing
                      the filters, as well as cleaning the brush rolls, will
                      ensure optimal performance.
                    </p>
                    <p>
                      Another essential item is microfiber cloths. These cloths
                      are highly effective for dusting and wiping surfaces
                      without leaving lint or streaks. To maintain their
                      effectiveness, wash them without fabric softeners and
                      allow them to air dry.
                    </p>
                    <p>
                      Brooms and mops are also fundamental tools. A sturdy broom
                      paired with a dustpan helps in sweeping hard floors, while
                      a mop is crucial for deep cleaning. Keep mops clean by
                      rinsing them thoroughly after use and allowing them to dry
                      properly to prevent odors and bacteria growth.
                    </p>
                    <p>
                      For more specialized tasks, you may need tools like
                      sponges, scrub brushes, and a range of cleaning chemicals
                      designed for different surfaces and stains. Always follow
                      the manufacturer's instructions for usage and storage of
                      these cleaning agents to ensure safety and effectiveness.
                    </p>
                    <p>
                      Personal protective equipment, such as gloves and masks,
                      should not be overlooked. These items protect cleaners
                      from chemicals and allergens, making their work safer and
                      more comfortable.
                    </p>
                    <p>
                      Lastly, invest in a durable caddy or cleaning cart to
                      organize and transport your supplies efficiently. This not
                      only saves time but also ensures that all necessary tools
                      are easily accessible.
                    </p>
                    <p>
                      By understanding the importance of each tool and their
                      proper maintenance, you can enhance your cleaning
                      efficiency and achieve professional results.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Cloths, Pads & Sponges – Know the Difference
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      Understanding the differences between various cloths,
                      pads, and sponges is crucial for effective cleaning
                      without damage. Each material has its unique properties
                      that make it suitable for specific tasks. For instance,
                      microfiber cloths are known for their ability to trap dirt
                      and dust while being gentle on surfaces, making them ideal
                      for delicate finishes. Cotton cloths are absorbent and
                      great for drying, but they may not be as effective at
                      picking up fine particles.
                    </p>
                    <p>
                      On the other hand, pads and sponges can vary significantly
                      in texture and purpose. Scrub pads, often made from
                      durable synthetic materials, are useful for tougher stains
                      but can easily scratch sensitive surfaces. Soft sponges
                      are better for general cleaning and applying soap but may
                      harbor bacteria if not properly cleaned and dried.
                    </p>
                    <p>
                      Choosing the right cleaning tool for the job can prevent
                      damage to surfaces and improve overall cleaning
                      efficiency. It's essential to consider the material
                      composition and the surface being cleaned to select the
                      appropriate cloth, pad, or sponge for optimal results.
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Optional but Powerful Tools
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Some optional tools that can enhance cleaning include
                    specialized brushes for different surfaces, steam cleaners
                    for sanitizing, microfiber cloths for dusting and polishing,
                    and vacuum attachments designed for hard-to-reach areas.
                    Items like carpet cleaners and upholstery machines can also
                    significantly improve deep cleaning, while air purifiers
                    help maintain a fresh environment. Choosing the right
                    optional tools can make a substantial difference in the
                    thoroughness and efficiency of your cleaning routine.
                  </p>

                  <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600 text-center">
                    “Clients notice when your gear looks clean, high-quality,
                    and professional.”
                    <span className="block text-sm text-gray-500 mt-1">
                      Pro Tip from Lesson 3
                    </span>
                  </blockquote>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Packing a Basic Kit
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    A basic cleaning kit should include the following essential
                    items for efficiency and effectiveness:
                  </p>
                  <ol className="list-decimal pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>All-purpose cleaner:</strong> Suitable for various
                      surfaces.
                    </li>
                    <li>
                      <strong>Glass cleaner:</strong> For windows and mirrors.
                    </li>
                    <li>
                      <strong>Disinfectant wipes:</strong> Quick and convenient
                      for sanitizing surfaces.
                    </li>
                    <li>
                      <strong>Microfiber cloths:</strong> Ideal for dusting and
                      wiping without scratching.
                    </li>
                    <li>
                      <strong>Scrub brush:</strong> Useful for tough stains and
                      grout.
                    </li>
                    <li>
                      <strong>Broom and dustpan:</strong> For sweeping up
                      debris.
                    </li>
                    <li>
                      <strong>Mop:</strong> Either a traditional or spray mop
                      for floors.
                    </li>
                    <li>
                      <strong>Trash bags:</strong> For easy disposal of waste.
                    </li>
                    <li>
                      <strong>Sponges:</strong> For scrubbing and wiping
                      surfaces.
                    </li>
                    <li>
                      <strong>Rubber gloves:</strong> To protect hands while
                      cleaning.
                    </li>
                  </ol>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Keep these items in a lightweight, portable caddy or tote
                    for easy access and organization.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Tool Maintenance
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    Regular maintenance of your cleaning tools is crucial for
                    optimal performance and preventing the spread of dirt. Here
                    are some tips to keep your tools in top condition:
                  </p>
                  <ol className="list-decimal pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Clean after each use:</strong> Rinse or wipe down
                      your tools immediately after using them to remove dirt and
                      debris.
                    </li>
                    <li>
                      <strong>Check for damage:</strong> Regularly inspect your
                      tools for any signs of wear or damage. Replace any broken
                      or worn parts to maintain efficiency.
                    </li>
                    <li>
                      <strong>Store properly:</strong> Keep your tools in a dry
                      and clean location to prevent mold and deterioration.
                    </li>
                    <li>
                      <strong>Sanitize when necessary:</strong> For tools that
                      come in contact with bacteria or allergens, such as mops
                      or sponges, ensure they are sanitized regularly.
                    </li>
                    <li>
                      <strong>Follow manufacturer instructions:</strong> Always
                      refer to the manufacturer's care guidelines to ensure
                      proper maintenance.
                    </li>
                  </ol>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    By following these tips, you can extend the life of your
                    cleaning tools and ensure they continue to work effectively.
                  </p>

                  <hr className="my-8 border-gray-200" />

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Mastering your toolkit makes you faster, cleaner, and more
                    confident.
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Lesson Summary
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    In conclusion, tools are essential extensions of the
                    cleaner’s capabilities, directly affecting the quality of
                    work. The right tools not only enhance efficiency but also
                    ensure that tasks are completed to a high standard. As such,
                    investing in quality equipment is crucial for achieving
                    optimal results in cleaning endeavors. The impact of tools
                    on performance cannot be overstated, as they significantly
                    influence both the speed and effectiveness of cleaning
                    processes. Ultimately, a well-equipped cleaner is empowered
                    to deliver superior service and maintain high standards of
                    cleanliness.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="tools-and-supplies"
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
