"use client";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import Link from "next/link";
import { FaPlay, FaCheckCircle } from "react-icons/fa"; // Importing icons for a more visual design

export default function Dashboard() {
  // Hardcoded for demonstration, but this would be dynamic data
  const courseStatus = {
    title: "Welcome to Sweet Africa Global",
    lastLesson: "Who We Are",
    progress: 33, // Example: 1 out of 3 lessons complete
    isCompleted: false,
    link: "/course/welcome",
  };

  return (
    <AuthGuard>
      <Shell>
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Your training at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Course Card */}
            <div className="bg-white rounded-xl shadow-md border p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Your Training
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {courseStatus.title}
                  </h3>
                </div>
                {courseStatus.isCompleted ? (
                  <FaCheckCircle className="text-green-500 text-3xl mt-1" />
                ) : (
                  <FaPlay className="text-green-500 text-3xl mt-1" />
                )}
              </div>
              <p className="mt-4 text-gray-600">
                You last worked on:{" "}
                <span className="font-medium text-gray-800">
                  {courseStatus.lastLesson}
                </span>
              </p>

              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${courseStatus.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span>Progress</span>
                  <span>{courseStatus.progress}% complete</span>
                </div>
              </div>

              <Link
                href={courseStatus.link}
                className="mt-6 inline-flex items-center rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-3 text-sm font-semibold shadow-md"
              >
                {courseStatus.isCompleted ? "View Course" : "Continue Training"}{" "}
                →
              </Link>
            </div>

            {/* Other cards can go here */}
            <div className="bg-white rounded-xl shadow-md border p-6 md:p-8 flex flex-col items-center justify-center text-center text-gray-500">
              <p className="text-lg">More features and courses coming soon!</p>
            </div>
          </div>
        </section>
      </Shell>
    </AuthGuard>
  );
}
