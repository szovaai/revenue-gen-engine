import { Link } from "@tanstack/react-router";

export function OwnershipBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-[rgba(57,120,246,0.4)] bg-[rgba(57,120,246,0.1)] px-3 py-1 text-xs font-semibold text-[#9db9ff] ${className}`}>
      🔒 Website Ownership Guaranteed
    </span>
  );
}

export function OwnItBlock() {
  return (
    <div className="max-w-[900px] mx-auto glass-card p-8 text-center">
      <OwnershipBadge className="mb-4" />
      <h2 className="text-2xl font-extrabold mb-3">You Own It. We Manage It.</h2>
      <p className="text-[rgba(255,255,255,0.62)]">
        Your website is your investment. You own the completed website, and we take care of the technical details. If you ever choose to leave, your website goes with you.
      </p>
    </div>
  );
}

const POINTS = [
  { t: "100% Website Ownership", d: "Your completed website belongs to you after payment." },
  { t: "Fully Managed Website Care", d: "We take care of hosting, maintenance, and minor updates." },
  { t: "No Vendor Lock-In", d: "You're free to move your website whenever you choose." },
];

export function OwnershipSection() {
  return (
    <section className="px-6 py-20 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="max-w-[760px] mb-10">
          <span className="section-label">Why Choose ClickAdMedia?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] mb-4">Your Website. Your Business. Your Ownership.</h2>
          <p className="text-[rgba(255,255,255,0.62)]">
            Your website should belong to you — not your web designer. Once it's paid in full, you receive full ownership of your completed website. We handle the hosting, maintenance, and technical support so you can focus on running your business. And if you ever decide to leave, we'll provide your website's source files so you can move to another hosting provider.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {POINTS.map((p) => (
            <div key={p.t} className="glass-card p-7">
              <div className="text-[#3978F6] text-xl mb-2">✓</div>
              <h3 className="font-bold text-lg mb-2">{p.t}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.6)]">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[rgba(255,255,255,0.45)] mb-6">No vendor lock-in. Subject to any disclosed third-party licensing terms.</p>
        <Link to="/contact" className="btn-primary">Get my free website preview →</Link>
      </div>
    </section>
  );
}
