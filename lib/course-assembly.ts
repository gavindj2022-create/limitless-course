// CoursePlan -> ordered, variant-resolved module list, plus the plan⇄URL codec.
// Pure TS (no React) so tests and both server/client components can share it.

import { MODULES, type CourseModule } from "../content/modules.ts";
import {
  ALL_BIZ,
  ALL_GOALS,
  ALL_LEVELS,
  ALL_TRACKS,
  scoreAnswers,
  type CoursePlan,
} from "./course-quiz.ts";

function matches(mod: CourseModule, plan: CoursePlan): boolean {
  if (mod.levels && !mod.levels.includes(plan.level)) return false;
  if (mod.tracks && !mod.tracks.includes(plan.track)) return false;
  if (mod.goals && !mod.goals.includes(plan.goal)) return false;
  if (mod.biz && !mod.biz.includes(plan.biz)) return false;
  return true;
}

/**
 * Assemble the personalized course: filter modules by the plan's tags and
 * resolve variant groups (modules sharing `variantOf`) to exactly one module —
 * the one whose `tracks` matches the plan.
 */
export function assembleCourse(plan: CoursePlan): CourseModule[] {
  const chosen: CourseModule[] = [];
  const seenVariantGroups = new Set<string>();
  for (const mod of MODULES) {
    if (!matches(mod, plan)) continue;
    if (mod.variantOf) {
      if (seenVariantGroups.has(mod.variantOf)) continue;
      seenVariantGroups.add(mod.variantOf);
    }
    chosen.push(mod);
  }
  return chosen;
}

// --- plan ⇄ URL code ---------------------------------------------------------
// Compact human-readable code, e.g. "genz.daily.money.smb.hot".

export function encodePlan(plan: CoursePlan): string {
  return [plan.track, plan.level, plan.goal, plan.biz, plan.segment].join(".");
}

export function decodePlan(code: string | null | undefined): CoursePlan | null {
  if (!code) return null;
  const [track, level, goal, biz, segment] = code.split(".");
  if (
    !ALL_TRACKS.includes(track as never) ||
    !ALL_LEVELS.includes(level as never) ||
    !ALL_GOALS.includes(goal as never) ||
    !ALL_BIZ.includes(biz as never)
  ) {
    return null;
  }
  // Re-derive the display fields (and clamp segment) via the scorer so a
  // hand-edited URL can't produce an inconsistent plan.
  const plan = scoreAnswers({ track, level, goal, biz });
  if (segment === "hot" || segment === "warm" || segment === "cold") {
    return { ...plan, segment };
  }
  return plan;
}

export function totalMinutes(mods: CourseModule[]): number {
  return mods.reduce((sum, m) => sum + m.minutes, 0);
}
