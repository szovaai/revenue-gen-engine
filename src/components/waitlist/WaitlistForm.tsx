import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const BUSINESS_TYPES = [
  "Home Services (Plumbing, HVAC, Electrical)",
  "Construction & Renovation",
  "Health & Wellness",
  "Retail & E-commerce",
  "Restaurant & Food Service",
  "Professional Services",
  "Other",
] as const;

const schema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  business_type: z.enum(BUSINESS_TYPES, { message: "Please choose a business type" }),
});

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    const parsed = schema.safeParse({
      first_name: firstName,
      email,
      business_type: businessType,
    });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setStatus("loading");
    const { error } = await supabase.from("waitlist").insert(parsed.data);

    if (error) {
      if ((error as { code?: string }).code === "23505") {
        setSubmittedEmail(parsed.data.email);
        setStatus("success");
        return;
      }
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }

    setSubmittedEmail(parsed.data.email);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="cam-fade-up rounded-2xl border p-8 text-center"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border-soft)",
          boxShadow: "0 0 40px rgba(0, 180, 255, 0.08)",
        }}
        role="status"
        aria-live="polite"
      >
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(0, 229, 160, 0.12)" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00E5A0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-white">You&rsquo;re on the list.</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted-soft)" }}>
          We&rsquo;ll reach out to{" "}
          <span className="font-medium text-white">{submittedEmail}</span> when ClickAdMedia
          launches. Keep an eye on your inbox &mdash; early access perks included.
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-[10px] border px-4 py-[14px] text-base text-white placeholder:text-[color:var(--color-muted-soft)] outline-none transition focus:border-[color:var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(0,180,255,0.18)]";
  const inputStyle = {
    background: "var(--color-ink)",
    borderColor: "var(--color-border-soft)",
    fontFamily: "var(--font-sans)",
  } as const;

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      noValidate
      className="cam-fade-up rounded-2xl border p-8"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border-soft)",
        boxShadow: "0 0 40px rgba(0, 180, 255, 0.08)",
        ["--cam-delay" as string]: "800ms",
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="cam-first-name" className="sr-only">
            First name
          </label>
          <input
            id="cam-first-name"
            type="text"
            autoComplete="given-name"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputBase}
            style={inputStyle}
            disabled={status === "loading"}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="cam-email" className="sr-only">
            Email address
          </label>
          <input
            id="cam-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
            style={inputStyle}
            disabled={status === "loading"}
            required
            maxLength={255}
          />
        </div>
        <div>
          <label htmlFor="cam-business-type" className="sr-only">
            Business type
          </label>
          <select
            id="cam-business-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className={inputBase}
            style={inputStyle}
            disabled={status === "loading"}
            required
          >
            <option value="" disabled>
              Select your business type...
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="group relative flex h-[52px] w-full items-center justify-center rounded-[10px] text-base font-semibold text-white transition will-change-transform hover:brightness-110 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80"
          style={{
            background: "linear-gradient(135deg, #00b4ff 0%, #8b00ff 100%)",
            fontFamily: "var(--font-sans)",
            transitionDuration: "150ms",
          }}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-3">
              <svg
                className="cam-spin"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Securing your spot...
            </span>
          ) : (
            <span>Get Early Access &rarr;</span>
          )}
        </button>

        {status === "error" && message ? (
          <p className="text-center text-sm text-red-400" role="alert">
            {message}
          </p>
        ) : null}

        <p
          className="text-center text-[13px]"
          style={{ color: "var(--color-muted-soft)" }}
        >
          🔒 No spam. No credit card. Just first access when we launch.
        </p>
      </div>
    </form>
  );
}
