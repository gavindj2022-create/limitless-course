# Limitless Course — Monetization Ladder

The course is the top of the Limitless funnel. Each rung is only built once the rung below it is producing. Free ships first; services are where the real money is.

## Rung 1 — Free (LIVE with launch)
- Quiz + personalized course, email-gated results.
- Every lead lands with a **segment** (`hot` / `warm` / `cold`) computed in `lib/course-quiz.ts` from goal × business type × budget.
- Per-segment welcome emails in `lib/email-templates.ts`: hot → book-a-call push; warm → proof drip; cold → value tips.
- Contextual upsells inside modules (Higgsfield → media pipelines; SMB → Bella).
- **Metric to watch:** quiz completion rate and hot-lead volume. If email-gate drop-off exceeds ~60%, make the gate skippable.

## Rung 2 — Templates ($29–$99) [build when: steady lead flow]
Digital products sold from course pages (micro-sprint model — bundles outsell mega-courses):
- "AI OS Starter Vault" — Obsidian vault template with the five folders + starter notes ($29)
- "The CLAUDE.md Pack" — battle-tested CLAUDE.md + skill templates ($49)
- "Prompt Playbook" — the Loop, role-stacking, chaining, with worked examples ($29)
- Bundle all three: $79.
Implementation: Stripe checkout (clone patterns from `limitless-website/lib/stripe.ts`), delivery via download link email.

## Rung 3 — Premium (~$499) [build when: rung 2 proves willingness to pay]
BASB model — methodology + template + community:
- Full expanded course (video walkthroughs per module)
- `@Course Pro` Discord role: private channel, monthly live build call with Gav
- All rung-2 templates included
- The quiz's hot/warm segments get different premium pitches (ROI framing vs. mastery framing).

## Rung 4 — Services (the real revenue, LIVE already)
- Hot leads route to the Bella / websites / automations pipeline (`#leads` in Discord via the notify email).
- The course is deliberately honest ("you can build this yourself") — it builds the trust that makes the $5k–15k project sale.
- Sales team handbook: `vault Knowledge/Handbooks/Sales Handbook/` — module 2 (offer catalog) is the pricing source of truth.

## Discord roles
- `@Course Member` (free) — 🎓 course category: #course-community, #course-help. Invite link on course completion page.
- `@Course Pro` (future, rung 3) — adds the private pro channel.

## Wiring status
- [x] Segment computation + per-segment emails (needs `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` env vars in the host)
- [x] Module-level upsell CTAs (book links point to limitless-website /book; update to golimitless.com when it goes live)
- [x] 🎓 course Discord section + @Course Member role
- [ ] Stripe + template products (rung 2)
- [ ] Premium tier (rung 3)
