import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { useAuth } from "@/hooks/use-auth";
import heroImg from "@/assets/ai-receptionist-hero.jpg";

export const Route = createFileRoute("/services/ai-receptionist")({
  head: () => ({
    meta: [
      { title: "AI Receptionist for Plumbers, Electricians & HVAC — ClickAdMedia" },
      {
        name: "description",
        content:
          "AI receptionist setup for home service businesses in Canada and the US. Answer calls, capture leads, and handle after-hours inquiries. $299 CAD setup + $199 CAD/month.",
      },
      { property: "og:title", content: "AI Receptionist for Home Service Businesses — ClickAdMedia" },
      {
        property: "og:description",
        content: "You're great at your job. But who answers your phone? Professionally configured AI receptionist for contractors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiReceptionistPage,
});

const muted = "text-[rgba(255,255,255,0.65)]";

const capabilities = [
  ["Answer Incoming Calls", "Give callers a professional, consistent first point of contact."],
  ["Capture New Leads", "Collect caller names, phone numbers, service addresses, and details about the job."],
  ["Understand What Customers Need", "Ask relevant questions so you have useful information before returning a call."],
  ["Handle After-Hours Inquiries", "Give callers a way to reach your business when you're unavailable, subject to your selected configuration."],
  ["Route Urgent Calls", "Configure escalation rules for emergencies and other calls that need your attention."],
  ["Support Appointment Booking", "Where supported by the selected software and connected calendar, help callers book available appointments."],
  ["Keep You Informed", "Receive lead information and call summaries through the available notification options."],
];

const steps = [
  ["Tell Us About Your Business", "We learn about your services, service area, hours, common customer questions, and how you want calls handled."],
  ["We Configure Your AI Receptionist", "We set up your greeting, business information, lead-capture questions, call-routing rules, and supported integrations."],
  ["Test Before Going Live", "We run test calls to check the caller experience, information collection, and escalation process."],
  ["Start Handling Calls", "Once approved, your AI receptionist goes live using the agreed phone setup. We help you understand how to review incoming leads and manage your system."],
];

const audiences = [
  "Plumbers and drain services",
  "Electricians",
  "HVAC and heating companies",
  "Roofing contractors",
  "Renovation and remodeling companies",
  "General contractors",
  "Landscaping and other home service businesses",
];

const setupIncludes = [
  "Initial business and call-flow consultation",
  "AI receptionist configuration",
  "Custom greeting and business information",
  "Service and service-area information",
  "Lead-capture questions",
  "Call-routing and escalation setup",
  "Supported lead notification configuration",
  "Test calls and launch assistance",
  "Basic post-launch adjustments",
];

const monthlyIncludes = [
  "Ongoing system management",
  "Basic call-flow and business-information updates",
  "Routine configuration support",
  "Assistance troubleshooting supported integrations",
  "Periodic review of system performance and lead-capture workflow",
];

const faqs = [
  ["Does the AI replace my existing business phone number?", "Not necessarily. The setup depends on your current phone provider and the selected software. Options may include call forwarding or another supported phone configuration. We'll explain the options before implementation."],
  ["Can it answer calls when I'm working?", "Yes, when configured and activated for the relevant incoming calls. We can discuss whether it should handle all calls, calls you miss, or calls outside your business hours."],
  ["Can it book appointments?", "Appointment booking depends on the software and calendar integrations available. We'll confirm whether your preferred workflow is supported before promising this feature."],
  ["What happens if someone has an emergency?", "We configure an agreed escalation process where supported. For example, urgent calls may be routed to a designated number or handled according to your emergency instructions. The AI should not be relied on as an emergency response service."],
  ["Do I need technical experience?", "No. ClickAd Media helps configure and test the system. You'll receive instructions for reviewing leads and making routine requests for changes."],
  ["Is the software included in the monthly price?", "The underlying software subscription and usage charges are separate unless explicitly included in a written package. You'll know the total expected cost before proceeding."],
  ["Can I cancel?", "Yes. You can cancel the monthly service at any time from your account's Manage Billing page. Service continues until the end of your current paid billing period, and you won't be charged again. See our Refund Policy and Terms for full details."],
  ["Will it guarantee more customers?", "No service can guarantee that callers will become paying customers. The purpose is to improve call handling and make it easier to capture and follow up on inquiries."],
];

function Check() {
  return <span className="text-gradient font-bold shrink-0">✓</span>;
}

function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/public/ai-receptionist-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending your request. Please try again or book a call instead.");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass-card p-8 text-center" role="status">
        <h3 className="text-2xl font-bold mb-3">Thanks — we got your request.</h3>
        <p className={muted}>
          We'll review your business details and reach out to talk through your call-handling setup.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] px-4 py-3 text-sm text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#3b82f6]";
  const label = "block text-xs font-semibold uppercase tracking-wider mb-2 text-[rgba(255,255,255,0.7)]";

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 md:p-8 grid gap-5 md:grid-cols-2">
      <div>
        <label className={label} htmlFor="ar-name">Name *</label>
        <input id="ar-name" name="name" required maxLength={120} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="ar-business">Business name *</label>
        <input id="ar-business" name="business" required maxLength={160} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="ar-email">Email *</label>
        <input id="ar-email" name="email" type="email" required maxLength={255} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="ar-phone">Phone number *</label>
        <input id="ar-phone" name="phone" type="tel" required minLength={7} maxLength={40} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="ar-type">Business type *</label>
        <select id="ar-type" name="businessType" required defaultValue="" className={input}>
          <option value="" disabled>Select one</option>
          {["Plumbing / drains", "Electrical", "HVAC / heating", "Roofing", "Renovation / remodeling", "General contractor", "Landscaping", "Other home service"].map((o) => (
            <option key={o} value={o} className="text-black">{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="ar-volume">Monthly call volume (optional)</label>
        <select id="ar-volume" name="callVolume" defaultValue="" className={input}>
          <option value="">Not sure</option>
          {["Under 50", "50–150", "150–300", "300+"].map((o) => (
            <option key={o} value={o} className="text-black">{o}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="ar-handling">Preferred call-handling setup *</label>
        <select id="ar-handling" name="callHandling" required defaultValue="" className={input}>
          <option value="" disabled>Select one</option>
          {["Missed calls only", "After-hours calls only", "All incoming calls", "Not sure yet"].map((o) => (
            <option key={o} value={o} className="text-black">{o}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="ar-details">Additional details</label>
        <textarea id="ar-details" name="details" rows={4} maxLength={2000} className={input} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-primary w-full text-center disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Get My AI Receptionist →"}
        </button>
        {error && <p className="text-sm text-red-400 mt-3" role="alert">{error}</p>}
        <p className={`text-xs mt-3 text-center ${muted}`}>
          We'll confirm the setup and software requirements before you commit.
        </p>
      </div>
    </form>
  );
}

function AiReceptionistPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, closeCheckout, isOpen, checkoutElement } = useStripeCheckout();

  const buy = () => {
    if (!user) {
      navigate({ to: "/auth", search: { next: "/services/ai-receptionist" } as never });
      return;
    }
    openCheckout({
      priceId: "ai_receptionist_monthly",
      setupPriceId: "ai_receptionist_setup",
      customerEmail: user.email,
      userId: user.id,
      returnUrl: `${window.location.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    });
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 md:pt-24 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label">AI Receptionist for Home Service Businesses</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-6 leading-[1.05]">
              You're Great at Your Job.{" "}
              <span className="text-gradient">But Who Answers Your Phone?</span>
            </h1>
            <p className={`text-lg mb-3 ${muted}`}>
              You're on a job. Your hands are busy. Your phone rings. It could be your next customer.
            </p>
            <p className={`text-base mb-8 ${muted}`}>
              ClickAd Media helps you set up an AI receptionist that answers incoming calls, captures
              customer details, and helps you respond to new business opportunities—even when you
              can't get to the phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button onClick={() => scrollTo("get-started")} className="btn-primary text-center">
                Get My AI Receptionist →
              </button>
              <button onClick={() => scrollTo("how-it-works")} className="btn-secondary text-center">
                See How It Works
              </button>
            </div>
            <p className="text-xs text-[rgba(255,255,255,0.5)]">
              Professionally configured for your business. No complicated technology to learn.
            </p>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Plumber working under a sink while an incoming call lights up his phone"
              width={1280}
              height={896}
              className="w-full h-auto rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl"
            />
            <div className="glass-card absolute -bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-72 p-4 text-sm">
              <div className="text-xs uppercase tracking-wider text-gradient font-bold mb-1">AI Receptionist · Live call</div>
              <p className="text-[rgba(255,255,255,0.8)]">
                "Thanks for calling. Can I get your name and the address where you need service?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-20">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Every Missed Call Could Be a Missed Opportunity.</h2>
          <p className={`mb-4 ${muted}`}>
            Running a service business means being on the road, working with customers, managing jobs,
            and solving problems. You can't always stop what you're doing to answer the phone.
          </p>
          <p className={`mb-4 ${muted}`}>Meanwhile, potential customers may be calling to ask about:</p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-6">
            {["An urgent plumbing repair", "A broken furnace or air conditioner", "An electrical problem", "A renovation estimate", "Your availability for an upcoming project"].map((i) => (
              <li key={i} className="glass-card px-4 py-3 text-sm flex gap-3"><Check />{i}</li>
            ))}
          </ul>
          <p className={`mb-2 ${muted}`}>When nobody answers, a potential customer may simply call the next company.</p>
          <p className="font-semibold">You shouldn't have to choose between doing the work and answering the phone.</p>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[760px] mb-10">
            <span className="section-label">The Solution</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Meet Your AI Receptionist.</h2>
            <p className={muted}>
              Imagine having a receptionist available to answer calls when you're busy, after hours, or
              unable to pick up. We configure an AI receptionist around your business, services, and
              preferred call-handling process.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map(([t, d]) => (
              <div key={t} className="glass-card p-6">
                <h3 className="font-bold text-lg mb-2">{t}</h3>
                <p className={`text-sm ${muted}`}>{d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.5)] mt-6">
            Features depend on the selected software, integrations, and configuration. We confirm what's
            supported before launch.
          </p>
          <button onClick={() => scrollTo("get-started")} className="btn-primary mt-6">Get Started Today →</button>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-20 scroll-mt-40">
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">Up and Running Without the Technical Headache.</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(([t, d], i) => (
              <li key={t} className="glass-card p-6">
                <div className="text-gradient text-3xl font-extrabold mb-3">0{i + 1}</div>
                <h3 className="font-bold mb-2">{t}</h3>
                <p className={`text-sm ${muted}`}>{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-semibold">You run your business. We help handle the setup.</p>
        </div>
      </section>

      {/* Who */}
      <section className="px-6 py-20">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Built for Businesses That Can't Always Answer the Phone.</h2>
          <p className={`mb-6 ${muted}`}>Our AI receptionist setup is ideal for:</p>
          <ul className="flex flex-wrap gap-3 mb-6">
            {audiences.map((a) => (
              <li key={a} className="glass-card px-4 py-2 text-sm">{a}</li>
            ))}
          </ul>
          <p className={muted}>
            Whether you're a solo operator or managing a small team, the goal is the same: make it easier
            to handle incoming inquiries while you focus on your work.
          </p>
        </div>
      </section>

      {/* Offer */}
      <section id="pricing" className="px-6 py-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-10">
            <span className="section-label">The Offer</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Your AI Receptionist, Set Up for Your Business.</h2>
            <p className={muted}>
              Stop piecing together software and trying to configure everything yourself. ClickAd Media
              handles the initial setup and helps you get your AI receptionist ready for real calls.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <span className="section-label">AI Receptionist Launch Package</span>
              <div className="text-4xl font-extrabold text-gradient mt-2">$299 CAD</div>
              <div className="text-sm text-[rgba(255,255,255,0.5)] mb-6">one-time setup</div>
              <ul className="space-y-3">
                {setupIncludes.map((i) => (
                  <li key={i} className={`flex gap-3 text-sm ${muted}`}><Check />{i}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-8">
              <span className="section-label">Ongoing Service</span>
              <div className="text-4xl font-extrabold mt-2">
                $199 CAD<span className="text-base font-medium">/month</span>
              </div>
              <div className="text-sm text-[rgba(255,255,255,0.5)] mb-6">billed monthly</div>
              <ul className="space-y-3">
                {monthlyIncludes.map((i) => (
                  <li key={i} className={`flex gap-3 text-sm ${muted}`}><Check />{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="glass-card p-6 mt-6 text-sm space-y-2 text-[rgba(255,255,255,0.7)]">
            <p><strong className="text-white">Billing terms:</strong> $299 CAD is charged once at checkout, and the $199 CAD monthly service starts the same day and renews automatically each month until cancelled.</p>
            <p><strong className="text-white">Cancellation:</strong> cancel anytime from Manage Billing in your account. Service continues to the end of the paid period; no further charges. See our <Link to="/refund-policy" className="underline">Refund Policy</Link> and <Link to="/terms" className="underline">Terms</Link>.</p>
            <p><strong className="text-white">Software subscription:</strong> the underlying AI receptionist subscription and any applicable usage charges are separate and paid directly by you to the provider unless otherwise agreed in writing.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button onClick={() => scrollTo("get-started")} className="btn-primary text-center">Get My AI Receptionist →</button>
            <button onClick={buy} className="btn-secondary text-center">Ready now? Pay online</button>
          </div>
          <p className="text-xs text-center text-[rgba(255,255,255,0.5)] mt-3">
            Start with a conversation about your business and call-handling needs. We'll confirm the setup
            and software requirements before you commit.
          </p>
        </div>
      </section>

      {/* Business case */}
      <section className="px-6 py-20">
        <div className="max-w-[800px] mx-auto glass-card p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">What Could One Additional Job Be Worth to You?</h2>
          <div className={`space-y-4 ${muted}`}>
            <p>Consider what a typical service call or new project is worth to your business.</p>
            <p>If your AI receptionist helps you capture an inquiry that would otherwise have gone unanswered, that opportunity could be valuable.</p>
            <p>Your results will depend on your call volume, service pricing, lead quality, and ability to convert inquiries into paying customers.</p>
            <p>We don't promise a specific number of leads or jobs. We help you put a better call-handling process in place so potential customers have a better chance of reaching you.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="max-w-[860px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="glass-card p-5 group">
                <summary className="cursor-pointer font-semibold list-none flex justify-between gap-4">
                  {q}
                  <span className="text-gradient group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className={`mt-3 text-sm ${muted}`}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + form */}
      <section id="get-started" className="px-6 py-20 scroll-mt-40">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              You're Busy Running Your Business. <span className="text-gradient">Let Us Help With the Calls.</span>
            </h2>
            <p className={`${muted} max-w-[640px] mx-auto`}>
              Your next customer shouldn't have to wonder whether anyone will answer. Let's configure an
              AI receptionist around your business, your services, and the way you want calls handled.
            </p>
          </div>
          <InquiryForm />
          <div className="text-center mt-6">
            <Link to="/book-a-call" className="btn-secondary inline-block">Contact ClickAd Media</Link>
          </div>
          <p className="text-xs text-center text-[rgba(255,255,255,0.45)] mt-8">
            ClickAd Media — Practical AI solutions for service businesses. AI call handling and available
            features depend on the selected provider and configuration.
          </p>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-4 pt-10">
            <div className="bg-white rounded-lg w-full max-w-2xl relative">
              <button onClick={closeCheckout} className="absolute -top-10 right-0 text-white text-sm hover:underline">
                ← Cancel
              </button>
              {checkoutElement}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
