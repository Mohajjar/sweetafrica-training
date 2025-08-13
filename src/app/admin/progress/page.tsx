"use client";

import { useEffect, useMemo, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import Shell from "@/components/Shell";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaSearch, FaDownload } from "react-icons/fa";
import {
  curriculum,
  getModuleTitle,
  getTotalLessons,
  type ModuleId,
} from "@/lib/curriculum";

// ---- Types ----
type UserRow = {
  id: string;
  email?: string;
  displayName?: string;
};

type ModuleProgress = {
  completedCount: number;
  total: number;
  percent: number; // 0..100 integer
  quizPassed?: boolean;
  updatedAt?: string; // display only
};

type ProgressState = Record<string, Record<ModuleId, ModuleProgress>>;
//             uid ─────┘      └─ moduleId

const ALL_MODULE_IDS = Object.keys(curriculum) as ModuleId[]; // ["welcome"]

export default function AdminProgressPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [progress, setProgress] = useState<ProgressState>({});
  const [loadingProg, setLoadingProg] = useState(true);

  const [moduleFilter, setModuleFilter] = useState<ModuleId | "all">("all");
  const [qText, setQText] = useState("");

  // Subscribe to all users (root /users)
  useEffect(() => {
    const usersCol = collection(db, "users");
    const qy = query(usersCol, orderBy("email"));
    const unsub = onSnapshot(qy, (snap) => {
      const rows: UserRow[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        rows.push({
          id: d.id,
          email: data?.email,
          displayName: data?.displayName,
        });
      });
      setUsers(rows);
      setLoadingUsers(false);
    });
    return () => unsub();
  }, []);

  // Fetch progress per user for each module in curriculum (one-time on user list change)
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoadingProg(true);
      const next: ProgressState = {};

      for (const u of users) {
        const perUser: Record<ModuleId, ModuleProgress> = {} as any;

        for (const moduleId of ALL_MODULE_IDS) {
          // progress doc
          const pRef = doc(db, "users", u.id, "progress", moduleId);
          const pSnap = await getDoc(pRef);
          const completed = Array.isArray(pSnap.data()?.completedLessonIds)
            ? (pSnap.data()!.completedLessonIds as unknown[]).length
            : 0;
          const total = getTotalLessons(moduleId);
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const updatedAt =
            pSnap.data()?.updatedAt?.toDate?.()?.toISOString?.() ?? undefined;

          // quiz meta
          const qRef = doc(db, "users", u.id, "quizzes", moduleId);
          const qSnap = await getDoc(qRef);
          const quizPassed = Boolean(qSnap.data()?.passed);

          perUser[moduleId] = {
            completedCount: completed,
            total,
            percent: pct,
            quizPassed,
            updatedAt,
          };
        }

        next[u.id] = perUser;
      }

      if (!cancelled) {
        setProgress(next);
        setLoadingProg(false);
      }
    }

    if (users.length > 0) loadAll();
    else {
      setProgress({});
      setLoadingProg(false);
    }

    return () => {
      cancelled = true;
    };
  }, [users]);

  // Filter & search
  const filtered = useMemo(() => {
    const s = qText.trim().toLowerCase();
    return users.filter((u) => {
      if (s) {
        const hay = `${u.email ?? ""} ${u.displayName ?? ""}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [users, qText]);

  // Export CSV
  const exportCSV = () => {
    const rows: string[] = [];
    const header = [
      "UID",
      "Name",
      "Email",
      "Module",
      "Lessons Completed",
      "Total Lessons",
      "Percent",
      "Quiz Passed",
      "Updated At",
    ];
    rows.push(header.join(","));

    for (const u of filtered) {
      const perUser = progress[u.id] || {};
      const modules = moduleFilter === "all" ? ALL_MODULE_IDS : [moduleFilter];

      for (const m of modules) {
        const p = perUser[m] || {
          completedCount: 0,
          total: getTotalLessons(m),
          percent: 0,
          quizPassed: false,
          updatedAt: "",
        };

        const r = [
          csv(u.id),
          csv(u.displayName ?? ""),
          csv(u.email ?? ""),
          csv(getModuleTitle(m)),
          String(p.completedCount),
          String(p.total),
          String(p.percent),
          p.quizPassed ? "Yes" : "No",
          csv(p.updatedAt ?? ""),
        ].join(",");

        rows.push(r);
      }
    }

    const blob = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "progress-export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminGuard>
      <Shell>
        <section className="space-y-8">
          <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Progress
              </h1>
              <p className="text-gray-600 mt-1">
                View completion by user and export CSV.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Module filter */}
              <select
                value={moduleFilter}
                onChange={(e) =>
                  setModuleFilter(e.target.value as ModuleId | "all")
                }
                className="rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All sections</option>
                {ALL_MODULE_IDS.map((m) => (
                  <option key={m} value={m}>
                    {getModuleTitle(m)}
                  </option>
                ))}
              </select>

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Search name or email…"
                  className="w-64 rounded-xl border pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Export */}
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold shadow"
              >
                <FaDownload />
                Export CSV
              </button>
            </div>
          </header>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">User</th>
                  <th className="text-left px-4 py-3 font-semibold">Email</th>
                  <th className="text-left px-4 py-3 font-semibold">Section</th>
                  <th className="text-left px-4 py-3 font-semibold">Lessons</th>
                  <th className="text-left px-4 py-3 font-semibold">Percent</th>
                  <th className="text-left px-4 py-3 font-semibold">Quiz</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers || loadingProg ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Loading…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filtered.flatMap((u) => {
                    const perUser = progress[u.id] || {};
                    const modules =
                      moduleFilter === "all" ? ALL_MODULE_IDS : [moduleFilter];

                    return modules.map((m) => {
                      const p = perUser[m] || {
                        completedCount: 0,
                        total: getTotalLessons(m),
                        percent: 0,
                        quizPassed: false,
                      };

                      return (
                        <tr key={`${u.id}-${m}`} className="border-t">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">
                              {u.displayName || "—"}
                            </div>
                            <div className="text-xs text-gray-500">
                              UID: {u.id}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {u.email || "—"}
                          </td>
                          <td className="px-4 py-3">{getModuleTitle(m)}</td>
                          <td className="px-4 py-3">
                            {p.completedCount}/{p.total}
                          </td>
                          <td className="px-4 py-3">{p.percent}%</td>
                          <td className="px-4 py-3">
                            {p.quizPassed ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                                ✓ Passed
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold">
                                Not yet
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    });
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </Shell>
    </AdminGuard>
  );
}

// --- utils ---
function csv(v: string) {
  // simple CSV escape
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
