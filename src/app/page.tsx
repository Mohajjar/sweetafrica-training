"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// (Keeping these imports in case you later re-enable the landing UI)
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle, FaBookOpen } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  // Force redirect from root to /login
  useEffect(() => {
    router.replace("/login");
  }, [router]);

  // Do not render the landing UI while redirecting
  return null;

  /* ------------------ ORIGINAL LANDING UI (kept intact) ------------------
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Sweet Africa Global Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold text-gray-900">
                Sweet Africa Training
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaUserCircle size={28} />
            </button>
          </div>
        </header>

        <main>
          <div className="card shadow-soft p-8 md:p-12 mb-8 bg-green-500 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome!</h1>
                <p className="text-lg font-light opacity-90 max-w-2xl">
                  Welcome to the Sweet Africa Global training platform. Your journey to excellence starts here.
                </p>
                <Link
                  href="/course/welcome"
                  className="mt-6 inline-flex items-center rounded-lg bg-white text-green-600 hover:bg-gray-100 transition-colors px-6 py-3 text-sm font-semibold shadow-md"
                >
                  <FaBookOpen className="mr-2" /> Start Your First Course
                </Link>
              </div>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-900">Module 1: Welcome</h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">You have completed 1 of 3 lessons.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "33%" }} />
                </div>
              </div>

              <div className="card shadow-soft p-6 opacity-60">
                <h3 className="text-lg font-semibold text-gray-900">Module 2: Cleaning Basics</h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">Not yet started.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "0%" }} />
                </div>
              </div>

              <div className="card shadow-soft p-6 opacity-60">
                <h3 className="text-lg font-semibold text-gray-900">Module 3: Advanced Techniques</h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">Not yet started.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "0%" }} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
  ------------------------------------------------------------------------ */
}
