"use client";

import Shell from "@/components/Shell";
import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";

export default function AdminHome() {
  return (
    <AdminGuard>
      <Shell>
        <section className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Admin Console
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage users, progress, quizzes, and platform settings.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Users */}
            <Link
              href="/admin/users"
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div className="text-sm text-gray-500">Directory</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Users
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  View accounts, search, and manage admin access.
                </p>
                <span className="mt-4 inline-block text-green-700 group-hover:text-green-800">
                  Open →
                </span>
              </div>
            </Link>

            {/* Progress */}
            <Link
              href="/admin/progress"
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div className="text-sm text-gray-500">Analytics</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Progress
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  See completion by user or section; export CSV.
                </p>
                <span className="mt-4 inline-block text-green-700 group-hover:text-green-800">
                  Open →
                </span>
              </div>
            </Link>

            {/* Content */}
            <Link
              href="/admin/content"
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div className="text-sm text-gray-500">Lessons</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Content Manager
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Edit lesson text, reorder, and manage assets.
                </p>
                <span className="mt-4 inline-block text-green-700 group-hover:text-green-800">
                  Open →
                </span>
              </div>
            </Link>

            {/* Quizzes */}
            <Link
              href="/admin/quizzes"
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div className="text-sm text-gray-500">Assessments</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Quiz Builder
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Add questions, set passing %, and preview.
                </p>
                <span className="mt-4 inline-block text-green-700 group-hover:text-green-800">
                  Open →
                </span>
              </div>
            </Link>

            {/* Branding */}
            <Link
              href="/admin/branding"
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div className="text-sm text-gray-500">Appearance</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Branding
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Update logo, colors, and welcome text.
                </p>
                <span className="mt-4 inline-block text-green-700 group-hover:text-green-800">
                  Open →
                </span>
              </div>
            </Link>

            {/* Announcements */}
            <Link
              href="/admin/announcements"
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div className="text-sm text-gray-500">Comms</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Announcements
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Post a banner to the dashboard for all users.
                </p>
                <span className="mt-4 inline-block text-green-700 group-hover:text-green-800">
                  Open →
                </span>
              </div>
            </Link>
          </div>
        </section>
      </Shell>
    </AdminGuard>
  );
}
