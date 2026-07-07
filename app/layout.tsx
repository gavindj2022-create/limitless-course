import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Perfect AI Setup — Limitless",
  description:
    "Take the 2-minute quiz and get a personalized course: the exact AI setup for your generation, skill level, and goals. Free, from Limitless.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
