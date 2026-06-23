import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ClickAdMedia" },
      { name: "description", content: "Terms governing your use of services provided by Jason R Szova Consulting (ClickAdMedia)." },
      { property: "og:title", content: "Terms & Conditions — ClickAdMedia" },
      { property: "og:description", content: "Terms governing your use of services provided by Jason R Szova Consulting (ClickAdMedia)." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: January 2026</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. The seller</h2>
          <p>
            These Terms &amp; Conditions ("Terms") are a binding agreement between you and{" "}
            <strong>Jason R Szova Consulting</strong> (trading as ClickAdMedia) ("we", "us", "our").
            By creating an account, purchasing a plan, or otherwise using our website design, SEO,
            and paid advertising services (the "Service"), you agree to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Acceptance &amp; authority</h2>
          <p>
            By continuing to use the Service, you confirm that you accept these Terms. If you are
            using the Service on behalf of an organisation, you confirm that you have authority to
            bind that organisation. If you are an individual, you confirm that you are of legal age
            to enter into a contract.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. The Service</h2>
          <p>
            The Service includes website design and build, search engine optimisation, and paid
            advertising management, offered as one-time and subscription plans. Specific
            deliverables for each plan are described on our pricing page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Accounts</h2>
          <p>
            You must provide accurate information, keep it up to date, and maintain the
            confidentiality of your account credentials. You are responsible for activity that
            occurs under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service in any unlawful, fraudulent, or harmful manner.</li>
            <li>Send spam, phishing, or unsolicited communications.</li>
            <li>Infringe the intellectual property or other rights of any third party.</li>
            <li>Probe, scan, scrape, or interfere with the security or integrity of the Service or upload malware.</li>
            <li>Reverse engineer, resell, or redistribute the Service or circumvent technical limits.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual property</h2>
          <p>
            We retain all right, title, and interest in and to the Service, including software,
            documentation, designs, and branding. Subject to these Terms, we grant you a limited,
            non-exclusive, non-transferable right to access and use the Service for your internal
            business purposes during your subscription term.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your content</h2>
          <p>
            You retain ownership of content you submit. You grant us a limited license to host,
            store, and process that content solely to provide and improve the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Payments, billing &amp; subscriptions</h2>
          <p>
            Our order process is conducted by our online reseller <strong>Paddle.com</strong>.
            Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer
            service inquiries and handles returns. Payment, billing, taxes, subscription renewal,
            cancellation, and refund mechanics are governed by{" "}
            <a className="text-blue-600 underline" href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noreferrer">
              Paddle's Buyer Terms
            </a>
            . Subscriptions renew automatically for successive billing periods until cancelled.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Refunds</h2>
          <p>
            Refund requests are handled in accordance with our{" "}
            <Link to="/refund-policy" className="text-blue-600 underline">Refund Policy</Link>{" "}
            and Paddle's refund process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Service level</h2>
          <p>
            We work hard to keep the Service available, but we do not guarantee uninterrupted or
            error-free performance. Scheduled maintenance, third-party outages, and events outside
            our reasonable control may affect availability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Warranties &amp; liability</h2>
          <p>
            To the fullest extent permitted by law, the Service is provided "as is" and we disclaim
            all implied warranties including merchantability and fitness for a particular purpose.
            Our aggregate liability to you arising out of or in connection with the Service is
            limited to the fees you paid to us in the twelve (12) months preceding the event giving
            rise to the claim. We are not liable for indirect, consequential, or special damages
            including loss of profits, data, or goodwill. Nothing in these Terms limits liability
            that cannot be limited under applicable law (such as fraud or personal injury caused by
            negligence).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Indemnity</h2>
          <p>
            You agree to indemnify and hold us harmless from any third-party claims arising from
            your content, your use of the Service in breach of these Terms, or your violation of
            applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Suspension &amp; termination</h2>
          <p>
            We may suspend or terminate your access if you materially breach these Terms, fail to
            pay amounts due, pose a security or fraud risk, or repeatedly violate our policies. On
            termination, your right to use the Service ends and we may delete account data after a
            reasonable export window.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Governing law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which Jason R Szova
            Consulting is established, without regard to its conflict of law principles. Disputes
            will be resolved in the competent courts of that jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Changes</h2>
          <p>
            We may update these Terms from time to time. Material changes will be notified through
            the Service or by email. Continued use after changes take effect constitutes acceptance.
          </p>
        </section>

        <p className="pt-6 text-sm text-gray-500">
          See also our <Link to="/privacy" className="text-blue-600 underline">Privacy Notice</Link>{" "}
          and <Link to="/refund-policy" className="text-blue-600 underline">Refund Policy</Link>.
        </p>
      </div>
    </div>
  );
}
