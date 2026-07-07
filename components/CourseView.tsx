"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { assembleCourse, decodePlan, totalMinutes } from "@/lib/course-assembly";

const TRACK_LABEL: Record<string, string> = {
  genz: "Gen Z track",
  millennial: "Millennial track",
  genx: "Gen X track",
  boomer: "Classic track",
};

const LEVEL_LABEL: Record<string, string> = {
  starter: "starting fresh",
  dabbler: "building on the basics",
  daily: "leveling up daily use",
  power: "expert path",
};

function CourseInner() {
  const params = useSearchParams();
  const plan = decodePlan(params.get("plan"));

  if (!plan) {
    return (
      <div className="course-head">
        <span className="eyebrow">Your course</span>
        <h1>Let&apos;s build your course first.</h1>
        <p className="lead">
          This page shows a personalized course, and we don&apos;t have your
          answers yet. It takes two minutes.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link href="/quiz" className="btn">
            Take the quiz →
          </Link>
        </p>
      </div>
    );
  }

  const mods = assembleCourse(plan);
  const mins = totalMinutes(mods);

  return (
    <>
      <div className="course-head">
        <span className="eyebrow">Your personalized course</span>
        <h1>{plan.title}</h1>
        <p className="lead">{plan.pace}</p>
        <div className="course-meta">
          <span className="chip">
            <b>{TRACK_LABEL[plan.track]}</b>
          </span>
          <span className="chip">{LEVEL_LABEL[plan.level]}</span>
          <span className="chip">{mods.length} modules</span>
          <span className="chip">~{Math.round(mins / 60 * 10) / 10} hours total</span>
        </div>
        <p className="lead" style={{ fontSize: 14.5 }}>
          Work top to bottom. Every module ends with something to actually do —
          the doing is the course. Bookmark this page; your plan is saved in
          the link.
        </p>
      </div>

      {mods.map((m, i) => (
        <details className="module" key={m.id} open={i === 0}>
          <summary>
            <span className="m-emoji">{m.emoji}</span>
            <span className="m-title">
              {i + 1}. {m.title}
            </span>
            <span className="m-mins">{m.minutes} min</span>
          </summary>
          <div className="m-body">
            <p className="m-summary">{m.summary}</p>
            {m.sections.map((s) => (
              <div className="m-section" key={s.heading}>
                <h4>{s.heading}</h4>
                <p>{s.body}</p>
              </div>
            ))}
            <div className="m-exercise">
              <b>Do this now:</b> {m.exercise}
            </div>
            {m.upsell && (
              <div className="m-upsell">
                <span>{m.upsell.text}</span>
                <a href={m.upsell.href} target="_blank" rel="noreferrer">
                  {m.upsell.cta} →
                </a>
              </div>
            )}
          </div>
        </details>
      ))}

      <div className="course-cta">
        <h2>
          {plan.segment === "hot"
            ? "You could also just have us build it."
            : "Keep this link — your course grows."}
        </h2>
        <p>
          {plan.segment === "hot"
            ? "Everything in this course is a system Limitless deploys for businesses like yours — receptionists, websites, automations, AI media. One call shows you exactly what that looks like."
            : "New modules land regularly, and your link always shows your current best path. When you're ready for done-for-you systems, we're here."}
        </p>
        <a
          className="btn"
          href="https://limitless-website.vercel.app/book"
          target="_blank"
          rel="noreferrer"
        >
          {plan.segment === "hot" ? "Book a build call →" : "See what we build →"}
        </a>
      </div>

      <footer className="site">
        <span>© {new Date().getFullYear()} Limitless</span>
        <Link href="/quiz">Retake the quiz</Link>
      </footer>
    </>
  );
}

export default function CourseView() {
  return (
    <Suspense fallback={<p className="lead">Loading your course…</p>}>
      <CourseInner />
    </Suspense>
  );
}
