"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import CourseTracker from "@/components/CourseTracker";
import LessonFooter from "@/components/LessonFooter";
import { getLessons } from "@/lib/modules";

export default function WhoWeAre() {
  // The automatic completion logic has been removed from here.
  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Shell>
          <div className="container mx-auto px-4 py-8 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left Column (Navigation) */}
              <aside className="md:col-span-1">
                <CourseTracker
                  moduleId="welcome"
                  currentLessonId="who-we-are"
                  lessons={getLessons("welcome")}
                />
              </aside>

              {/* Right Column (Lesson Content) */}
              <main className="md:col-span-3">
                <article className="bg-white rounded-xl shadow-md border p-6 md:p-10">
                  <div className="text-sm text-gray-500 mb-2">
                    Sweet Africa Global LLC
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Who We Are
                  </h1>

                  <p className="text-xl text-gray-600 font-light mb-8">
                    Before we teach you how to clean, we show you what we stand
                    for.
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Our Story
                  </h2>
                  <p className="text-base text-gray-700 mb-4 leading-relaxed">
                    <strong>Sweet Africa Global LLC</strong> is more than a
                    cleaning company — we’re a purpose‑driven team built from
                    the ground up by working‑class professionals, for
                    working‑class professionals. We operate in the Inland
                    Empire, San Bernardino, Los Angeles, and Orange County, with
                    one goal in mind: consistent quality, respect, and
                    reliability.
                  </p>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We believe in working smarter, not just harder. We don’t
                    chase gimmicks or overpromise luxury. What we offer is
                    consistency, care, and systems that work. Our clients know
                    us by the quality of our routines, the reliability of our
                    people, and the respect we show to every space we enter.
                  </p>

                  <figure className="my-8">
                    <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} // replace with your real ID
                        title="CEO Message"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <figcaption className="text-center text-sm text-gray-500 mt-2">
                      Meet the CEO — why we exist and how we work.
                    </figcaption>
                  </figure>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    What Clients Notice
                  </h2>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Consistency over perfection. Quality routines. Professional
                    communication. The little details done right, every time.
                  </p>

                  <LessonFooter
                    moduleId="welcome"
                    lessonId="who-we-are"
                    requireAck={false}
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
