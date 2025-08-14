"use client";

import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import useIsAdmin from "@/hooks/useIsAdmin";
import { useState } from "react";
import { curriculum, getModuleTitle } from "@/lib/curriculum";
import type { ModuleId } from "@/lib/curriculum";

const ALL_MODULE_IDS = Object.keys(curriculum) as ModuleId[];

export default function AdminProgressPage() {
  const { isAdmin, loading } = useIsAdmin();
  const [moduleFilter, setModuleFilter] = useState<ModuleId>(ALL_MODULE_IDS[0]);

  if (loading) return null;

  if (!isAdmin) {
    return (
      <AuthGuard>
        <Shell>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold text-red-600">Admins only</h1>
          </div>
        </Shell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Shell>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header + Module filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-sm text-gray-500">Admin</div>
              <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Module</label>
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value as ModuleId)}
                className="rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {ALL_MODULE_IDS.map((m) => (
                  <option key={m} value={m}>
                    {getModuleTitle(m)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Placeholder card (we'll wire the table next) */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-gray-700">
              Showing data for:{" "}
              <span className="font-medium">
                {getModuleTitle(moduleFilter)}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (We’ll wire up the detailed progress table next.)
            </p>
          </div>
        </div>
      </Shell>
    </AuthGuard>
  );
}
