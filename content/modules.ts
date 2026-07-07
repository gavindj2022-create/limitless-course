// The course module catalog. Every module is tagged; lib/course-assembly.ts
// filters by a visitor's CoursePlan and resolves variant groups (variantOf) to
// the one matching their generation track. Undefined tag = applies to all.
//
// Body text is plain paragraphs (no markdown rendering needed). Keep the voice
// of each generation variant distinct — that segmentation IS the product.

import type { Biz, Goal, Level, Track } from "../lib/course-quiz.ts";

export interface ModuleSection {
  heading: string;
  body: string;
}

export interface CourseModule {
  id: string;
  title: string;
  emoji: string;
  minutes: number;
  levels?: Level[];
  tracks?: Track[];
  goals?: Goal[];
  biz?: Biz[];
  /** Modules sharing this key are generation variants; only one is picked. */
  variantOf?: string;
  summary: string;
  sections: ModuleSection[];
  exercise: string;
  upsell?: { text: string; cta: string; href: string };
}

const BOOK_URL = "https://limitless-website.vercel.app/book";

export const MODULES: CourseModule[] = [
  // --- 1. What AI actually is — four written variants, not one repaced module.
  {
    id: "ai-basics-boomer",
    variantOf: "ai-basics",
    tracks: ["boomer"],
    levels: ["starter", "dabbler"],
    title: "What AI Actually Is (In Plain English)",
    emoji: "💡",
    minutes: 20,
    summary:
      "No jargon, no hype. What these tools really do, what they can't, and why your privacy is safer than you think when you follow three simple rules.",
    sections: [
      {
        heading: "Think of it like a very well-read assistant",
        body:
          "An AI chat tool is like an assistant who has read almost everything ever published and types instantly. It doesn't 'know' you, it can't touch your bank account, and it only sees what you type into it. You ask in normal sentences; it answers in normal sentences. That's the whole trick.",
      },
      {
        heading: "It's a thermostat, not a robot takeover",
        body:
          "Your thermostat learns when you like the house warm. AI tools work the same way: helpful, narrow, and under your control. They don't act on their own — every single thing happens because you asked for it. You can close the window and nothing continues without you.",
      },
      {
        heading: "The three privacy rules",
        body:
          "One: never type passwords, account numbers, or your SSN into a chat. Two: use your real name sparingly — the tool doesn't need it. Three: if a company you trust (your bank, your doctor) offers its own AI feature, that's held to the same privacy standards as the rest of their service. Follow those three and you're safer than most people on Facebook.",
      },
      {
        heading: "What's actually in it for you",
        body:
          "People your age are quietly the biggest winners here: letters and emails drafted in seconds, medical paperwork explained in plain English, travel planned, photos organized, a question answered without wading through ad-covered websites. The time savings are real — most beginners report saving five or more hours a week once it becomes a habit.",
      },
    ],
    exercise:
      "Open claude.ai, make a free account, and type: 'Explain how AI chat tools protect my privacy, in plain English, as if I've never used one.' Read the answer — you just used AI to understand AI.",
  },
  {
    id: "ai-basics-genx",
    variantOf: "ai-basics",
    tracks: ["genx"],
    levels: ["starter", "dabbler"],
    title: "What AI Actually Is (And Why It Won't Take Your Job — Unless You Ignore It)",
    emoji: "💡",
    minutes: 15,
    summary:
      "The straight story: what AI does, the ROI math, and the honest answer on job security.",
    sections: [
      {
        heading: "The 60-second version",
        body:
          "AI chat tools predict useful text: answers, drafts, summaries, plans, code. That sounds mundane until you realize half your workday is producing exactly that. You describe what you need in plain English; it produces a first draft in seconds that would've taken you 40 minutes.",
      },
      {
        heading: "The honest job-security answer",
        body:
          "AI won't replace you. A person using AI will replace a person who isn't — same as email, same as Excel. The good news: you've survived this movie twice already. The people who learned Excel in the 90s didn't lose their jobs to it; they ran the departments. That's the seat this course puts you in.",
      },
      {
        heading: "The ROI math",
        body:
          "Say AI saves you 45 minutes a day — a very conservative number for email, reports, and research. That's roughly 180 hours a year. At $50/hour, you just found $9,000 of time for a tool that costs $0–20 a month. There is no other investment in your life with that ratio.",
      },
      {
        heading: "One tool, learned properly",
        body:
          "Skip the '37 AI tools you must try' videos. Pick one assistant (we'll use Claude), learn it deeply over two weeks, and bolt on others only when a real need shows up. Depth beats novelty every time.",
      },
    ],
    exercise:
      "Take the most annoying email you need to write this week. Tell Claude: 'Write this email for me. Context: [two sentences]. Tone: professional but warm.' Compare it to what you'd have written. Track the minutes saved.",
  },
  {
    id: "ai-basics-millennial",
    variantOf: "ai-basics",
    tracks: ["millennial"],
    levels: ["starter", "dabbler"],
    title: "What AI Actually Is (Past the Hype and the Doom)",
    emoji: "💡",
    minutes: 15,
    summary:
      "You've seen the takes. Here's the practical middle: what these tools actually do, and the workflow mindset that separates users from power users.",
    sections: [
      {
        heading: "It's a collaborator, not a search engine",
        body:
          "The mental shift that unlocks everything: Google finds pages; AI does work. You don't ask it 'best budgeting methods' — you say 'here's my income, my fixed costs, and my goal; build me a budget and tell me what to cut first.' Context in, finished work out.",
      },
      {
        heading: "Iteration is the skill",
        body:
          "The first answer is a first draft, not a verdict. 'Make it shorter.' 'More casual.' 'Now as a table.' 'What did you miss?' People who treat AI like a vending machine get vending-machine results; people who treat it like a sharp intern who needs feedback get senior-level output.",
      },
      {
        heading: "Where it fits your actual life",
        body:
          "Meal plans from what's in the fridge, a side-hustle landing page over a weekend, negotiating scripts before the salary conversation, trip itineraries that don't come from a listicle, career-pivot analysis with your real resume. This course's later modules turn each of those into a system, not a one-off.",
      },
      {
        heading: "Ethics and accuracy, in one paragraph",
        body:
          "Yes, AI can be confidently wrong — verify anything with consequences (money, health, legal). Yes, training data has bias — you'll notice it and prompt around it. Neither is a reason to sit out; both are reasons to be the person in the room who knows how to use it well.",
      },
    ],
    exercise:
      "Pick a real decision you're sitting on. Give Claude the full context in 5+ sentences and ask it to argue both sides, then recommend. Push back twice. Notice how the quality climbs with each round.",
  },
  {
    id: "ai-basics-genz",
    variantOf: "ai-basics",
    tracks: ["genz"],
    levels: ["starter", "dabbler"],
    title: "How AI Actually Works (So You Can Break It Properly)",
    emoji: "💡",
    minutes: 10,
    summary:
      "You've used ChatGPT. Cool. Here's what's happening under the hood, where the bodies are buried, and why knowing that makes you dangerous.",
    sections: [
      {
        heading: "Under the hood, fast",
        body:
          "LLMs predict the next token based on patterns in a mountain of training data. That's it. No secret consciousness, no hidden database of facts — which is exactly why it can write a flawless essay and then invent a court case that doesn't exist. Once you get that it's pattern-completion, its failures stop being mysterious and start being exploitable.",
      },
      {
        heading: "Transparency check",
        body:
          "Know what the tool logs, what it trains on, and what it leaks. Free tiers often train on your chats (check the settings — most let you opt out). Anything truly private stays out of any chat, period. You already have this instinct from growing up online; apply it here.",
      },
      {
        heading: "The gap nobody talks about",
        body:
          "Most people your age use AI like autocomplete for homework. The gap between that and building with it — agents, automations, tools that run while you sleep — is about three weeks of focused reps. Almost nobody crosses it. That's the whole opportunity: this course is the bridge.",
      },
      {
        heading: "Experiment > tutorial",
        body:
          "You learn this by breaking it: give it contradictory instructions, make it critique its own answer, chain outputs into inputs, find the edges. Every module ahead ends with something to actually run, not something to read about.",
      },
    ],
    exercise:
      "Adversarial round: ask Claude something in your area of expertise, then interrogate the answer until you find an error or a shallow spot. Ask it to correct itself with sources. You now know its edges better than 95% of users.",
  },

  // --- 2-4. Prompting arc ----------------------------------------------------
  {
    id: "first-conversation",
    levels: ["starter"],
    title: "Your First Real AI Conversation",
    emoji: "💬",
    minutes: 15,
    summary:
      "Set up your account, learn the interface in five minutes, and have a conversation that actually produces something useful.",
    sections: [
      {
        heading: "Setup, once",
        body:
          "Create a free account at claude.ai. That's the only tool you need for the whole foundation of this course. Bookmark it. On your phone, install the app so it's one tap away — habit lives where friction dies.",
      },
      {
        heading: "The anatomy of a good ask",
        body:
          "Every strong request has three parts: what you want ('write a birthday message'), the context ('for my sister, she's turning 40, we joke about her coffee addiction'), and the shape ('short, funny, not cheesy'). Miss the context and you get generic; miss the shape and you get an essay.",
      },
      {
        heading: "Keep the conversation going",
        body:
          "The magic is in the follow-up. 'Warmer.' 'Add a line about the marathon.' 'Give me three options.' Each message builds on everything before it — the AI remembers the whole conversation, so you never re-explain.",
      },
    ],
    exercise:
      "Have one 10-message conversation that ends with something you actually use today — a message you send, a plan you follow, a decision you make. Don't stop at the first answer.",
  },
  {
    id: "prompting-101",
    levels: ["starter", "dabbler"],
    title: "Prompting 101: Context Is Everything",
    emoji: "🎯",
    minutes: 20,
    summary:
      "The five-ingredient prompt formula that fixes 90% of bad AI answers, plus the mistakes everyone makes for their first month.",
    sections: [
      {
        heading: "The five ingredients",
        body:
          "Role ('act as an experienced accountant'), task ('review this budget'), context ('freelancer, irregular income, saving for a house'), format ('a table with red flags highlighted'), and constraints ('under 300 words, no jargon'). You rarely need all five — but when an answer disappoints, one of these was missing.",
      },
      {
        heading: "Show, don't describe",
        body:
          "The single most underused move: paste an example. 'Write it like this: [paste something in the style you want].' AI is a pattern machine — one example beats three paragraphs of description every time.",
      },
      {
        heading: "The mistakes month",
        body:
          "Everyone's first month: asking one-line questions and getting one-size answers, accepting the first draft, starting new chats and losing context, and asking the AI to do the whole job instead of the heavy lift. You now get to skip that month.",
      },
    ],
    exercise:
      "Take one task from your real week. Write the lazy one-line prompt, then the five-ingredient version. Run both. The gap you see is the skill you just learned.",
  },
  {
    id: "prompting-pro",
    levels: ["dabbler", "daily", "power"],
    title: "Prompting Like a Pro: Loops, Roles, and Self-Critique",
    emoji: "🔁",
    minutes: 25,
    summary:
      "The techniques that separate power users: the loop method, role stacking, making the AI critique itself, and chaining outputs into inputs.",
    sections: [
      {
        heading: "The Loop",
        body:
          "Draft → critique → revise, all inside one conversation: 'Draft X.' Then: 'Now act as a skeptical editor — list this draft's three biggest weaknesses.' Then: 'Rewrite fixing all three.' Two extra messages, and quality jumps a full grade. This is the single highest-ROI habit in prompting.",
      },
      {
        heading: "Role stacking",
        body:
          "Different roles surface different failures. Run your plan past 'a ruthless CFO', then 'your most demanding customer', then 'a lawyer looking for risk'. Three lenses, three minutes, and you've stress-tested a decision most people would take to three meetings.",
      },
      {
        heading: "Chaining",
        body:
          "Big work = chained small prompts. Research → outline → draft section by section → edit pass → format pass. Each step's output is the next step's input. A 20-page proposal becomes seven small conversations instead of one impossible ask.",
      },
      {
        heading: "Know when you've hit the ceiling",
        body:
          "If you're re-explaining the same context every session, you've outgrown chat and you're ready for a second brain (that's a later module). If you're running the same chain weekly, you're ready for automation. The ceiling of prompting is the floor of systems.",
      },
    ],
    exercise:
      "Run the full Loop on a real piece of work: draft, three-weakness critique, rewrite. Then hand the result to one stacked role of your choice for a final pass.",
  },

  // --- 5-8. Systems arc ------------------------------------------------------
  {
    id: "ai-daily-work",
    levels: ["starter", "dabbler", "daily"],
    title: "AI in Your Daily Work: The First 5 Hours a Week",
    emoji: "⚡",
    minutes: 20,
    summary:
      "The seven daily workflows with the fastest payback — email, summaries, planning, research, and decisions — and how to make them automatic habits.",
    sections: [
      {
        heading: "The big seven",
        body:
          "Email drafting and replies. Summarizing anything long (reports, threads, articles — paste and ask for the five points that matter to you). Daily planning ('here's my task list and calendar; build my day'). Research with sources. Meeting prep and follow-ups. First drafts of everything. Decision support with real context. Each is a two-minute habit that replaces a twenty-minute chore.",
      },
      {
        heading: "The habit trigger",
        body:
          "The skill isn't prompting — it's remembering AI exists at the moment of friction. The trigger: any time you sigh before starting a task, that's the cue. Sigh → ask AI first. Within two weeks it's reflexive, and that reflex is worth more than any advanced technique.",
      },
      {
        heading: "Your personal baseline",
        body:
          "Tell the AI about your work once, at the start of a chat you keep reusing: role, tools, communication style, current projects. Every answer downstream gets sharper. (When this gets tedious, the Second Brain module solves it permanently.)",
      },
    ],
    exercise:
      "Tomorrow morning, before opening email: paste your task list into Claude and ask it to plan your day with time blocks and one thing to drop. Follow the plan. Repeat for five days.",
  },
  {
    id: "second-brain",
    levels: ["dabbler", "daily", "power"],
    title: "Build a Second Brain: Your AI's Permanent Memory",
    emoji: "🧠",
    minutes: 35,
    summary:
      "Stop re-explaining yourself. A simple folder-based knowledge vault (we use Obsidian) that your AI reads, so every answer starts from full context.",
    sections: [
      {
        heading: "The problem this kills",
        body:
          "Every chat starts from zero. Your projects, preferences, clients, and history — gone each session. A second brain is a folder of plain-text notes that becomes your AI's permanent memory: capture once, use in every conversation forever.",
      },
      {
        heading: "The 30-minute setup",
        body:
          "Install Obsidian (free). Create a vault with five folders: Inbox (everything lands here first), Projects, People, Knowledge, and Daily Notes. One rule keeps it alive: when in doubt, dump it in Inbox — a messy vault you use beats a perfect vault you abandon. This is exactly how Limitless's own vault started, and it now runs an entire business.",
      },
      {
        heading: "Connect it to your AI",
        body:
          "The simple way: paste relevant notes into a chat when they matter. The power way: Claude Code (next module) reads your vault directly — 'check my notes on the Henderson project and draft the follow-up' becomes a real command. The vault turns AI from a clever stranger into a partner with your full history.",
      },
      {
        heading: "The compounding effect",
        body:
          "Week one it saves you re-explaining. Month one it catches things you forgot. Year one it's an asset: every meeting, decision, idea, and lesson, searchable and AI-readable. Knowledge compounds exactly like money — but only if you deposit it somewhere.",
      },
    ],
    exercise:
      "Install Obsidian, create the five folders, and write your first three notes: one project you're working on, one person you deal with often, one thing you learned this week. Paste all three into Claude and ask a question that needs them.",
  },
  {
    id: "claude-code-intro",
    levels: ["daily", "power"],
    title: "Claude Code: An AI That Does Instead of Says",
    emoji: "⌨️",
    minutes: 30,
    summary:
      "Chat answers questions; Claude Code takes actions — reads files, writes documents, runs commands, manages projects. This is the door to real automation.",
    sections: [
      {
        heading: "What changes",
        body:
          "Claude Code runs on your computer with your permission. 'Organize my downloads folder.' 'Read these five reports and build a comparison sheet.' 'Draft blog posts from every note in my ideas folder.' You're no longer copy-pasting between a chat window and your life — the AI works where the work is.",
      },
      {
        heading: "Setup and the trust dial",
        body:
          "Install it (claude.com/claude-code, one installer), open a terminal in any folder, type 'claude'. It asks permission before acting — start conservative, expand as it earns trust. Give it a CLAUDE.md file in the folder — a short note explaining what's here and your rules — and its answers snap to your context automatically.",
      },
      {
        heading: "Paired with your second brain",
        body:
          "Point Claude Code at your Obsidian vault and the two systems fuse: it reads your notes for context, writes new notes as it works, and maintains the vault as a side effect of doing your tasks. This exact combination — vault + Claude Code — is the architecture the entire Limitless system is built on.",
      },
    ],
    exercise:
      "Install Claude Code, open it in your vault folder, and ask: 'Read my notes and tell me what I seem to be working on, then suggest one note I should write.' Let it write the note.",
  },
  {
    id: "agents-automation",
    levels: ["daily", "power"],
    title: "Agents & Automation: Work That Runs While You Sleep",
    emoji: "🤖",
    minutes: 30,
    summary:
      "From 'AI helps when I ask' to 'AI handles it on schedule': recurring jobs, watchers, and your first autonomous agent — with the safety rails that make it trustworthy.",
    sections: [
      {
        heading: "The automation ladder",
        body:
          "Rung one: a saved prompt you reuse (a 'workflow'). Rung two: a scheduled job — the same task, every morning, without you. Rung three: a watcher — 'when a new file lands in this folder, process it'. Rung four: an agent — a standing AI worker with a role, memory, and a beat to cover. Most people never climb past rung one; each rung roughly doubles the payoff.",
      },
      {
        heading: "Your first scheduled job",
        body:
          "The classic starter: a morning brief. A scheduled task runs Claude Code at 8am — read the vault, check the calendar, summarize what matters, save it to a note (or send it to your phone). Ten minutes to set up; it then greets you with a briefing every day forever. Real example: the Limitless system posts a daily brief, project status, and market summary to Discord every morning on exactly this pattern.",
      },
      {
        heading: "The safety rails",
        body:
          "Rules that make automation trustworthy: agents propose, you approve, for anything destructive or public-facing. Archive, never delete. Everything logs where you can read it. Start with a two-week 'training period' of reviewing every action, then loosen. Trust is granted in layers, exactly like a human hire.",
      },
      {
        heading: "Agents as a team",
        body:
          "Once one agent works, the pattern repeats: one watches email, one watches finances, one preps content, one organizes files. Each is small and boring alone — together they're a staff. The Limitless fleet (Olivia, ICARUS, the Discord OS, the Backbone organizer) is nothing more than this pattern, compounded for a year.",
      },
    ],
    exercise:
      "Build the morning brief: write the prompt, run it manually for three days, then schedule it (Task Scheduler on Windows, cron on Mac). You now employ software.",
  },
  {
    id: "skills-workflows",
    levels: ["power"],
    title: "Skills & Meta-Systems: Teaching Your AI Your Playbook",
    emoji: "🧬",
    minutes: 30,
    summary:
      "Expert tier: package your best workflows as reusable skills, give your AI an operating protocol, and build the feedback loop that makes the whole system improve itself.",
    sections: [
      {
        heading: "Workflows become skills",
        body:
          "Any prompt-chain you run twice deserves a name and a file. In Claude Code, a 'skill' is a markdown file describing when it applies and the steps to follow — from then on, one command runs your whole playbook. Sales-call prep, weekly review, content pipeline: each becomes a single word.",
      },
      {
        heading: "Give your AI an operating protocol",
        body:
          "The biggest expert unlock is a written protocol for how your AI works: gather context before acting, verify before claiming done, report outcome-first, save what it learned. The Limitless system encodes this as the 'Fable Protocol' — a skill loaded at the start of every serious session. Your AI is only as disciplined as the instructions it starts with.",
      },
      {
        heading: "The self-improving loop",
        body:
          "Close the loop: when something goes wrong, the fix becomes a line in the protocol or a note in memory. When something works, it becomes a skill. Systems that capture their own lessons compound; systems that don't, plateau. This is the difference between using AI for a year and having one year of experience twelve times.",
      },
    ],
    exercise:
      "Write your first skill file: pick your most repeated workflow, document it as steps in a markdown file with a 'when to use this' header, and invoke it in Claude Code. Then write v1 of your own operating protocol — five rules.",
  },

  // --- 9. Higgsfield / AI media (required module) ----------------------------
  {
    id: "higgsfield-media",
    title: "AI Media That Sells: Images & Video with Higgsfield",
    emoji: "🎬",
    minutes: 25,
    summary:
      "Professional images and video without a camera crew: what Higgsfield does, the prompt-to-publish pipeline, and the exact playbook used to sell real properties with AI video.",
    sections: [
      {
        heading: "What Higgsfield is",
        body:
          "Higgsfield generates cinematic images and video from text prompts and reference photos — camera moves, lighting, motion control. Where chat AI produces words, this produces the visual content that actually stops a scroll. It's credit-based: you buy generation credits and spend them per render, so every experiment has a known cost.",
      },
      {
        heading: "The prompt-to-publish pipeline",
        body:
          "The reliable workflow: write the creative brief with your chat AI first (scene list, mood, camera directions), generate stills to lock the look, animate the winners into clips, then cut clips into a vertical edit for social. Brief → stills → motion → edit. Skipping the brief step is why most people's AI video looks random.",
      },
      {
        heading: "A real case: selling houses with AI video",
        body:
          "The Limitless system runs an Airbnb studio on exactly this stack: property photos go in, Higgsfield generates cinematic walkthrough shots, and the clips become listing videos and social ads — a pipeline that used to cost a videographer day-rate now runs per-property on credits. The same pattern works for any business: your product, your space, your before-and-afters.",
      },
      {
        heading: "Where it pays first",
        body:
          "Fastest ROI spots: listing and product videos, social ads you can A/B test cheaply (generate five hooks, boost the winner), and brand imagery that would otherwise mean a photoshoot. Rule of thumb: if you currently pay per-image or per-video, AI media pays for itself on the first project.",
      },
    ],
    exercise:
      "Write a 6-shot creative brief for a 20-second video about your business (use your chat AI and the Loop from Prompting Pro). If you have Higgsfield credits, generate the first two stills; if not, the brief itself is ready for the day you do.",
    upsell: {
      text: "Want this done for you? Limitless builds AI media pipelines — we've shipped property videos, social ads, and full content studios.",
      cta: "Get an AI media pipeline built",
      href: BOOK_URL,
    },
  },

  // --- 10-13. Business-type modules (one each) -------------------------------
  {
    id: "ai-for-smb",
    biz: ["smb"],
    title: "AI for Your Business: Calls, Bookings, and Follow-Ups",
    emoji: "🏪",
    minutes: 25,
    summary:
      "For owners with customers calling: the three leaks AI plugs first — missed calls, slow follow-up, and an underperforming website — with real numbers.",
    sections: [
      {
        heading: "The missed-call math",
        body:
          "Most local businesses miss 20–40% of calls, and 80% of callers who hit voicemail don't call back — they call the next result. If your average customer is worth $200, five missed calls a week is $50,000+ a year walking to competitors. This is almost always the most expensive problem AI can fix, and the cheapest to fix.",
      },
      {
        heading: "The AI receptionist",
        body:
          "An AI receptionist answers every call 24/7, books appointments into your calendar, texts back missed callers instantly, and sends you a summary of every conversation. It doesn't call in sick and it never has a bad day. Setup is days, not months, and it pays for itself with the first one or two saved customers a month.",
      },
      {
        heading: "Follow-up on autopilot",
        body:
          "The second leak: no follow-up. Review requests after every job, reminders before appointments, rebooking nudges, invoice chasing — every one automatable. Businesses that automate follow-up typically see reviews double within a quarter, and reviews drive the next customer.",
      },
      {
        heading: "Your website should work as hard as you do",
        body:
          "A modern site with an AI chat that answers questions and books directly converts several times better than a brochure site. Combined with the receptionist and follow-ups, you get a front office that runs itself — you do the work, the system fills the calendar.",
      },
    ],
    exercise:
      "This week, tally your missed calls (your phone log has the data). Multiply by your average customer value and by 50 weeks. That number is your decision.",
    upsell: {
      text: "This module is literally what Limitless builds: Bella the AI receptionist, converting websites, and follow-up automations for local businesses.",
      cta: "See what we'd build for your business",
      href: BOOK_URL,
    },
  },
  {
    id: "ai-solo-money",
    biz: ["solo"],
    title: "The Solo Operator's AI Leverage Kit",
    emoji: "🚀",
    minutes: 25,
    summary:
      "One person plus AI is a team now. Productize what you know, deliver faster than agencies, and run the back office in an hour a week.",
    sections: [
      {
        heading: "You're not solo anymore",
        body:
          "The solo ceiling was always hours: you sell time, you run out of time. AI breaks that. Proposals in minutes, deliverables drafted before the kickoff call, admin compressed to a weekly hour. The one-person business that looks and delivers like a five-person shop is the biggest arbitrage of this decade.",
      },
      {
        heading: "Productize with AI",
        body:
          "Take the thing people ask your help with and turn it into a repeatable offer: fixed scope, fixed price, AI-accelerated delivery. AI writes the sales page, drafts the delivery templates, and handles revision rounds. Your expertise sets the quality bar; AI removes the hours between orders.",
      },
      {
        heading: "The back office in one hour",
        body:
          "Invoicing chased automatically, expenses categorized monthly by AI, contracts reviewed before signing ('flag anything unusual in plain English'), a weekly AI-built dashboard of what's owed and what's next. The boring stuff that kills solo businesses becomes a Friday coffee ritual.",
      },
    ],
    exercise:
      "Write one productized offer with AI's help today: who it's for, what they get, the price, delivered in what timeframe. Then have AI draft the one-page pitch for it.",
  },
  {
    id: "ai-at-work",
    biz: ["employee"],
    title: "The Employee Edge: Be the AI Person Without Saying So",
    emoji: "📈",
    minutes: 20,
    summary:
      "Deliver faster, look sharper in every meeting, and quietly become the person your team can't operate without — while respecting the rules.",
    sections: [
      {
        heading: "The quiet advantage",
        body:
          "First drafts before the meeting ends, reports summarized before the boss finishes forwarding them, questions anticipated with answers ready. You don't announce any of it. Within a quarter you have a reputation for being fast and thorough, which is what promotions are actually made of.",
      },
      {
        heading: "Play by the rules (they matter here)",
        body:
          "Non-negotiable: know your company's AI policy. Never paste confidential data, customer records, or unreleased anything into personal AI accounts. If the company offers a sanctioned tool, use that for internal material and keep personal AI for skills, drafts of your own writing, and thinking. The edge isn't worth an HR file.",
      },
      {
        heading: "Become the multiplier",
        body:
          "Stage two: stop being the person who uses AI and become the person who shows others. Run a lunch-and-learn, template your best prompts for the team, propose one automated workflow. 'Taught the team the thing that saved 10 hours a week' is a performance-review sentence that writes its own raise.",
      },
    ],
    exercise:
      "Find your company's AI policy (ask IT if it isn't written down — that question alone marks you as thoughtful). Then pick one recurring deliverable and cut its production time in half with the techniques from Prompting Pro.",
  },
  {
    id: "content-machine",
    biz: ["creator"],
    title: "The Content Machine: One Idea, Ten Assets",
    emoji: "🎥",
    minutes: 25,
    summary:
      "Stop making one post at a time. The pipeline: capture ideas → AI expands → batch produce → repurpose everywhere, with your voice intact.",
    sections: [
      {
        heading: "The repurposing pyramid",
        body:
          "One solid idea becomes: a long post, three short posts, a thread, a script, five hooks to test, a newsletter section, and a carousel outline. AI does the transformation between formats; you do the idea and the taste. Creators burning out are usually doing by hand what this pipeline does in twenty minutes.",
      },
      {
        heading: "Keep your voice",
        body:
          "Feed AI ten of your best-performing pieces and ask it to describe your voice — tone, rhythm, phrases, what you never say. Save that description; open every content session by pasting it. Generic AI content is a prompting failure, not a tool failure.",
      },
      {
        heading: "The idea vault",
        body:
          "Ideas die in notes apps. Keep a running ideas file (your second brain if you built it): every shower thought lands there, and once a week AI ranks the backlog, expands the top three into outlines, and drafts one. Your content calendar fills itself from your own thinking.",
      },
      {
        heading: "Add AI visuals",
        body:
          "Pair this with the Higgsfield module: hooks and scripts from your chat AI, visuals and b-roll from AI media, edited vertical, posted on schedule. The full stack is one person producing at small-studio volume.",
      },
    ],
    exercise:
      "Take your best piece of content from the last month. Run the pyramid: have AI turn it into five other formats in your voice. Post the best one this week.",
  },

  // --- 14-15. Capstone + done-for-you ----------------------------------------
  {
    id: "your-ai-os",
    title: "Capstone: Your Personal AI Operating System",
    emoji: "🏛️",
    minutes: 30,
    summary:
      "Assemble everything into one system with a name, a daily rhythm, and a growth loop — the difference between 'I use AI' and 'I run on AI'.",
    sections: [
      {
        heading: "The architecture you just built",
        body:
          "Look at the stack from this course: a capture habit, a prompting method, a second brain for memory, (for the builders) an assistant that acts and jobs that run on schedule, AI media for anything visual, and your domain playbook. Separately they're tricks. Wired together — each one feeding the next — they're an operating system for your life or business.",
      },
      {
        heading: "The daily rhythm",
        body:
          "A working AI OS has a pulse: a morning brief that tells you where you left off and what matters today; capture-as-you-go into the second brain; AI-first reflex on any task you sigh at; a weekly review where AI summarizes the week and you decide what to systematize next. Twenty minutes of rhythm, compounding daily.",
      },
      {
        heading: "The growth loop",
        body:
          "Once a week, ask one question: 'What did I do manually this week that a system should own?' Then build that one thing — a skill, a scheduled job, a template. One upgrade a week is fifty a year. That loop, run for a year, is how a single founder ends up with a voice assistant, an email agent, a Discord command center, and an agent fleet — every piece of it started as one week's upgrade.",
      },
      {
        heading: "Name it",
        body:
          "Unironically: name your system. The Limitless stack calls its brain 'Alfred'. A named system is a thing you maintain and grow; an unnamed pile of tools is a thing you forget. You're not a user anymore — you're an operator.",
      },
    ],
    exercise:
      "Write your AI OS charter, one page: your system's name, your daily rhythm, your five-rule protocol, and the first three weekly upgrades you'll build. Save it as the first note in your vault's Knowledge folder.",
  },
  {
    id: "done-for-you",
    title: "Want It Built For You?",
    emoji: "🤝",
    minutes: 5,
    summary:
      "Everything in this course is a system you can build — or one we've already built and can deploy for you.",
    sections: [
      {
        heading: "The honest pitch",
        body:
          "This course taught you to build it yourself, and you genuinely can. But if you're a business owner whose hours are worth more than the build time, Limitless deploys these exact systems as a service: Bella the AI receptionist answering your calls, websites that convert with AI chat built in, follow-up automations, and AI media pipelines. Same architecture you just learned — running for you in days instead of months.",
      },
      {
        heading: "How it starts",
        body:
          "A short call: we look at how your business runs, show you exactly what we'd build and what it costs, and you decide. No retainer required to find out. Worst case, you leave with a sharper build plan for doing it yourself.",
      },
    ],
    exercise:
      "Whether you build or buy: write down the one system from this course that would change your next quarter most. That's your next move — take it this week.",
    upsell: {
      text: "Bring your quiz result to the call — it tells us exactly where to start.",
      cta: "Book your build call",
      href: BOOK_URL,
    },
  },
];
