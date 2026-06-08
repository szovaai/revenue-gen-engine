import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  website: z
    .string()
    .trim()
    .min(3, "Enter your website")
    .max(255)
    .regex(/\.[a-z]{2,}/i, "That doesn't look like a URL"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function AuditForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
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
      const stored = JSON.parse(localStorage.getItem("cam_audits") ?? "[]");
      stored.push({ ...result.data, at: new Date().toISOString() });
      localStorage.setItem("cam_audits", JSON.stringify(stored));
    } catch {
      // ignore storage errors
    }
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="audit-heading"
      id="audit"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-2xl"
          />
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Free Audit
            </span>
            <h2
              id="audit-heading"
              className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Free Revenue Audit.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Drop your URL and we'll show you exactly where your site is leaking leads — and the
              fastest wins to turn it into a Revenue Engine.
            </p>
          </div>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mx-auto mt-10 flex max-w-xl items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 p-5 text-left"
            >
              <CheckCircle2 className="mt-0.5 h-6 w-6 flex-none text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-foreground">Audit request received.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll review your site and follow up within one business day with your custom
                  audit.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mx-auto mt-10 grid max-w-xl gap-4"
              aria-label="Free website audit request"
            >
              <Field
                label="Your name"
                name="name"
                type="text"
                autoComplete="name"
                error={errors.name}
                placeholder="Jane Smith"
              />
              <Field
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                error={errors.email}
                placeholder="jane@business.com"
              />
              <Field
                label="Website URL"
                name="website"
                type="text"
                autoComplete="url"
                error={errors.website}
                placeholder="yourbusiness.com"
              />
              <button
                type="submit"
                disabled={submitting}
                className="group mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px] hover:shadow-[0_14px_50px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Get My Free Audit"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                No credit card. No commitment. Just actionable insights.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
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
  const id = `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={`w-full rounded-xl border bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          error ? "border-destructive" : "border-border focus-visible:border-primary"
        }`}
      />
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
