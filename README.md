# Limitless Course

Quiz → personalized AI course funnel for [Limitless](https://github.com/gavindj2022-create/limitless-website).

Take the 6-question AI-Setup Quiz (generation × skill × goal × business type) and get a personalized course assembled on the spot — from "what is AI" in plain English to agents, skills, and AI media with Higgsfield. Free course, service upsells (see `MONETIZATION.md`).

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # node:test — quiz scoring, course assembly, catalog integrity
npm run build    # production build
```

Architecture and conventions: see `AGENTS.md`. Deploy target: Cloudflare Pages (env vars: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`).
