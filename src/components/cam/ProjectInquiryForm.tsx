import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { INQUIRY_PACKAGE_OPTIONS } from "@/lib/packages";

const TRADES = [
  "Plumbing", "Electrical", "HVAC", "Roofing", "Landscaping", "Painting",
  "General Contracting", "Renovation", "Other trade / home service",
];
const BUDGETS = ["", "Under $1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+"];

const input =
  "w-full bg-transparent border border-[rgba(255,255,255,0.12)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3978F6] transition-colors";
const select =
  "w-full bg-[#101C2C] border border-[rgba(255,255,255,0.12)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3978F6]";
const label =
  "text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.55)] block mb-1.5";

export function ProjectInquiryForm({ defaultPackage }: { defaultPackage?: string }) {
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", trade: TRADES[0], website: "",
    pkg: defaultPackage ?? INQUIRY_PACKAGE_OPTIONS[0], budget: "", details: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  if (status === "done") {
    return (
      <div className="text-center py-10" role="status">
        <h3 className="text-2xl font-bold mb-2">Thanks — inquiry received.</h3>
        <p className="text-[rgba(255,255,255,0.65)] mb-6">
          We&apos;ll reply within one business day with next steps and your free website preview.
        </p>
        <Link to="/website-designs" className="btn-secondary text-sm">View Website Designs →</Link>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!consent) { setError("Please agree to be contacted about your inquiry."); return; }
        setStatus("sending"); setError(null);
        try {
          const res = await fetch("/api/public/project-inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (!res.ok) throw new Error("We couldn't send your inquiry. Please try again or email support@jasonrszova.com.");
          setStatus("done");
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label} htmlFor="pi-name">Name *</label><input id="pi-name" required maxLength={120} className={input} value={form.name} onChange={set("name")} /></div>
        <div><label className={label} htmlFor="pi-biz">Business name *</label><input id="pi-biz" required maxLength={160} className={input} value={form.business} onChange={set("business")} /></div>
        <div><label className={label} htmlFor="pi-email">Email *</label><input id="pi-email" type="email" required maxLength={255} className={input} value={form.email} onChange={set("email")} /></div>
        <div><label className={label} htmlFor="pi-phone">Phone *</label><input id="pi-phone" type="tel" required minLength={3} maxLength={40} className={input} value={form.phone} onChange={set("phone")} /></div>
        <div><label className={label} htmlFor="pi-trade">Trade or industry *</label>
          <select id="pi-trade" className={select} value={form.trade} onChange={set("trade")}>{TRADES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div><label className={label} htmlFor="pi-site">Existing website (optional)</label><input id="pi-site" maxLength={255} className={input} placeholder="yourbusiness.ca" value={form.website} onChange={set("website")} /></div>
        <div><label className={label} htmlFor="pi-pkg">Desired package *</label>
          <select id="pi-pkg" className={select} value={form.pkg} onChange={set("pkg")}>{INQUIRY_PACKAGE_OPTIONS.map((p) => <option key={p}>{p}</option>)}</select></div>
        <div><label className={label} htmlFor="pi-budget">Budget range (optional)</label>
          <select id="pi-budget" className={select} value={form.budget} onChange={set("budget")}>{BUDGETS.map((b) => <option key={b} value={b}>{b || "Prefer not to say"}</option>)}</select></div>
      </div>
      <div><label className={label} htmlFor="pi-details">Project details *</label>
        <textarea id="pi-details" required maxLength={3000} rows={5} className={input} placeholder="Services you offer, areas you serve, pages or features you need…" value={form.details} onChange={set("details")} /></div>
      <label className="flex items-start gap-3 text-xs text-[rgba(255,255,255,0.6)]">
        <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree to be contacted by ClickAdMedia about this inquiry. See our <Link to="/privacy" className="underline">privacy policy</Link>.</span>
      </label>
      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full text-center py-4 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send Project Inquiry →"}
      </button>
    </form>
  );
}
