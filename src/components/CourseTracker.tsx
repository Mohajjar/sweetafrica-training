"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import type { ModuleId } from "@/lib/curriculum";

type Lesson = { id: string; title: string; href: string };
type Props = {
  moduleId: ModuleId;
  lessons: Lesson[];
  currentLessonId?: string;
};

export default function CourseTracker({
  moduleId,
  lessons,
  currentLessonId,
}: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "progress", moduleId);
    const unsub = onSnapshot(ref, (snap) => {
      setCompleted((snap.data()?.completedLessonIds ?? []) as string[]);
    });
    return () => unsub();
  }, [uid, moduleId]);

  const { percent, unlockedIds } = useMemo(() => {
    const done = new Set(completed);
    const unlocked = new Set<string>();
    let gateOpen = true;
    for (const l of lessons) {
      if (gateOpen) unlocked.add(l.id);
      gateOpen = gateOpen && done.has(l.id);
    }
    const pct = Math.min(
      100,
      Math.round((completed.length / lessons.length) * 100)
    );
    return { percent: pct, unlockedIds: unlocked };
  }, [completed, lessons]);

  return (
    <aside className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-900">Course Progress</h3>
        <span className="text-xs text-gray-500">
          {completed.length} / {lessons.length}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="h-2 bg-green-500 rounded-full transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="space-y-2 text-sm">
        {lessons.map((l, i) => {
          const isDone = completed.includes(l.id);
          const isUnlocked = unlockedIds.has(l.id);
          const isCurrent = currentLessonId === l.id;

          if (!isUnlocked) {
            return (
              <li
                key={l.id}
                className="flex items-center justify-between text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <FaLock className="opacity-70" />
                  <span>{l.title}</span>
                </div>
                <span className="text-[11px] bg-gray-100 rounded-full px-2 py-0.5">
                  Locked
                </span>
              </li>
            );
          }

          return (
            <li
              key={l.id}
              className={`flex items-center justify-between ${
                isCurrent ? "text-gray-900 font-medium" : "text-gray-700"
              }`}
            >
              <Link href={l.href}>
                <span className="flex items-center gap-2 hover:underline">
                  {isDone ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-300" />
                  )}
                  <span>{l.title}</span>
                </span>
              </Link>
              <span className="text-[11px] text-gray-500">
                {isDone ? "Done" : `Lesson ${i + 1}`}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
