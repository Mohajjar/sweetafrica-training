// src/lib/curriculum.ts

// 1) The source of truth for available modules
export type ModuleId = "welcome" | "fundamentals";

// 2) Central curriculum registry
export const curriculum: Record<
  ModuleId,
  { title: string; totalLessons: number }
> = {
  welcome: {
    title: "Welcome to Sweet Africa Global",
    totalLessons: 3,
  },
  fundamentals: {
    title: "Fundamentals of Cleaning",
    totalLessons: 2,
  },
};

// 3) Helpers used across Admin/Dashboard
export function getModuleTitle(m: ModuleId) {
  return curriculum[m].title;
}

export function getTotalLessons(m: ModuleId) {
  return curriculum[m].totalLessons;
}
