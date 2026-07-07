import CourseView from "@/components/CourseView";

export const metadata = {
  title: "Your Personalized AI Course — Limitless",
  description: "Your custom path from AI basics to expert, assembled from your quiz answers.",
};

export default function CoursePage() {
  return (
    <main className="wrap">
      <CourseView />
    </main>
  );
}
