import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { createPortalSession } from "@/lib/payments.functions";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ClickAdMedia" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const PRODUCT_NAMES: Record<string, string> = {
  starter_site: "Starter Website",
  growth_plan: "Growth Plan",
  dominate_plan: "Dominate Plan",
};

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: subscription, isLoading: subLoading } = useSubscription();
  const [portalError, setPortalError] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const openPortal = useServerFn(createPortalSession);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const { data: purchases } = useQuery({
    queryKey: ["purchases", user?.id, getStripeEnvironment()],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", user!.id)
        .eq("environment", getStripeEnvironment())
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (loading || !user) {
    return (
      <section className="pt-32 pb-20 px-6 min-h-dvh">
        <div className="max-w-[640px] mx-auto text-center text-[rgba(255,255,255,0.55)]">Loading…</div>
      </section>
    );
  }

  const handleManageBilling = async () => {
    setPortalError(null);
    setPortalLoading(true);
    try {
      const result = await openPortal({
        data: { returnUrl: window.location.href, environment: getStripeEnvironment() },
      });
      if ("error" in result) throw new Error(result.error);
      window.open(result.url, "_blank");
    } catch (e) {
      setPortalError(e instanceof Error ? e.message : "Could not open billing portal");
    } finally {
      setPortalLoading(false);
    }
  };

  const hasAnyAccess = !!subscription || (purchases && purchases.length > 0);

  return (
    <section className="pt-32 pb-20 px-6 min-h-dvh">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="section-label">Your account</span>
            <h1 className="text-3xl font-extrabold tracking-[-0.02em]">Welcome back</h1>
            <p className="text-sm text-[rgba(255,255,255,0.55)] mt-1">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/" });
            }}
            className="btn-secondary text-sm"
          >
            Sign out
          </button>
        </div>

        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] p-6 bg-[rgba(255,255,255,0.02)] mb-6">
          <h2 className="text-xl font-bold mb-4">Your plan</h2>
          {subLoading ? (
            <div className="text-sm text-[rgba(255,255,255,0.55)]">Loading…</div>
          ) : subscription ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{PRODUCT_NAMES[subscription.price_id] ?? PRODUCT_NAMES[subscription.product_id] ?? subscription.price_id}</div>
                  <div className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.5)]">
                    Status: {subscription.status}
                    {subscription.cancel_at_period_end && " · cancels at period end"}
                  </div>
                </div>
                {subscription.current_period_end && (
                  <div className="text-sm text-[rgba(255,255,255,0.65)]">
                    {subscription.cancel_at_period_end ? "Ends" : "Renews"}{" "}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <button onClick={handleManageBilling} disabled={portalLoading} className="btn-secondary text-sm">
                  {portalLoading ? "Opening…" : "Manage billing / change plan"}
                </button>
                <Link to="/book-a-call" className="btn-primary text-sm">Book a strategy call →</Link>
              </div>
              {portalError && <p className="text-xs text-red-400">{portalError}</p>}
            </div>
          ) : !hasAnyAccess ? (
            <div>
              <p className="text-[rgba(255,255,255,0.65)] mb-4">You don&apos;t have an active plan yet.</p>
              <Link to="/pricing" className="btn-primary">See pricing →</Link>
            </div>
          ) : null}
        </div>

        {purchases && purchases.length > 0 && (
          <div className="rounded-xl border border-[rgba(255,255,255,0.1)] p-6 bg-[rgba(255,255,255,0.02)] mb-6">
            <h2 className="text-xl font-bold mb-4">Your purchases</h2>
            <ul className="divide-y divide-[rgba(255,255,255,0.08)]">
              {purchases.map((p) => (
                <li key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{PRODUCT_NAMES[p.price_id] ?? p.price_id}</div>
                    <div className="text-xs text-[rgba(255,255,255,0.5)]">
                      {new Date(p.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {p.amount_total != null && p.currency && (
                    <div className="text-sm text-[rgba(255,255,255,0.7)]">
                      {(p.amount_total / 100).toLocaleString(undefined, { style: "currency", currency: p.currency.toUpperCase() })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="pt-4 mt-2 border-t border-[rgba(255,255,255,0.08)]">
              <Link to="/book-a-call" className="text-sm text-[#00c6ff] underline">Schedule kickoff call →</Link>
            </div>
          </div>
        )}

        {hasAnyAccess && (
          <div className="rounded-xl border border-[rgba(255,255,255,0.1)] p-6 bg-[rgba(255,255,255,0.02)]">
            <h2 className="text-xl font-bold mb-2">What's next</h2>
            <p className="text-sm text-[rgba(255,255,255,0.7)]">
              Thanks for joining. Jason will reach out within 1 business day with onboarding next steps.
              In the meantime, book your kickoff call so we can hit the ground running.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
