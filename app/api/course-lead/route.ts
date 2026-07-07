import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { decodePlan } from "@/lib/course-assembly";
import { segmentEmail } from "@/lib/email-templates";

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot: must be empty
  answers: z.record(z.string(), z.string()).optional(),
  plan: z.string().max(80),
});

// Naive in-memory rate limit — good enough for launch; the host layer adds more.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let parsed;
  try {
    parsed = LeadSchema.safeParse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  const lead = parsed.data;
  if (lead.website) {
    // Honeypot tripped: pretend success, save nothing.
    return NextResponse.json({ ok: true });
  }

  const plan = decodePlan(lead.plan);
  const segment = plan?.segment ?? "cold";

  // Graceful degrade: without RESEND_API_KEY we log and succeed — the visitor
  // still gets their course; only the follow-up email is skipped.
  const key = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL;
  if (key) {
    try {
      const resend = new Resend(key);
      const from = process.env.LEAD_FROM_EMAIL || "Limitless <onboarding@resend.dev>";
      const welcome = segmentEmail(segment, lead.name, lead.plan);
      await resend.emails.send({
        from,
        to: lead.email,
        subject: welcome.subject,
        html: welcome.html,
      });
      if (notifyTo) {
        await resend.emails.send({
          from,
          to: notifyTo,
          subject: `[course-lead:${segment}] ${lead.name} <${lead.email}>`,
          html: `<p>New course lead.</p><ul><li>Name: ${lead.name}</li><li>Email: ${lead.email}</li><li>Segment: <b>${segment}</b></li><li>Plan: ${lead.plan}</li><li>Answers: <code>${JSON.stringify(lead.answers ?? {})}</code></li></ul>`,
        });
      }
    } catch (err) {
      console.error("course-lead email failed:", err);
      // Still succeed — never block the course on email delivery.
    }
  } else {
    console.log(`course-lead (no RESEND_API_KEY): ${lead.email} segment=${segment} plan=${lead.plan}`);
  }

  return NextResponse.json({ ok: true, segment });
}
