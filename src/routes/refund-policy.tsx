import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — ClickAdMedia" },
      { name: "description", content: "30-day money-back guarantee on purchases from Jason R Szova Consulting (ClickAdMedia)." },
      { property: "og:title", content: "Refund Policy — ClickAdMedia" },
      { property: "og:description", content: "30-day money-back guarantee on purchases from Jason R Szova Consulting (ClickAdMedia)." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: January 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          <strong>Jason R Szova Consulting</strong> (trading as ClickAdMedia) wants you to be happy
          with your purchase. We offer a <strong>30-day money-back guarantee</strong> on all plans.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How long you have</h2>
          <p>
            If you are not satisfied with your purchase, you can request a full refund within
            <strong> 30 days</strong> of the original order date for one-time purchases, or within
            30 days of the most recent renewal date for subscriptions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How to request a refund</h2>
          <p>
            All payments are processed by our Merchant of Record, <strong>Paddle</strong>. To
            request a refund:
          </p>
          <ol className="list-decimal pl-6 space-y-1 mt-2">
            <li>
              Visit{" "}
              <a className="text-blue-600 underline" href="https://paddle.net" target="_blank" rel="noreferrer">
                paddle.net
              </a>{" "}
              and locate your order using the email address you used at checkout, or
            </li>
            <li>
              Email us at{" "}
              <a className="text-blue-600 underline" href="mailto:hello@clickadmedia.co">
                hello@clickadmedia.co
              </a>{" "}
              with your order number and we will help you through the process.
            </li>
          </ol>
          <p className="mt-2">
            Refunds are returned to your original payment method by Paddle. Processing times depend
            on your bank or card issuer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Subscription cancellations</h2>
          <p>
            You can cancel a subscription at any time. After cancellation you keep access to paid
            features until the end of the current billing period; we do not pro-rate partial periods
            outside of the 30-day refund window above.
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-4">
          See also our <Link to="/terms" className="text-blue-600 underline">Terms &amp; Conditions</Link>{" "}
          and <Link to="/privacy" className="text-blue-600 underline">Privacy Notice</Link>.
        </p>
      </div>
    </div>
  );
}
