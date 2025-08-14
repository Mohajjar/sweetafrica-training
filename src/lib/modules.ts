// ----- types you already have -----
export type ModuleId = "welcome" | "fundamentals";

// (You likely already have this too)
export const moduleTitle = {
  welcome: "Welcome to Sweet Africa Global",
  fundamentals: "Fundamentals of Cleaning",
} as const;

// ----- NEW: per-module lesson list -----
export type LessonInfo = { id: string; title: string; href: string };

const moduleLessons: Record<ModuleId, LessonInfo[]> = {
  welcome: [
    {
      id: "who-we-are",
      title: "Who We Are",
      href: "/course/welcome/lesson/who-we-are",
    },
    {
      id: "vision-mission-values",
      title: "Vision, Mission & Core Values",
      href: "/course/welcome/lesson/vision-mission-values",
    },
    {
      id: "expectations-communication",
      title: "Expectations & Communication",
      href: "/course/welcome/lesson/expectations-communication",
    },
  ],
  fundamentals: [
    {
      id: "defining-cleaning",
      title: "Defining Cleaning",
      href: "/course/fundamentals/lesson/defining-cleaning",
    },
    {
      id: "basic-cleaning-chemistry",
      title: "Basic Cleaning Chemistry",
      href: "/course/fundamentals/lesson/basic-cleaning-chemistry",
    },
    {
      id: "tools-and-supplies",
      title: "Tools & Supplies",
      href: "/course/fundamentals/lesson/tools-and-supplies",
    },
    // Add more Fundamentals lessons here in order as you create them
  ],
};

// ----- NEW: helpers -----
export function getLessons(moduleId: ModuleId): LessonInfo[] {
  return moduleLessons[moduleId];
}

export function getTotalLessons(moduleId: ModuleId): number {
  return moduleLessons[moduleId].length;
}

// Find the index of a lesson within a module
export function getLessonIndex(moduleId: ModuleId, lessonId: string): number {
  const list = moduleLessons[moduleId];
  return list.findIndex((l) => l.id === lessonId);
}

// Get the *next* lesson id or null if on last lesson
export function getNextLessonId(
  moduleId: ModuleId,
  currentLessonId: string
): string | null {
  const list = moduleLessons[moduleId];
  const idx = getLessonIndex(moduleId, currentLessonId);
  if (idx >= 0 && idx < list.length - 1) return list[idx + 1].id;
  return null;
}

// Get the *previous* lesson id or null if on first lesson
export function getPrevLessonId(
  moduleId: ModuleId,
  currentLessonId: string
): string | null {
  const list = moduleLessons[moduleId];
  const idx = getLessonIndex(moduleId, currentLessonId);
  if (idx > 0) return list[idx - 1].id;
  return null;
}

// Return the href for a given lesson id (or null if not found)
export function getLessonHref(
  moduleId: ModuleId,
  lessonId: string
): string | null {
  const list = moduleLessons[moduleId];
  return list.find((l) => l.id === lessonId)?.href ?? null;
}
