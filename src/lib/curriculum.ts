// src/lib/curriculum.ts
import type { ModuleId } from "@/lib/progress";

// Central curriculum registry: title + lesson counts per module
export const curriculum: Record<
  ModuleId,
  { title: string; totalLessons: number }
> = {
  welcome: {
    title: "Welcome to Sweet Africa Global",
    totalLessons: 3, // keep in sync with your Welcome module
  },
  fundamentals: {
    title: "Fundamentals of Cleaning",
    totalLessons: 1, // bump as you add more lessons in this module
  },
};

// Helpers used across Admin/Dashboard
export function getModuleTitle(m: ModuleId) {
  return curriculum[m].title;
}

export function getTotalLessons(m: ModuleId) {
  return curriculum[m].totalLessons;
}
