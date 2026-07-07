// Per-segment welcome emails. Hot leads get a book-a-call push, warm leads get
// proof, cold leads get pure value. Plain-HTML, inline styles for email clients.

import type { Segment } from "./course-quiz.ts";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://course.golimitless.com";
const BOOK = "https://limitless-website.vercel.app/book";

function shell(inner: string): string {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a;line-height:1.6">${inner}<p style="margin-top:32px;color:#888;font-size:12px">Limitless — AI systems, proven on our own business first.</p></div>`;
}

export function segmentEmail(
  segment: Segment,
  name: string,
  planCode: string
): { subject: string; html: string } {
  const courseUrl = `${SITE}/course?plan=${encodeURIComponent(planCode)}`;
  const first = name.split(" ")[0] || "there";

  if (segment === "hot") {
    return {
      subject: `${first}, your AI course — and a shortcut`,
      html: shell(
        `<h2>Your course is live.</h2>
         <p>Hey ${first} — your personalized AI setup course is saved here (bookmark it):</p>
         <p><a href="${courseUrl}" style="font-weight:700">Open my course →</a></p>
         <p>One more thing, because your answers say you run a business and you're serious about ROI: <b>everything in that course is a system we deploy done-for-you</b> — AI receptionists that answer every call, websites that convert, follow-up automation, AI media.</p>
         <p>If your hours are worth more than the build time, a 20-minute call shows you exactly what we'd build and what it costs. No retainer to find out.</p>
         <p><a href="${BOOK}" style="display:inline-block;background:#e8b44a;color:#16130a;font-weight:700;padding:12px 22px;border-radius:10px;text-decoration:none">Book a build call</a></p>`
      ),
    };
  }

  if (segment === "warm") {
    return {
      subject: `${first}, your AI course is saved`,
      html: shell(
        `<h2>Your course is live.</h2>
         <p>Hey ${first} — your personalized AI setup course is here (the link keeps your plan):</p>
         <p><a href="${courseUrl}" style="font-weight:700">Open my course →</a></p>
         <p>Start with module 1 today — it's the shortest one and it sets up everything else. Over the next days we'll send a few real examples of these systems running in the wild: an AI receptionist saving missed calls, a video pipeline selling houses, a one-person business running like a team.</p>
         <p>Build it yourself with the course, or <a href="${BOOK}">have us build it</a> when you're ready. Both are wins.</p>`
      ),
    };
  }

  return {
    subject: `${first}, your AI course (start with module 1)`,
    html: shell(
      `<h2>Your course is live.</h2>
       <p>Hey ${first} — here's your personalized AI setup course. The link saves your plan, so bookmark it:</p>
       <p><a href="${courseUrl}" style="font-weight:700">Open my course →</a></p>
       <p>One honest tip: don't binge it. Do module 1 today (it's ~15 minutes, and it ends with something you'll actually use), then one module whenever you have a coffee's worth of time. The doing is the course.</p>
       <p>We'll send a short practical AI tip every so often — the kind you can use the same day. Unsubscribe anytime, no hard feelings.</p>`
    ),
  };
}
