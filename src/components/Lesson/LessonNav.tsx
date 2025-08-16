"use client";
import Link from "next/link";

export default function LessonNav({
  nextHref,
  nextLabel = "Next",
  prevHref,
}: {
  nextHref?: string;
  nextLabel?: string;
  prevHref?: string;
}) {
  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
      <div>
        {prevHref && (
          <Link
            href={prevHref}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Previous
          </Link>
        )}
      </div>
      <div>
        {nextHref && (
          <Link
            href={nextHref}
            className="inline-flex items-center rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-3 text-sm font-semibold shadow-md"
            legacyBehavior>
            {nextLabel} →
          </Link>
        )}
      </div>
    </div>
  );
}
