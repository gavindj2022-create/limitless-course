import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <section className="hero">
        <span className="eyebrow">Limitless · Free personalized course</span>
        <h1>
          The perfect AI setup exists.
          <br />
          Yours is 2 minutes away.
        </h1>
        <p className="lead">
          Six quick questions — your generation, your experience, your goals —
          and we build your personal course on the spot. Not a generic AI
          tutorial: the exact path from where you are to running on AI, at your
          pace, in your language.
        </p>
        <Link href="/quiz" className="btn">
          Build my AI setup →
        </Link>

        <div className="hero-points">
          <div className="point">
            <span className="ico">🧭</span>
            <h3>Made for your generation</h3>
            <p>
              A 22-year-old and a 62-year-old shouldn&apos;t get the same AI
              course. Here, they don&apos;t.
            </p>
          </div>
          <div className="point">
            <span className="ico">📈</span>
            <h3>Basics to expert</h3>
            <p>
              From your first conversation to agents that work while you sleep
              — you stop wherever you&apos;re happy.
            </p>
          </div>
          <div className="point">
            <span className="ico">🎬</span>
            <h3>Beyond chat</h3>
            <p>
              Second brains, automations, and AI video with Higgsfield — the
              stuff most courses never reach.
            </p>
          </div>
          <div className="point">
            <span className="ico">🛠️</span>
            <h3>Built on a real system</h3>
            <p>
              Everything here runs a real business every day. You&apos;re
              learning the working version, not the theory.
            </p>
          </div>
        </div>
      </section>

      <footer className="site">
        <span>© {new Date().getFullYear()} Limitless</span>
        <span>AI systems, built and proven on our own business first.</span>
      </footer>
    </main>
  );
}
