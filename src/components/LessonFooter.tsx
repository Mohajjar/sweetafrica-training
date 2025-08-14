"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { markLessonComplete } from "@/lib/progress";
import { getNextLessonId, getPrevLessonId, getLessonHref } from "@/lib/modules";
import type { ModuleId } from "@/lib/modules";

export default function LessonFooter({
  moduleId,
  lessonId,
  requireAck = false,
  ackLabel = "I acknowledge I’ve read and understood.",
}: {
  moduleId: ModuleId;
  lessonId: string;
  requireAck?: boolean;
  ackLabel?: string;
}) {
  const router = useRouter();
  const [uid, setUid] = useState<string | null>(null);
  const [ack, setAck] = useState(!requireAck);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
  }, []);

  const prevId = getPrevLessonId(moduleId, lessonId);
  const nextId = getNextLessonId(moduleId, lessonId);
  const prevHref = prevId
    ? getLessonHref(moduleId, prevId)
    : `/course/${moduleId}`;
  const nextHref = nextId
    ? getLessonHref(moduleId, nextId)
    : `/course/${moduleId}`;
  const canFinish = !!uid && ack;

  const finish = async () => {
    if (!uid || !canFinish) return;
    setSaving(true);
    try {
      await markLessonComplete(uid, moduleId, lessonId);
      router.push(nextHref!);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-6 mt-8 border-t border-gray-200 flex items-center justify-between">
      <Link
        href={prevHref!}
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        ← Back
      </Link>

      <div className="flex flex-col items-end gap-3">
        {requireAck && (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ack}
              onChange={(e) => setAck(e.target.checked)}
              className="h-5 w-5 rounded text-green-500 focus:ring-green-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">{ackLabel}</span>
          </label>
        )}

        <button
          onClick={finish}
          disabled={!canFinish}
          className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold shadow-md transition-colors ${
            canFinish
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {saving ? "Saving…" : nextId ? "Next Lesson →" : "Finish & Return →"}
        </button>
      </div>
    </div>
  );
}
