import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

export async function markLessonComplete(
  uid: string,
  courseId: string,
  lessonId: string
) {
  const ref = doc(db, "users", uid, "progress", courseId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      completedLessonIds: [lessonId],
      updatedAt: serverTimestamp(),
    });
    return;
  }

  const data = snap.data() as { completedLessonIds?: string[] };
  // skip if already recorded
  if (data.completedLessonIds?.includes(lessonId)) return;

  await updateDoc(ref, {
    completedLessonIds: arrayUnion(lessonId),
    updatedAt: serverTimestamp(),
  });
}
