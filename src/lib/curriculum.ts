// src/lib/curriculum.ts
import type { ModuleId } from "@/lib/modules";
import {
  moduleTitle,
  getTotalLessons as getTotalFromModules,
} from "@/lib/modules";

export const curriculum: Record<
  ModuleId,
  { title: string; totalLessons: number }
> = {
  welcome: {
    title: moduleTitle.welcome,
    totalLessons: getTotalFromModules("welcome"),
  },
  fundamentals: {
    title: moduleTitle.fundamentals,
    totalLessons: getTotalFromModules("fundamentals"),
  },
  professionalism: {
    title: moduleTitle.professionalism,
    totalLessons: getTotalFromModules("professionalism"),
  },
};

export function getModuleTitle(m: ModuleId) {
  return curriculum[m].title;
}

export function getTotalLessons(m: ModuleId) {
  return curriculum[m].totalLessons;
}

export type { ModuleId } from "@/lib/modules";
