import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { PageShell } from "@/components/home/PageShell";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply for the $500 Revenue Engine Setup | ClickAdMedia" },
      {
        name: "description",
        content:
          "Apply for the ClickAdMedia $500 Revenue Engine setup. Done-for-you contractor lead-gen website plus instant SMS/email follow-up automation.",
      },
      { property: "og:title", content: "Apply for the $500 Setup — ClickAdMedia" },
      {
        property: "og:description",
        content:
          "One-time $500 setup. A done-for-you Revenue Engine for contractors who want more booked jobs.",
      },
      { property: "og:url", content: "/apply" },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: ApplyPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  business: z.string().trim().min(2, "Please enter your business name").max(150),
  trade: z.string().trim().min(2, "Select or enter your trade").max(80),
  city: z.string().trim().min(2, "Where are you based?").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(40),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  goal: z.string().trim().max(500).optional().or(z.literal("")),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const benefits = [
  "One-time $500 setup — no surprise agency bill",
  "Done-for-you contractor lead-gen website",
  "Instant SMS & email follow-up automation",
  "CRM-ready lead routing and trust sections",
];

function ApplyPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? ""),
      business: String(form.get("business") ?? ""),
      trade: String(form.get("trade") ?? ""),
      city: String(form.get("city") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      website: String(form.get("website") ?? ""),
      goal: String(form.get("goal") ?? ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (k && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const stored = JSON.parse(localStorage.getItem("cam_pilot_apps") ?? "[]");
      stored.push({ ...result.data, at: new Date().toISOString() });
      localStorage.setItem("cam_pilot_apps", JSON.stringify(stored));
    } catch {
      // ignore
    }
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <PageShell>
      <section className="relative pt-36 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              $500 One-Time Setup
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Apply for the{" "}
              <span className="text-gradient-brand">$500 Setup.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Tell us about your trade, service area, and goals. If it's a fit, we'll map out
              your Revenue Engine and start the setup process.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card relative rounded-3xl p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 p-5"
              >
                <CheckCircle2 className="mt-0.5 h-6 w-6 flex-none text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Application received.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We'll review your trade and service area and reach out within one business
                    day with the next step.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-label="Revenue Engine setup application">
                <h2 className="text-xl font-semibold text-foreground">Tell us about your business</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" name="name" type="text" autoComplete="name" error={errors.name} placeholder="Jane Smith" />
                  <Field label="Business name" name="business" type="text" autoComplete="organization" error={errors.business} placeholder="Smith Roofing Co." />
                  <Field label="Trade" name="trade" type="text" error={errors.trade} placeholder="Roofing, HVAC, Plumbing…" />
                  <Field label="City / Service area" name="city" type="text" autoComplete="address-level2" error={errors.city} placeholder="Calgary, AB" />
                  <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} placeholder="you@business.com" />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} placeholder="(555) 123-4567" />
                </div>
                <Field label="Current website (optional)" name="website" type="text" autoComplete="url" error={errors.website} placeholder="yourbusiness.com" />
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-foreground">Lead goal (optional)</span>
                  <textarea
                    name="goal"
                    rows={3}
                    placeholder="e.g. 20 quote requests per month"
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  {errors.goal && <span className="text-xs text-destructive">{errors.goal}</span>}
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Apply for the $500 Setup"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  By applying, you agree to be contacted about your application.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        aria-invalid={error ? "true" : "false"}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}
