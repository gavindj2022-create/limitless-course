# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Limitless Course

Public quiz-to-personalized-course site for **Limitless** (Gav's AI agency — never "DAWGS AGI"). A visitor takes the AI-Setup Quiz (generation × skill × goal × business type) and gets a personalized "perfect AI setup" course assembled from tagged modules. Free course → Limitless service upsells (see `MONETIZATION.md`).

- Conventions cloned from `C:/Users/ninja/limitless-website` (same Next 16 App Router patterns, dark aesthetic). No Prisma/auth/Stripe at launch — keep it static-friendly; only `/api/course-lead` needs a server function.
- Deploy target: Cloudflare Pages. Lead route degrades gracefully with no `RESEND_API_KEY`.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build (must stay clean)
npm test           # node:test suites (quiz scoring + assembly)
```

## Layout

- `lib/course-quiz.ts` — pure quiz definitions + scoring → `CoursePlan` (no React imports; shared by API, components, tests)
- `lib/course-assembly.ts` — `CoursePlan` → ordered, variant-resolved module list; plan⇄URL codec
- `content/modules.ts` — every course module, tagged with tracks/levels/goals/biz; generation variants share a `variantOf` group
- `app/quiz` + `components/CourseQuiz.tsx` — the quiz flow (email-gates the result)
- `app/course` — renders the personalized course from the `?plan=` code
