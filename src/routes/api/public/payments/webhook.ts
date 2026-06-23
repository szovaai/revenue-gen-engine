import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { type StripeEnv, createStripeClient, verifyWebhook } from "@/lib/stripe.server";

let _supabase: ReturnType<typeof createClient<Database>> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _supabase;
}

const PRODUCT_LABELS: Record<string, string> = {
  starter_site: "Starter Site ($500 one-time)",
  growth_plan: "Growth Plan ($297/mo)",
  dominate_plan: "Dominate Plan ($997/mo)",
};

async function notifyOwnerAndCustomer(args: {
  customerEmail: string | null | undefined;
  priceId: string | null | undefined;
  amountTotal: number | null | undefined;
  currency: string | null | undefined;
  kind: "subscription" | "one_time";
  idempotencyKey: string;
}) {
  const { sendTransactionalEmail } = await import("@/lib/email/send.server");
  const productLabel =
    (args.priceId && PRODUCT_LABELS[args.priceId]) ?? args.priceId ?? "your purchase";
  const amountFormatted =
    args.amountTotal != null && args.currency
      ? (args.amountTotal / 100).toLocaleString(undefined, {
          style: "currency",
          currency: args.currency.toUpperCase(),
        })
      : undefined;
  const data = {
    customerEmail: args.customerEmail ?? undefined,
    productLabel,
    amountFormatted,
    kind: args.kind,
  };

  // Owner notification — recipient is fixed in the template (`to`).
  await sendTransactionalEmail({
    templateName: "new-customer-owner",
    templateData: data,
    idempotencyKey: `owner-${args.idempotencyKey}`,
  });

  // Customer welcome
  if (args.customerEmail) {
    await sendTransactionalEmail({
      templateName: "customer-welcome",
      recipientEmail: args.customerEmail,
      templateData: data,
      idempotencyKey: `welcome-${args.idempotencyKey}`,
    });
  }
}

async function handleSubscriptionCreated(subscription: any, env: StripeEnv) {
  const userId = subscription.metadata?.userId;
  if (!userId) {
    console.error("No userId in subscription metadata");
    return;
  }
  const item = subscription.items?.data?.[0];
  const priceId =
    item?.price?.lookup_key || item?.price?.metadata?.lovable_external_id || item?.price?.id;
  const productId = item?.price?.product;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  await getSupabase()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer,
        product_id: productId,
        price_id: priceId,
        status: subscription.status,
        current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
        current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
        environment: env,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "stripe_subscription_id" },
    );

  await notifyOwnerAndCustomer({
    customerEmail: subscription.customer_email ?? null,
    priceId,
    amountTotal: item?.price?.unit_amount ?? null,
    currency: item?.price?.currency ?? null,
    kind: "subscription",
  });
}

async function handleSubscriptionUpdated(subscription: any, env: StripeEnv) {
  const item = subscription.items?.data?.[0];
  const priceId =
    item?.price?.lookup_key || item?.price?.metadata?.lovable_external_id || item?.price?.id;
  const productId = item?.price?.product;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  await getSupabase()
    .from("subscriptions")
    .update({
      status: subscription.status,
      product_id: productId,
      price_id: priceId,
      current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)
    .eq("environment", env);
}

async function handleSubscriptionDeleted(subscription: any, env: StripeEnv) {
  // Cancel-at-period-end: status flips to 'canceled' but
  // has_active_subscription keeps access until current_period_end.
  await getSupabase()
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscription.id)
    .eq("environment", env);
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  // Subscriptions are written from customer.subscription.* — ignore here.
  if (session.mode !== "payment") return;

  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("checkout.session.completed without userId metadata");
    return;
  }

  // Resolve human-readable price id via line items.
  let priceId: string | null = null;
  let productId: string | null = null;
  try {
    const stripe = createStripeClient(env);
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
    const li = lineItems.data[0];
    priceId =
      li?.price?.lookup_key ||
      (li?.price?.metadata as Record<string, string> | undefined)?.lovable_external_id ||
      li?.price?.id ||
      null;
    productId =
      typeof li?.price?.product === "string"
        ? li.price.product
        : (li?.price?.product?.id ?? null);
  } catch (e) {
    console.error("Failed to fetch line items for session", session.id, e);
  }

  await getSupabase()
    .from("purchases")
    .upsert(
      {
        user_id: userId,
        stripe_checkout_session_id: session.id,
        stripe_customer_id: session.customer,
        stripe_payment_intent_id: session.payment_intent ?? null,
        product_id: productId ?? "unknown",
        price_id: priceId ?? "unknown",
        amount_total: session.amount_total ?? null,
        currency: session.currency ?? null,
        customer_email: session.customer_details?.email ?? session.customer_email ?? null,
        environment: env,
      },
      { onConflict: "stripe_checkout_session_id" },
    );

  await notifyOwnerAndCustomer({
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    priceId,
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
    kind: "one_time",
  });
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "customer.subscription.created":
      await handleSubscriptionCreated(event.data.object, env);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(event.data.object, env);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object, env);
      break;
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("Webhook received with invalid env:", rawEnv);
          return Response.json({ received: true, ignored: "invalid env" });
        }
        const env: StripeEnv = rawEnv;
        try {
          await handleWebhook(request, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
