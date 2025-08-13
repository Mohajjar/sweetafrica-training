// src/lib/curriculum.ts
export type ModuleId = "welcome";

export const curriculum: Record<
  ModuleId,
  { title: string; totalLessons: number }
> = {
  welcome: { title: "Section 1 — Welcome", totalLessons: 3 },
};

export function getTotalLessons(moduleId: ModuleId): number {
  return curriculum[moduleId].totalLessons;
}

export function getModuleTitle(moduleId: ModuleId): string {
  return curriculum[moduleId].title;
}
