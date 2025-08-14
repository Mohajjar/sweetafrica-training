// src/app/admin/users/UsersClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaUserShield,
  FaSearch,
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";
import type { ModuleId } from "@/lib/progress";
import { curriculum, getModuleTitle, getTotalLessons } from "@/lib/curriculum";

/** -------------------------------
 *  TYPES
 *  ------------------------------*/
type UserRow = {
  id: string;
  email?: string;
  displayName?: string;
  role?: string;
};

type UserDoc = {
  email?: string;
  displayName?: string;
  role?: string;
};

type ModuleSummary = {
  completed: number;
  total: number;
  percent: number;
  quizPassed?: boolean;
  updatedAt?: string;
};

type Attempt = {
  percent: number;
  correct: number;
  total: number;
  passed: boolean;
  ts?: { seconds?: number; nanoseconds?: number };
};

const ALL_MODULE_IDS = Object.keys(curriculum) as ModuleId[];

/** ===========================================================
 *  UsersClient: decides list vs detail using ?uid=...
 *  =========================================================== */
export default function UsersClient() {
  const router = useRouter();
  const search = useSearchParams();
  const uid = search.get("uid");

  if (uid) {
    return (
      <AdminUserDetail uid={uid} onBack={() => router.push("/admin/users")} />
    );
  }
  return <UsersTable />;
}

/** -------------------------------
 *  Users Table (no uid)
 *  ------------------------------*/
function UsersTable() {
  const [me, setMe] = useState<string | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [qText, setQText] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setMe(u?.uid ?? null));
    return () => unsub();
  }, []);

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
          role: data?.role,
        });
      });
      setUsers(rows);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const s = qText.trim().toLowerCase();
    if (!s) return users;
    return users.filter((u) => {
      const hay = `${u.email ?? ""} ${u.displayName ?? ""} ${
        u.role ?? ""
      }`.toLowerCase();
      return hay.includes(s);
    });
  }, [users, qText]);

  const setRole = async (uid: string, role: "admin" | "user" | null) => {
    if (uid === me && role !== "admin") {
      alert("You can’t remove your own admin role here.");
      return;
    }
    const ref = doc(db, "users", uid);
    await setDoc(ref, role ? { role } : { role: null }, { merge: true });
  };

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users
          </h1>
          <p className="text-gray-600 mt-1">
            View accounts and manage admin access.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Search email, name, role…"
            className="w-full rounded-xl border px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Email</th>
              <th className="text-left px-4 py-3 font-semibold">Role</th>
              <th className="text-right px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:odd:bg-white [&>tr]:even:bg-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-600">
                  Loading users…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((u) => {
                const isAdmin = u.role === "admin";
                const detailHref = `/admin/users?uid=${u.id}`; // same route, with uid
                return (
                  <tr key={u.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        <Link
                          href={detailHref}
                          className="hover:underline"
                          title="View user details"
                        >
                          {u.displayName || "—"}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500">
                        UID:{" "}
                        <Link
                          href={detailHref}
                          className="hover:underline"
                          title="View user details"
                        >
                          {u.id}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {u.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                          <FaUserShield /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={detailHref}
                          className="rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-3 py-1.5 text-xs font-semibold shadow"
                          title="View details"
                        >
                          View
                        </Link>

                        {!isAdmin ? (
                          <button
                            onClick={() => setRole(u.id, "admin")}
                            className="rounded-lg bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs font-semibold shadow"
                          >
                            Make admin
                          </button>
                        ) : (
                          <button
                            onClick={() => setRole(u.id, "user")}
                            className="rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-3 py-1.5 text-xs font-semibold shadow"
                            disabled={u.id === me}
                            title={
                              u.id === me
                                ? "You can’t remove your own admin role here."
                                : ""
                            }
                          >
                            Remove admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** -------------------------------
 *  User Detail (when uid present)
 *  ------------------------------*/
function AdminUserDetail({ uid, onBack }: { uid: string; onBack: () => void }) {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [summaries, setSummaries] = useState<Record<ModuleId, ModuleSummary>>(
    {} as any
  );
  const [selectedModule, setSelectedModule] = useState<ModuleId>("welcome");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(true);

  useEffect(() => {
    const ref = doc(db, "users", uid);
    const unsub = onSnapshot(ref, (snap) => {
      setUserDoc((snap.data() as UserDoc) ?? {});
      setLoadingUser(false);
    });
    return () => unsub();
  }, [uid]);

  useEffect(() => {
    let cancelled = false;
    async function loadSummaries() {
      setLoadingSummary(true);
      const next: Record<ModuleId, ModuleSummary> = {} as any;

      for (const m of ALL_MODULE_IDS) {
        const pRef = doc(db, "users", uid, "progress", m);
        const pSnap = await getDoc(pRef);
        const completedCount = Array.isArray(pSnap.data()?.completedLessonIds)
          ? (pSnap.data()!.completedLessonIds as unknown[]).length
          : 0;
        const total = getTotalLessons(m);
        const percent =
          total > 0 ? Math.round((completedCount / total) * 100) : 0;
        const updatedAt: string | undefined =
          pSnap.data()?.updatedAt?.toDate?.()?.toISOString?.() ?? undefined;

        const qRef = doc(db, "users", uid, "quizzes", m);
        const qSnap = await getDoc(qRef);
        const quizPassed = Boolean(qSnap.data()?.passed);

        next[m] = {
          completed: completedCount,
          total,
          percent,
          quizPassed,
          updatedAt,
        };
      }

      if (!cancelled) {
        setSummaries(next);
        setLoadingSummary(false);
      }
    }

    loadSummaries();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  useEffect(() => {
    setLoadingAttempts(true);
    const attemptsCol = collection(
      db,
      "users",
      uid,
      "quizzes",
      selectedModule,
      "attempts"
    );
    const qy = query(attemptsCol, orderBy("ts", "desc"));
    const unsub = onSnapshot(qy, (snap) => {
      const rows: Attempt[] = [];
      snap.forEach((d) => rows.push(d.data() as Attempt));
      setAttempts(rows);
      setLoadingAttempts(false);
    });
    return () => unsub();
  }, [uid, selectedModule]);

  const title = useMemo(() => {
    const name = userDoc?.displayName || "—";
    return `User: ${name}`;
  }, [userDoc?.displayName]);

  const exportAttemptsCSV = () => {
    const rows: string[] = [];
    rows.push(
      [
        "UID",
        "Module",
        "Passed",
        "Percent",
        "Correct",
        "Total",
        "Timestamp",
      ].join(",")
    );
    for (const a of attempts) {
      const ts = a.ts?.seconds ? new Date(a.ts.seconds * 1000) : null;
      const date = ts ? ts.toISOString() : "";
      rows.push(
        [
          csv(uid),
          csv(getModuleTitle(selectedModule)),
          a.passed ? "Yes" : "No",
          String(a.percent ?? ""),
          String(a.correct ?? ""),
          String(a.total ?? ""),
          csv(date),
        ].join(",")
      );
    }
    const blob = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attempts-${uid}-${selectedModule}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:underline"
          >
            <FaArrowLeft /> Back to Users
          </button>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="text-gray-600">
            {userDoc?.email ?? "—"} {userDoc?.role ? `• ${userDoc.role}` : ""}
          </p>
        </div>
      </header>

      {/* Module summaries */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Section</th>
              <th className="text-left px-4 py-3 font-semibold">Lessons</th>
              <th className="text-left px-4 py-3 font-semibold">Percent</th>
              <th className="text-left px-4 py-3 font-semibold">Quiz</th>
              <th className="text-left px-4 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:odd:bg-white [&>tr]:even:bg-gray-50">
            {loadingSummary ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-600">
                  Loading summary…
                </td>
              </tr>
            ) : (
              ALL_MODULE_IDS.map((m) => {
                const s = summaries[m] || {
                  completed: 0,
                  total: getTotalLessons(m),
                  percent: 0,
                  quizPassed: false,
                };
                return (
                  <tr key={m}>
                    <td className="px-4 py-3">{getModuleTitle(m)}</td>
                    <td className="px-4 py-3">
                      {s.completed}/{s.total}
                    </td>
                    <td className="px-4 py-3">{s.percent}%</td>
                    <td className="px-4 py-3">
                      {s.quizPassed ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                          ✓ Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold">
                          Not yet
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {s.updatedAt
                        ? new Date(s.updatedAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Attempts */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-gray-500">Assessments</div>
            <h2 className="text-xl font-semibold text-gray-900">
              Quiz Attempts
            </h2>
            <p className="text-gray-600 text-sm">
              Most recent first. Change section to view different attempts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value as ModuleId)}
              className="
                rounded-xl border border-gray-300
                bg-gray-100 text-gray-800
                px-3 py-2 text-sm shadow-sm
                hover:bg-gray-200
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500
              "
            >
              {ALL_MODULE_IDS.map((m) => (
                <option key={m} value={m}>
                  {getModuleTitle(m)}
                </option>
              ))}
            </select>

            <button
              onClick={exportAttemptsCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold shadow"
            >
              <FaDownload />
              Export Attempts CSV
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">When</th>
                <th className="text-left px-4 py-3 font-semibold">Percent</th>
                <th className="text-left px-4 py-3 font-semibold">Correct</th>
                <th className="text-left px-4 py-3 font-semibold">Total</th>
                <th className="text-left px-4 py-3 font-semibold">Passed</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-t [&>tr]:odd:bg-white [&>tr]:even:bg-gray-50">
              {loadingAttempts ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-600"
                  >
                    Loading attempts…
                  </td>
                </tr>
              ) : attempts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-600"
                  >
                    No attempts recorded.
                  </td>
                </tr>
              ) : (
                attempts.map((a, idx) => {
                  const ts = a.ts?.seconds
                    ? new Date(a.ts.seconds * 1000)
                    : null;
                  const when = ts ? ts.toLocaleString() : "—";
                  return (
                    <tr key={idx}>
                      <td className="px-4 py-3">{when}</td>
                      <td className="px-4 py-3">{a.percent}%</td>
                      <td className="px-4 py-3">{a.correct}</td>
                      <td className="px-4 py-3">{a.total}</td>
                      <td className="px-4 py-3">
                        {a.passed ? (
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** utils */
function csv(v: string) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
