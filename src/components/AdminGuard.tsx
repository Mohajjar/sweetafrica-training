"use client";

import { ReactNode } from "react";
import Link from "next/link";
import useIsAdmin from "@/hooks/useIsAdmin";

/**
 * Wrap any admin-only page with <AdminGuard>…</AdminGuard>
 * - Shows a small loader while checking role
 * - Blocks access for non-admins
 */
export default function AdminGuard({ children }: { children: ReactNode }) {
  const { loading, isAdmin, user } = useIsAdmin();

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <span className="h-3 w-3 animate-pulse rounded-full bg-gray-300" />
          <span>Checking admin access…</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-white border rounded-2xl shadow p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Access denied</h1>
        <p className="mt-2 text-gray-600">
          {user
            ? `Your account (${
                user.email ?? "signed-in user"
              }) is not an admin.`
            : "You are not signed in."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          {!user && (
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg bg-green-600 hover:bg-green-700 text-white px-5 py-2 text-sm font-semibold shadow"
            >
              Go to Login
            </Link>
          )}
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-5 py-2 text-sm font-semibold shadow"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
