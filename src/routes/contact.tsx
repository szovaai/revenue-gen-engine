import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectInquiryForm } from "@/components/cam/ProjectInquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start Your Project — ClickAdMedia" },
      { name: "description", content: "Tell us about your trade business. Get a free website preview and a personalized quote before you commit." },
      { property: "og:title", content: "Start Your Project — ClickAdMedia" },
      { property: "og:description", content: "Project inquiry for plumbers, electricians, HVAC, roofers and contractors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="section-label">Contact</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-4">Get Your Free Website Preview.</h1>
          <p className="text-[rgba(255,255,255,0.6)] text-lg max-w-[620px] mx-auto">
            Share your trade, services, and goals. We&apos;ll confirm a clear quote tailored to your project. Start with a
            free, personalized preview — you don&apos;t pay for a website you don&apos;t approve.
          </p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-8">
          <div className="glass-card p-8"><ProjectInquiryForm /></div>
          <aside className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="font-bold mb-2">Prefer to talk?</h2>
              <p className="text-sm text-[rgba(255,255,255,0.6)] mb-4">Pick a time for a short call about your project.</p>
              <Link to="/book-a-call" className="btn-secondary text-sm">Book a Call →</Link>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-bold mb-2">Email</h2>
              <a href="mailto:support@jasonrszova.com" className="text-sm text-[#3978F6]">support@jasonrszova.com</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
