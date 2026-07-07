import CourseQuiz from "@/components/CourseQuiz";

export const metadata = {
  title: "The AI Setup Quiz — Limitless",
  description:
    "Six questions. One personalized AI course — matched to your generation, skill level, and goals.",
};

export default function QuizPage() {
  return (
    <main className="wrap">
      <CourseQuiz />
    </main>
  );
}
