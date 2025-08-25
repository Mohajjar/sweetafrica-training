"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaSearch, FaDownload } from "react-icons/fa";
import type { ModuleId } from "@/lib/curriculum";
import { curriculum, getModuleTitle, getTotalLessons } from "@/lib/curriculum";

type UserRow = {
  id: string;
  email?: string;
  displayName?: string;
  progress: {
    completed: number;
    total: number;
    percent: number;
    quizPassed?: boolean;
  };
};

const ALL_MODULE_IDS = Object.keys(curriculum) as ModuleId[];

export default function ProgressClient() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [qText, setQText] = useState("");
  const [moduleFilter, setModuleFilter] = useState<ModuleId>("welcome");

  useEffect(() => {
    const usersCol = collection(db, "users");
    const qy = query(usersCol, orderBy("email"));
    const unsub = onSnapshot(qy, async (snap) => {
      const rows: UserRow[] = [];
      for (const userDoc of snap.docs) {
        const userData = userDoc.data();
        const pRef = doc(db, "users", userDoc.id, "progress", moduleFilter);
        const pSnap = await getDoc(pRef);
        const completedCount = Array.isArray(pSnap.data()?.completedLessonIds)
          ? (pSnap.data()!.completedLessonIds as unknown[]).length
          : 0;
        const total = getTotalLessons(moduleFilter);
        const percent =
          total > 0 ? Math.round((completedCount / total) * 100) : 0;

        const qRef = doc(db, "users", userDoc.id, "quizzes", moduleFilter);
        const qSnap = await getDoc(qRef);
        const quizPassed = Boolean(qSnap.data()?.passed);

        rows.push({
          id: userDoc.id,
          email: userData?.email,
          displayName: userData?.displayName,
          progress: {
            completed: completedCount,
            total,
            percent,
            quizPassed,
          },
        });
      }
      setUsers(rows);
      setLoading(false);
    });
    return () => unsub();
  }, [moduleFilter]);

  const filtered = useMemo(() => {
    const s = qText.trim().toLowerCase();
    if (!s) return users;
    return users.filter((u) => {
      const hay = `${u.email ?? ""} ${u.displayName ?? ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [users, qText]);

  const exportCSV = () => {
    const rows: string[] = [];
    rows.push(
      [
        "UID",
        "Name",
        "Email",
        "Module",
        "Lessons Completed",
        "Total Lessons",
        "Progress (%)",
        "Quiz Passed",
      ].join(",")
    );
    for (const u of filtered) {
      rows.push(
        [
          csv(u.id),
          csv(u.displayName || ""),
          csv(u.email || ""),
          csv(getModuleTitle(moduleFilter)),
          String(u.progress.completed),
          String(u.progress.total),
          String(u.progress.percent),
          u.progress.quizPassed ? "Yes" : "No",
        ].join(",")
      );
    }
    const blob = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress-${moduleFilter}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Progress
          </h1>
          <p className="text-gray-600 mt-1">
            Track user progress through the training modules.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value as ModuleId)}
            className="rounded-xl border bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {ALL_MODULE_IDS.map((m) => (
              <option key={m} value={m}>
                {getModuleTitle(m)}
              </option>
            ))}
          </select>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold shadow"
          >
            <FaDownload />
            Export CSV
          </button>
        </div>
      </header>
      <div className="relative w-full md:w-80">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border px-9 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Email</th>
              <th className="text-left px-4 py-3 font-semibold">Progress</th>
              <th className="text-left px-4 py-3 font-semibold">Quiz</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:odd:bg-white [&>tr]:even:bg-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-600">
                  Loading progress...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/users?uid=${u.id}`}
                      className="hover:underline"
                    >
                      {u.displayName || "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{u.email || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <progress
                        className="w-24 h-2 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400"
                        value={u.progress.percent}
                        max="100"
                      />
                      <span>{u.progress.percent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {u.progress.quizPassed ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                        ✓ Passed
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold">
                        Not Passed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function csv(v: string) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
