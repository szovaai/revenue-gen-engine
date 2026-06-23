import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — ClickAdMedia" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <section className="pt-32 pb-20 px-6 min-h-dvh">
      <div className="max-w-[640px] mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: "var(--cam-gradient)", boxShadow: "var(--cam-glow-strong)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-3">
          You&apos;re in. <span className="text-gradient">Welcome aboard.</span>
        </h1>
        <p className="text-[rgba(255,255,255,0.65)] text-lg mb-10">
          Payment received. The next step is a 15-minute onboarding call so we can map out your build.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/book-a-call" className="btn-primary" style={{ boxShadow: "var(--cam-glow)" }}>
            Book my onboarding call →
          </Link>
          <Link to="/dashboard" className="btn-secondary">
            Go to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
