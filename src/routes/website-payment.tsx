import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/use-auth";
import { PRIVATE_WEBSITE_PACKAGES, findPrivateWebsitePackage } from "@/lib/private-website-packages";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createWebsitePayment, checkWebsitePayment } from "@/lib/website-payments.functions";

export const Route = createFileRoute("/website-payment")({
  validateSearch: (search: Record<string, unknown>): { package?: string; session_id?: string } => ({
    package: findPrivateWebsitePackage(search.package)?.id,
    session_id: typeof search.session_id === "string" && /^cs_[a-zA-Z0-9_]+$/.test(search.session_id) ? search.session_id : undefined,
  }),
  head: () => ({ meta: [
    { title: "Website Project Payment | ClickAdMedia" },
    { name: "description", content: "Secure one-time payment for your approved ClickAdMedia website project." },
    { name: "robots", content: "noindex, nofollow, noarchive" },
    { property: "og:title", content: "Website Project Payment | ClickAdMedia" },
    { property: "og:description", content: "Complete payment for your approved website project." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: WebsitePaymentPage,
});

function WebsitePaymentPage() {
  const search = Route.useSearch();
  const { user, loading } = useAuth();
  const createPayment = useServerFn(createWebsitePayment);
  const checkPayment = useServerFn(checkWebsitePayment);
  const [selectedId, setSelectedId] = useState(search.package);
  const [clientSecret, setClientSecret] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [paymentState, setPaymentState] = useState<"checking" | "paid" | "pending">("checking");
  const selected = findPrivateWebsitePackage(selectedId);

  useEffect(() => {
    if (!search.session_id || !user) return;
    let active = true;
    async function verify() {
      try {
        const result = await checkPayment({ data: { sessionId: search.session_id ?? "", environment: getStripeEnvironment() } });
        if (!active) return;
        if ("error" in result) throw new Error(result.error);
        setPaymentState(result.paid ? "paid" : "pending");
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Unable to verify payment.");
      }
    }
    void verify();
    return () => { active = false; };
  }, [search.session_id, user, checkPayment]);

  async function pay() {
    if (!selected || !user) return;
    setError(undefined);
    setBusy(true);
    try {
      const result = await createPayment({ data: { packageId: selected.id, environment: getStripeEnvironment(), origin: window.location.origin } });
      if ("error" in result) throw new Error(result.error);
      if (!result.clientSecret) throw new Error("Stripe did not return a checkout form.");
      setClientSecret(result.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to open checkout.");
    } finally { setBusy(false); }
  }

  return (
    <>
    <div className="pt-4"><PaymentTestModeBanner /></div>
    <section className="px-5 py-16 md:py-24 text-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5"><ShieldCheck className="size-4 text-primary" /> ClickAdMedia · Client payments</div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Your website project.</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">Complete your one-time payment after approving your preview and project proposal. All prices are in Canadian dollars; applicable tax is calculated at checkout.</p>

        {search.session_id ? (
          <div className="border-y border-border py-10 space-y-5">
            <CheckCircle2 className="size-10 text-primary" />
            <h2 className="text-2xl font-bold">{paymentState === "paid" ? "Payment confirmed. Thank you!" : paymentState === "pending" ? "Your payment is not confirmed yet." : "Verifying your payment…"}</h2>
            {paymentState === "paid" && <><p className="text-muted-foreground">Let’s map out the next steps for your website.</p><Button asChild><Link to="/book-a-call">Book my onboarding call <ArrowRight /></Link></Button></>}
            {!user && !loading && <Button asChild><Link to="/auth" search={{ next: `/website-payment?session_id=${search.session_id}` }}>Sign in to view payment status</Link></Button>}
            {error && <p role="alert" className="text-destructive break-words">{error}</p>}
          </div>
        ) : clientSecret ? (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => { setClientSecret(undefined); setError(undefined); }}><ArrowLeft /> Back to packages</Button>
            <h2 className="text-2xl font-semibold">{selected?.name}</h2>
            <EmbeddedCheckoutProvider key={clientSecret} stripe={getStripe()} options={{ clientSecret }}><EmbeddedCheckout /></EmbeddedCheckoutProvider>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {PRIVATE_WEBSITE_PACKAGES.map((item) => (
                <article key={item.id} className={`rounded-lg border p-6 flex flex-col gap-4 ${selectedId === item.id ? "border-primary bg-card" : "border-border"}`}>
                  <CreditCard className="size-6 text-primary" />
                  <h2 className="text-xl font-bold min-h-14">{item.name}</h2>
                  <p className="text-3xl font-bold">${item.amountCad.toLocaleString("en-CA")} <span className="text-sm font-normal text-muted-foreground">CAD</span></p>
                  <p className="text-sm text-muted-foreground">One-time payment · plus applicable tax</p>
                  <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
                  <Button variant={selectedId === item.id ? "default" : "outline"} aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)}>{selectedId === item.id ? <><CheckCircle2 /> Selected</> : <>Select package <ArrowRight /></>}</Button>
                </article>
              ))}
            </div>
            <div className="border-t border-border pt-7 space-y-5">
              <p className="text-sm text-muted-foreground">You own your completed website once paid in full, subject to disclosed third-party licensing terms. Hosting, maintenance, and add-ons are separate unless included in your proposal.</p>
              {error && <p role="alert" className="text-destructive break-words">{error}</p>}
              {loading ? <p className="text-muted-foreground">Loading your account…</p> : user ? <Button size="lg" disabled={!selected || busy} onClick={pay}>{busy ? "Opening secure checkout…" : "Continue to secure payment"}<ArrowRight /></Button> : <Button asChild size="lg"><Link to="/auth" search={{ next: `/website-payment${selected ? `?package=${selected.id}` : ""}` }}>Sign in to pay securely <ArrowRight /></Link></Button>}
              <p className="text-xs text-muted-foreground">By paying, you agree to your approved proposal and our <Link className="underline" to="/terms">Terms</Link>. View our <Link className="underline" to="/refund-policy">Refund Policy</Link> and <Link className="underline" to="/privacy">Privacy Policy</Link>.</p>
            </div>
          </>
        )}
      </div>
    </section>
    </>
  );
}