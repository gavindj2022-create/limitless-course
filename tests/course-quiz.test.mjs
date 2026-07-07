import test from "node:test";
import assert from "node:assert/strict";
import {
  QUESTIONS,
  scoreAnswers,
  ALL_TRACKS,
  ALL_LEVELS,
  ALL_GOALS,
  ALL_BIZ,
} from "../lib/course-quiz.ts";
import {
  assembleCourse,
  encodePlan,
  decodePlan,
  totalMinutes,
} from "../lib/course-assembly.ts";
import { MODULES } from "../content/modules.ts";

test("question set covers the four scoring dimensions", () => {
  const ids = QUESTIONS.map((q) => q.id);
  for (const dim of ["track", "level", "goal", "biz"]) {
    assert.ok(ids.includes(dim), `missing question: ${dim}`);
  }
  for (const q of QUESTIONS) {
    assert.ok(q.options.length >= 2, `${q.id} needs options`);
  }
});

test("every track x level x goal x biz combination yields a valid course", () => {
  for (const track of ALL_TRACKS) {
    for (const level of ALL_LEVELS) {
      for (const goal of ALL_GOALS) {
        for (const biz of ALL_BIZ) {
          const plan = scoreAnswers({ track, level, goal, biz });
          const mods = assembleCourse(plan);
          const label = `${track}/${level}/${goal}/${biz}`;
          assert.ok(mods.length >= 5, `${label}: only ${mods.length} modules`);
          assert.ok(totalMinutes(mods) >= 60, `${label}: course too short`);
          // Exactly one ai-basics variant for starter/dabbler, matching the track.
          const variants = mods.filter((m) => m.variantOf === "ai-basics");
          if (level === "starter" || level === "dabbler") {
            assert.equal(variants.length, 1, `${label}: expected 1 basics variant`);
            assert.ok(variants[0].tracks.includes(track), `${label}: wrong variant`);
          } else {
            assert.equal(variants.length, 0, `${label}: experts shouldn't see basics`);
          }
          // The Higgsfield module and the capstone are for everyone.
          assert.ok(mods.some((m) => m.id === "higgsfield-media"), `${label}: no Higgsfield`);
          assert.ok(mods.some((m) => m.id === "your-ai-os"), `${label}: no capstone`);
          // Exactly one business-type module.
          const bizMods = mods.filter((m) => m.biz);
          assert.equal(bizMods.length, 1, `${label}: expected 1 biz module, got ${bizMods.length}`);
        }
      }
    }
  }
});

test("segments: smb + big budget = hot; free-tools employee = cold", () => {
  const hot = scoreAnswers({ track: "genx", level: "dabbler", goal: "money", biz: "smb", budget: "more" });
  assert.equal(hot.segment, "hot");
  const cold = scoreAnswers({ track: "genz", level: "daily", goal: "relevant", biz: "employee", budget: "0" });
  assert.equal(cold.segment, "cold");
});

test("plan codec round-trips and rejects garbage", () => {
  const plan = scoreAnswers({ track: "boomer", level: "starter", goal: "time", biz: "solo", budget: "50" });
  const decoded = decodePlan(encodePlan(plan));
  assert.deepEqual(decoded, plan);
  assert.equal(decodePlan("not.a.real.plan.x"), null);
  assert.equal(decodePlan(""), null);
  assert.equal(decodePlan(null), null);
  // Tampered segment gets clamped to a valid value via re-derivation.
  const tampered = decodePlan("boomer.starter.time.solo.banana");
  assert.ok(tampered && ["hot", "warm", "cold"].includes(tampered.segment));
});

test("module catalog integrity", () => {
  const ids = new Set();
  for (const m of MODULES) {
    assert.ok(!ids.has(m.id), `duplicate module id ${m.id}`);
    ids.add(m.id);
    assert.ok(m.sections.length >= 2, `${m.id}: needs sections`);
    assert.ok(m.exercise.length > 20, `${m.id}: needs a real exercise`);
    assert.ok(m.minutes >= 5, `${m.id}: minutes`);
    for (const s of m.sections) {
      assert.ok(s.body.length > 80, `${m.id}/${s.heading}: section too thin`);
    }
  }
  // Branding rule: the old agency name must never appear.
  const text = JSON.stringify(MODULES);
  assert.ok(!/DAWGS/i.test(text), "old branding found in course content");
});
