import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <section className="pt-32 pb-20 px-6 min-h-dvh">
        <div className="max-w-[640px] mx-auto text-center text-[rgba(255,255,255,0.55)]">Loading…</div>
      </section>
    );
  }

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

        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] p-6 bg-[rgba(255,255,255,0.02)]">
          <h2 className="text-xl font-bold mb-4">Your plan</h2>
          {subLoading ? (
            <div className="text-sm text-[rgba(255,255,255,0.55)]">Loading…</div>
          ) : subscription ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{PRODUCT_NAMES[subscription.product_id] ?? subscription.product_id}</div>
                  <div className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.5)]">
                    Status: {subscription.status}
                    {subscription.cancel_at_period_end && " · cancels at period end"}
                  </div>
                </div>
                {subscription.current_period_end && (
                  <div className="text-sm text-[rgba(255,255,255,0.65)]">
                    Renews {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <Link to="/book-a-call" className="text-sm text-[#00c6ff] underline">Book a strategy call →</Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[rgba(255,255,255,0.65)] mb-4">You don&apos;t have an active plan yet.</p>
              <Link to="/pricing" className="btn-primary">See pricing →</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
