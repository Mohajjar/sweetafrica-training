// src/lib/modules.ts
export type ModuleId = "welcome" | "fundamentals" | "professionalism";

export const moduleTitle = {
  welcome: "Welcome to Sweet Africa Global",
  fundamentals: "Fundamentals of Cleaning",
  professionalism: "Professional Cleaning Service",
} as const;

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
    {
      id: "safety-and-self-protection",
      title: "Safety and Self-Protection",
      href: "/course/fundamentals/lesson/safety-and-self-protection",
    },
    {
      id: "cleaning-systems-and-flow",
      title: "Cleaning Systems and Flow",
      href: "/course/fundamentals/lesson/cleaning-systems-and-flow",
    },
    {
      id: "understanding-dirt-and-debris",
      title: "Understanding Dirt & Debris",
      href: "/course/fundamentals/lesson/understanding-dirt-and-debris",
    },
    {
      id: "handling-different-rooms",
      title: "Handling Different Rooms",
      href: "/course/fundamentals/lesson/handling-different-rooms",
    },
    {
      id: "common-furniture-and-fixtures",
      title: "Common Furniture & Fixtures",
      href: "/course/fundamentals/lesson/common-furniture-and-fixtures",
    },
    {
      id: "final-inspection-habits",
      title: "Final Inspection Habits",
      href: "/course/fundamentals/lesson/final-inspection-habits",
    },
  ],
  professionalism: [
    {
      id: "you-are-the-service",
      title: "You are the Service",
      href: "/course/professionalism/lesson/you-are-the-service",
    },
    {
      id: "uniform-gear-and-hygiene-standards",
      title: "Uniform, Gear & Hygiene Standards",
      href: "/course/professionalism/lesson/uniform-gear-and-hygiene-standards",
    },
    {
      id: "communication-on-the-job",
      title: "Communication On the Job",
      href: "/course/professionalism/lesson/communication-on-the-job",
    },
    // Add more Professionalism lessons here
  ],
};

// ----- helpers -----
export function getLessons(moduleId: ModuleId): LessonInfo[] {
  return moduleLessons[moduleId];
}

export function getTotalLessons(moduleId: ModuleId): number {
  return moduleLessons[moduleId].length;
}

export function getLessonIndex(moduleId: ModuleId, lessonId: string): number {
  const list = moduleLessons[moduleId];
  return list.findIndex((l) => l.id === lessonId);
}

export function getNextLessonId(
  moduleId: ModuleId,
  currentLessonId: string
): string | null {
  const list = moduleLessons[moduleId];
  const idx = getLessonIndex(moduleId, currentLessonId);
  if (idx >= 0 && idx < list.length - 1) return list[idx + 1].id;
  return null;
}

export function getPrevLessonId(
  moduleId: ModuleId,
  currentLessonId: string
): string | null {
  const list = moduleLessons[moduleId];
  const idx = getLessonIndex(moduleId, currentLessonId);
  if (idx > 0) return list[idx - 1].id;
  return null;
}

export function getLessonHref(
  moduleId: ModuleId,
  lessonId: string
): string | null {
  const list = moduleLessons[moduleId];
  return list.find((l) => l.id === lessonId)?.href ?? null;
}
