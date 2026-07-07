"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  QUESTIONS,
  scoreAnswers,
  type Answers,
} from "@/lib/course-quiz";
import { encodePlan } from "@/lib/course-assembly";

type SubmitStatus = "idle" | "sending" | "error";

const TOTAL_STEPS = QUESTIONS.length + 1; // questions + email gate

const emptyContact = {
  name: "",
  email: "",
  website: "", // honeypot
};

export default function CourseQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState(emptyContact);
  const [submit, setSubmit] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onContactStep = step === QUESTIONS.length;
  const question = onContactStep ? null : QUESTIONS[step];
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  function pickOption(value: string) {
    if (!question) return;
    setAnswers((a) => ({ ...a, [question.id]: value }));
    window.setTimeout(() => setStep((s) => Math.min(s + 1, QUESTIONS.length)), 200);
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function finish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const plan = scoreAnswers(answers);
    const code = encodePlan(plan);
    setSubmit("sending");
    try {
      const res = await fetch("/api/course-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          website: contact.website,
          answers,
          plan: code,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      // The lead is nice to have; the course is the promise. Never block it.
      setErrorMsg(err instanceof Error ? err.message : "");
    }
    router.push(`/course?plan=${encodeURIComponent(code)}`);
  }

  return (
    <div className="quiz-shell">
      <div className="quiz-progress" aria-hidden="true">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="quiz-step-count">
        Step {step + 1} of {TOTAL_STEPS}
      </div>

      <div className="quiz-card" key={step}>
        {question ? (
          <>
            <h2 className="quiz-prompt">{question.prompt}</h2>
            {question.helper && <p className="quiz-helper">{question.helper}</p>}
            <div className="quiz-options">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`quiz-option${
                    answers[question.id] === opt.value ? " is-selected" : ""
                  }`}
                  onClick={() => pickOption(opt.value)}
                >
                  <span className="quiz-option-dot" />
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <form className="quiz-contact" onSubmit={finish}>
            <h2 className="quiz-prompt">Your course is ready.</h2>
            <p className="quiz-helper">
              Tell us where to send your copy (and the follow-up lessons), and
              we&apos;ll open it right up.
            </p>

            <div className="quiz-field-grid">
              <label>
                <span>First name</span>
                <input
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  autoComplete="given-name"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="honeypot" aria-hidden="true">
              <span>Website</span>
              <input
                value={contact.website}
                onChange={(e) => setContact({ ...contact, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <button className="btn" disabled={submit === "sending"}>
              {submit === "sending" ? "Opening..." : "Show me my course →"}
            </button>
            {errorMsg && <p className="quiz-note">{errorMsg}</p>}
          </form>
        )}
      </div>

      {step > 0 && (
        <button className="quiz-back" onClick={goBack}>
          ← Back
        </button>
      )}
    </div>
  );
}
