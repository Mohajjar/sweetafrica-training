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

            {/* Announcements - Locked */}
            <div className="group rounded-2xl border bg-gray-50 p-6 shadow-sm opacity-60">
              <div>
                <div className="text-sm text-gray-500">Comms</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  Announcements
                </h3>
                <p className="text-sm text-gray-600 mt-2">Coming soon</p>
                <span className="mt-4 inline-block text-gray-500">Locked</span>
              </div>
            </div>
          </div>
        </section>
      </Shell>
    </AdminGuard>
  );
}
