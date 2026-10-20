import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/services/ai-receptionist")({
  head: () => ({
    meta: [
      { title: "AI Receptionist for Contractors — ClickAdMedia" },
      {
        name: "description",
        content:
          "Stop losing jobs to missed calls. An AI receptionist that answers calls and captures leads for home service businesses. $299 CAD setup + $199 CAD/month.",
      },
      { property: "og:title", content: "AI Receptionist for Contractors — ClickAdMedia" },
      {
        property: "og:description",
        content: "Stop losing jobs because you missed a call. $299 CAD setup + $199 CAD/month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiReceptionistPage,
});

const included = [
  "AI receptionist configured for your business",
  "Custom greeting and business information",
  "Lead capture: customer name, phone number, and job details",
  "Call handling for after-hours and missed calls",
  "Emergency call escalation rules",
  "Appointment-booking setup, where supported",
  "Testing and launch assistance",
  "Ongoing monitoring and basic adjustments",
];

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

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <span className="section-label">ClickAd Media · New Service</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-6">
            Stop Losing Jobs Because
            <br />
            <span className="text-gradient">You Missed a Call.</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.6)] text-lg max-w-[640px] mx-auto">
            Your AI receptionist answers incoming calls, captures new leads, and helps your home
            service business respond to customers—even when you're on the job.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <span className="section-label">AI Receptionist Launch Package</span>
            <div className="text-4xl font-extrabold text-gradient mt-2">$299 CAD</div>
            <div className="text-sm text-[rgba(255,255,255,0.5)] mb-4">one-time setup</div>
            <div className="text-3xl font-extrabold">
              $199 CAD<span className="text-base font-medium">/month</span>
            </div>
            <div className="text-sm text-[rgba(255,255,255,0.5)] mb-6">ongoing service</div>
            <button onClick={buy} className="btn-primary w-full text-center mb-3">
              Get Started →
            </button>
            <Link to="/book-a-call" className="btn-secondary w-full text-center block">
              Book a Call
            </Link>
            {!user && (
              <p className="text-xs text-[rgba(255,255,255,0.45)] mt-3 text-center">
                You'll be asked to sign in first so we can link your purchase to your account.
              </p>
            )}
            <p className="text-xs text-[rgba(255,255,255,0.45)] mt-4">
              AI software subscription and usage fees are billed separately by the provider.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-4">What's included</h2>
            <ul className="space-y-3">
              {included.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-[rgba(255,255,255,0.75)]">
                  <span className="text-gradient font-bold">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Who it's for</h2>
          <p className="text-[rgba(255,255,255,0.6)] mb-10">
            Plumbers, electricians, HVAC contractors, renovation companies, and other home service
            businesses.
          </p>
          <blockquote className="glass-card p-8 text-lg italic text-[rgba(255,255,255,0.8)]">
            “While you're busy on a job, your next customer could be calling someone else. ClickAd
            Media sets up an AI receptionist that answers calls, captures job details, and helps
            you stop missing potential business. You focus on the work. Your receptionist handles
            the calls.”
          </blockquote>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-4 pt-10">
            <div className="bg-white rounded-lg w-full max-w-2xl relative">
              <button
                onClick={closeCheckout}
                className="absolute -top-10 right-0 text-white text-sm hover:underline"
              >
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
