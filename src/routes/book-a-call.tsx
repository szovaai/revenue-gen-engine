import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi();
      if (cancelled) return;
      cal("inline", {
        elementOrSelector: "#cal-inline",
        calLink,
        config: { layout: "month_view", theme: "dark" },
      });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#007bff" },
          dark: { "cal-brand": "#007bff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [calLink]);
  return <div id="cal-inline" style={{ width: "100%", minHeight: "650px", overflow: "scroll" }} />;
}

export const Route = createFileRoute("/book-a-call")({
  head: () => ({
    meta: [
      { title: "Book a Call — ClickAdMedia" },
      {
        name: "description",
        content:
          "Book a call, text us, or fill out the form. We'll get your free website preview started today.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    industry: "Plumber",
  });

  const fields = [
    { key: "name", label: "Your Name", type: "text", placeholder: "John Smith" },
    { key: "business", label: "Business Name", type: "text", placeholder: "Smith's Plumbing" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "(555) 123-4567" },
    { key: "email", label: "Email", type: "email", placeholder: "john@smithsplumbing.com" },
  ] as const;

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-label">Get Started</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4">
            Let&apos;s Build Your Site.
            <br />
            <span className="text-gradient">For $500. In 48 Hours.</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[550px] mx-auto">
            Book a call, text us, or fill out the form. We&apos;ll get your free preview started
            today.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <div className="glass-card p-8 mb-6">
              <h3 className="text-lg font-bold mb-4">Book a Call</h3>
              <p className="text-sm text-[rgba(255,255,255,0.55)] mb-5">
                Pick a time that works for you. We&apos;ll discuss your business, show you demos,
                and get your project started.
              </p>
              <div
                className="rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)]"
                style={{ background: "#0f1f38" }}
              >
                <CalEmbed calLink="clickadmedia" />
              </div>
            </div>


            <div className="grid sm:grid-cols-1 gap-4">
              <div className="glass-card p-6 text-center">
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,123,255,0.1)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="#007bff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22,6 12,13 2,6"
                      stroke="#007bff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-sm mb-1">Email</h4>
                <a
                  href="mailto:hello@clickadmedia.co"
                  className="text-[#007bff] hover:text-[#00c6ff] text-sm font-medium"
                >
                  hello@clickadmedia.co
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="glass-card p-8">
              {!submitted ? (
                <>
                  <h3 className="text-lg font-bold mb-1">Request Your Free Preview</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.55)] mb-6">
                    Tell us about your business and we&apos;ll send you a free mockup of your new
                    website within 24 hours.
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (submitting) return;
                      setSubmitting(true);
                      setErrorMsg(null);
                      try {
                        const res = await fetch("/api/public/free-preview-request", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(form),
                        });
                        if (!res.ok) {
                          const data = await res.json().catch(() => ({}));
                          throw new Error(data.error || "Something went wrong");
                        }
                        setSubmitted(true);
                      } catch (err) {
                        setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className="space-y-4"
                  >

                    {fields.map((f) => (
                      <div key={f.key}>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.5)] block mb-1.5">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full bg-transparent border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#007bff] transition-colors"
                          placeholder={f.placeholder}
                          required
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.5)] block mb-1.5">
                        Your Industry
                      </label>
                      <select
                        value={form.industry}
                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        className="w-full bg-[#0f1f38] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#007bff]"
                      >
                        {[
                          "Plumber",
                          "Roofer",
                          "Dentist",
                          "HVAC",
                          "Lawyer",
                          "Chiropractor",
                          "Auto Repair",
                          "Landscaping",
                          "Restaurant",
                          "Real Estate",
                          "Other",
                        ].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full text-center py-4 mt-2">
                      Send Me My Free Preview →
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--cam-gradient)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Preview Request Sent!</h3>
                  <p className="text-[rgba(255,255,255,0.6)] mb-6">
                    We&apos;ll have your free mockup ready within 24 hours. Keep an eye on your
                    inbox.
                  </p>
                  <Link to="/portfolio" className="btn-secondary text-sm">
                    Browse Our Demos →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {[
              "✓ No contracts",
              "✓ 48-hour delivery",
              "✓ $500 flat fee",
              "✓ You own the site",
              "✓ Free preview",
            ].map((item) => (
              <span key={item} className="text-sm text-[rgba(255,255,255,0.6)] font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
