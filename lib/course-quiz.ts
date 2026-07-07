// Pure definitions + scoring for the "Perfect AI Setup" quiz.
// Imported by the API route, the client component, and the unit tests, so it
// must stay free of React / Next / server-only imports.

export type Track = "genz" | "millennial" | "genx" | "boomer";
export type Level = "starter" | "dabbler" | "daily" | "power";
export type Goal = "time" | "money" | "build" | "relevant";
export type Biz = "solo" | "smb" | "employee" | "creator";
export type Segment = "hot" | "warm" | "cold";

export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: "track" | "level" | "goal" | "biz" | "hours" | "budget";
  prompt: string;
  helper?: string;
  options: QuizOption[];
}

export type Answers = Partial<Record<QuizQuestion["id"], string>>;

export interface CoursePlan {
  track: Track;
  level: Level;
  goal: Goal;
  biz: Biz;
  segment: Segment;
  /** Friendly headline for the result page, e.g. "The Builder's Fast Track". */
  title: string;
  /** One-liner describing the tone/pace this track uses. */
  pace: string;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "track",
    prompt: "When were you born?",
    helper: "So the course talks to you like a person, not a manual.",
    options: [
      { value: "boomer", label: "Before 1965" },
      { value: "genx", label: "1965 – 1980" },
      { value: "millennial", label: "1981 – 1996" },
      { value: "genz", label: "1997 or later" },
    ],
  },
  {
    id: "level",
    prompt: "How much have you actually used AI?",
    options: [
      { value: "starter", label: "Never, or barely — it's all new" },
      { value: "dabbler", label: "I've tried ChatGPT a few times" },
      { value: "daily", label: "I use AI most days" },
      { value: "power", label: "I build with AI — prompts, tools, automations" },
    ],
  },
  {
    id: "goal",
    prompt: "What do you want AI to do for you?",
    options: [
      { value: "time", label: "Give me my time back" },
      { value: "money", label: "Make me money" },
      { value: "build", label: "Help me build something" },
      { value: "relevant", label: "Keep me from falling behind" },
    ],
  },
  {
    id: "biz",
    prompt: "Which sounds most like you?",
    options: [
      { value: "solo", label: "Solo — freelancer, side hustle, or just me" },
      { value: "smb", label: "I run a business with customers calling" },
      { value: "employee", label: "I have a job and want an edge" },
      { value: "creator", label: "I make content — video, social, writing" },
    ],
  },
  {
    id: "hours",
    prompt: "How much time can you give this per week?",
    options: [
      { value: "1", label: "About an hour" },
      { value: "3", label: "A few hours" },
      { value: "10", label: "I'm all in" },
    ],
  },
  {
    id: "budget",
    prompt: "If AI clearly paid for itself, what would you invest monthly?",
    helper: "No wrong answer — this shapes which tools we recommend.",
    options: [
      { value: "0", label: "Free tools only" },
      { value: "50", label: "Up to $50" },
      { value: "300", label: "Up to $300" },
      { value: "more", label: "Whatever it takes if the ROI is real" },
    ],
  },
];

const TRACKS: Track[] = ["genz", "millennial", "genx", "boomer"];
const LEVELS: Level[] = ["starter", "dabbler", "daily", "power"];
const GOALS: Goal[] = ["time", "money", "build", "relevant"];
const BIZ: Biz[] = ["solo", "smb", "employee", "creator"];

const TITLES: Record<Goal, string> = {
  time: "The Time-Back Setup",
  money: "The Money Machine Setup",
  build: "The Builder's Fast Track",
  relevant: "The Stay-Sharp Setup",
};

const PACE: Record<Track, string> = {
  genz: "Fast, hands-on, zero fluff — you'll be building by module two.",
  millennial: "Self-paced and practical — every module ends with something working.",
  genx: "Efficient and straight-talking — real ROI, no hype, no jargon.",
  boomer: "One clear step at a time, plain English, nothing assumed.",
};

function pick<T extends string>(valid: readonly T[], value: string | undefined, fallback: T): T {
  return valid.includes(value as T) ? (value as T) : fallback;
}

/** Hot = ready to buy done-for-you services; warm = nurture; cold = tips drip. */
function segmentFor(goal: Goal, biz: Biz, budget: string | undefined): Segment {
  const spender = budget === "300" || budget === "more";
  const businessBuyer = biz === "smb" || goal === "money";
  if (spender && businessBuyer) return "hot";
  if (spender || businessBuyer || goal === "build") return "warm";
  return "cold";
}

export function scoreAnswers(answers: Answers): CoursePlan {
  const track = pick(TRACKS, answers.track, "millennial");
  const level = pick(LEVELS, answers.level, "starter");
  const goal = pick(GOALS, answers.goal, "time");
  const biz = pick(BIZ, answers.biz, "solo");
  return {
    track,
    level,
    goal,
    biz,
    segment: segmentFor(goal, biz, answers.budget),
    title: TITLES[goal],
    pace: PACE[track],
  };
}

export const ALL_TRACKS = TRACKS;
export const ALL_LEVELS = LEVELS;
export const ALL_GOALS = GOALS;
export const ALL_BIZ = BIZ;
