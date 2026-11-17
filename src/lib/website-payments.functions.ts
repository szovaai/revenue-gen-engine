import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { findPrivateWebsitePackage } from "@/lib/private-website-packages";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

export const createWebsitePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { packageId: string; environment: StripeEnv; origin: string }) => {
    if (!findPrivateWebsitePackage(data.packageId)) throw new Error("Unknown website package");
    if (data.environment !== "sandbox" && data.environment !== "live") throw new Error("Invalid payment environment");
    const url = new URL(data.origin);
    if (url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "localhost")) throw new Error("Invalid return address");
    return { ...data, origin: url.origin };
  })
  .handler(async ({ data, context }) => {
    try {
      const { createCheckoutSession } = await import("@/lib/payments.functions");
      const selected = findPrivateWebsitePackage(data.packageId);
      if (!selected) return { error: "Unknown website package" };
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({ lookup_keys: [selected.priceId], active: true });
      const price = prices.data[0];
      if (!price || price.currency !== "cad" || price.unit_amount !== selected.amountCad * 100 || price.type !== "one_time") {
        return { error: "This website package price is not configured correctly. Please contact support@jasonrszova.com." };
      }
      // Reuse the customer resolver and tax calculation from the existing checkout.
      return await createCheckoutSession({ data: {
        priceId: selected.priceId,
        quantity: 1,
        customerEmail: typeof context.claims.email === "string" ? context.claims.email : undefined,
        userId: context.userId,
        environment: data.environment,
        returnUrl: `${data.origin}/website-payment?session_id={CHECKOUT_SESSION_ID}`,
      } });
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const checkWebsitePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId)) throw new Error("Invalid payment reference");
    if (data.environment !== "sandbox" && data.environment !== "live") throw new Error("Invalid payment environment");
    return data;
  })
  .handler(async ({ data, context }) => {
    try {
      const stripe = createStripeClient(data.environment);
      const session = await stripe.checkout.sessions.retrieve(data.sessionId);
      if (session.metadata?.userId !== context.userId) return { error: "This payment belongs to another account." };
      return { paid: session.payment_status === "paid", status: session.status };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });