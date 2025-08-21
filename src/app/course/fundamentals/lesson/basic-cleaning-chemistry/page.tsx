"use client";

import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import useAutoGate from "@/hooks/useAutoGate";
import LessonFooter from "@/components/LessonFooter";
import AuthGuard from "@/components/AuthGuard";
import { getLessons } from "@/lib/modules";
import useLessonGate from "@/hooks/useLessonGate"; // 👈 Import the hook
import Image from "next/image";

export default function BasicCleaningChemistry() {
  // 🔒 Gate: must finish "Defining Cleaning" before this lesson
  useLessonGate({
    moduleId: "fundamentals",
    requireCompleted: ["defining-cleaning"],
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
                  currentLessonId="basic-cleaning-chemistry"
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
                    Basic Cleaning Chemistry
                  </h1>

                  {/* pH overview */}
                  <p className="text-xl text-gray-600 font-light mb-8">
                    The pH scale runs 0–14. Below 7 is acidic, 7 is neutral,
                    above 7 is alkaline. Cleaners work differently across this
                    range: acids excel at mineral deposits and rust; alkalines
                    cut grease and food residues. Matching pH to the task gets
                    better results and avoids surface damage.
                  </p>

                  <blockquote className="my-6 border-l-4 border-green-500 pl-4 italic text-gray-700">
                    “Use acids on minerals, and alkalines on grease and food
                    messes.”
                  </blockquote>

                  {/* (Optional) visual placeholder */}
                  <figure className="my-8">
                    <div className="aspect-[16/9] w-full rounded-xl border border-gray-200 bg-gray-100 grid place-items-center text-gray-400">
                      <Image
                        src="/basic-cleaning-systems.webp"
                        alt="pH scale for cleaning products"
                        width={1024}
                        height={576}
                        className="rounded-xl"
                      />
                    </div>
                    <figcaption className="text-center text-sm text-gray-500 mt-2">
                      Add a pH diagram or product lineup (we’ll swap later).
                    </figcaption>
                  </figure>

                  <hr className="my-8 border-gray-200" />

                  {/* Matching the Cleaner to the Job */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Matching the Cleaner to the Job
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      Choose products by surface and soil. Tile/laminate: a
                      multipurpose cleaner removes general dirt without damage.
                      Wood: use wood-safe formulas to protect finishes. Glass:
                      glass cleaners for a streak-free shine.
                    </p>
                    <p>
                      Fabrics/upholstery: use material-safe spot cleaners to
                      avoid discoloration. Kitchens: degreasers for stovetops
                      and appliances; antibacterial cleaners for counters.
                      Bathrooms: products with mold inhibitors for damp areas.
                    </p>
                    <p>
                      Always <strong>test in an inconspicuous spot</strong> to
                      verify compatibility before full application.
                    </p>
                  </div>

                  {/* Key Matching Guidelines */}
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                    Key Matching Guidelines
                  </h3>
                  <ul className="list-disc pl-6 space-y-3 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Surface matters:</strong> hardwood needs gentle,
                      non-stripping cleaners; tile tolerates more robust
                      options.
                    </li>
                    <li>
                      <strong>Soil matters:</strong> grease needs a degreaser;
                      general dirt = multipurpose; minerals = acidic cleaners.
                    </li>
                    <li>
                      <strong>pH matters:</strong> acids lift mineral deposits
                      but can etch stone like marble; choose carefully.
                    </li>
                    <li>
                      <strong>Test first:</strong> small hidden area before full
                      application.
                    </li>
                    <li>
                      <strong>Safety matters:</strong> read labels; use PPE when
                      needed—some products irritate skin or release fumes.
                    </li>
                  </ul>

                  <hr className="my-8 border-gray-200" />

                  {/* Chemical Mixing Risks */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Chemical Mixing – What Can Go Wrong (Fast)
                  </h2>
                  <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <p>
                      Never mix products unless the label explicitly says so.
                      <strong> Bleach + ammonia</strong> → toxic chloramine
                      vapors. <strong>Vinegar + hydrogen peroxide</strong> →
                      peracetic acid (corrosive). Always read labels and ensure
                      ventilation and PPE.
                    </p>
                  </div>

                  <hr className="my-8 border-gray-200" />

                  {/* Safe Handling Practices */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Safe Handling Practices
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    Follow these steps to reduce risk and get consistent
                    results:
                  </p>

                  <ol className="list-decimal pl-6 space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                    <li>
                      <strong>Read Labels:</strong> know hazards, directions,
                      PPE, and first aid.
                    </li>
                    <li>
                      <strong>Wear Protective Gear:</strong> gloves, goggles,
                      masks as appropriate.
                    </li>
                    <li>
                      <strong>Use in Well-Ventilated Areas:</strong> open
                      windows/doors; use fans.
                    </li>
                    <li>
                      <strong>Avoid Mixing Chemicals:</strong> unless the
                      manufacturer says it’s safe.
                    </li>
                    <li>
                      <strong>Store Safely:</strong> original containers, closed
                      tightly; keep from kids/pets; cool, dry, ventilated area.
                    </li>
                    <li>
                      <strong>Dispose Properly:</strong> follow local rules; use
                      designated sites or pickup programs.
                    </li>
                  </ol>

                  <blockquote className="my-6 border-l-4 border-green-500 pl-4 italic text-gray-700">
                    Always prioritize safety and follow guidelines when handling
                    cleaning chemicals.
                  </blockquote>

                  <hr className="my-8 border-gray-200" />

                  {/* Conclusion + Summary */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Conclusion
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Understanding chemistry boosts effectiveness and reduces
                    risk. Matching agents to soils and surfaces protects health
                    and property.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Lesson Summary
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Using the right chemistry improves outcomes and safety. Know
                    your pH ranges, match cleaner to soil and surface, never mix
                    incompatible products, and follow safe-handling steps for a
                    healthier environment and better results.
                  </p>

                  <LessonFooter
                    moduleId="fundamentals"
                    lessonId="basic-cleaning-chemistry"
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
