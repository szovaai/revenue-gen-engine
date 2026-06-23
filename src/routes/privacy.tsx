import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — ClickAdMedia" },
      { name: "description", content: "How Jason R Szova Consulting (ClickAdMedia) collects, uses, and protects your personal data." },
      { property: "og:title", content: "Privacy Notice — ClickAdMedia" },
      { property: "og:description", content: "How Jason R Szova Consulting (ClickAdMedia) collects, uses, and protects your personal data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Privacy Notice</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: January 2026</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who we are</h2>
          <p>
            This Privacy Notice is issued by <strong>Jason R Szova Consulting</strong> (trading as
            ClickAdMedia) ("we", "us", "our"). We act as the data controller for the personal data
            described below. You can reach us at{" "}
            <a className="text-blue-600 underline" href="mailto:hello@clickadmedia.co">
              hello@clickadmedia.co
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Personal data we collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Account data:</strong> name, email address, password (hashed), authentication identifiers.</li>
            <li><strong>Project &amp; communication data:</strong> messages, booking details, content you share with us to deliver services.</li>
            <li><strong>Usage data:</strong> pages visited, device type, browser, IP address, approximate location, referring URL.</li>
            <li><strong>Cookies &amp; similar technologies:</strong> session cookies, authentication tokens, and analytics identifiers.</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600">
            Payment card details are collected and processed by our payment provider (Paddle) and
            are never stored on our systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Purposes and legal basis</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Provide the service</strong> (account creation, project delivery) — performance of a contract.</li>
            <li><strong>Process payments &amp; subscriptions</strong> via Paddle — performance of a contract / legal obligation.</li>
            <li><strong>Customer support</strong> — performance of a contract / legitimate interests.</li>
            <li><strong>Security &amp; fraud prevention</strong> — legitimate interests and legal obligations.</li>
            <li><strong>Service improvement &amp; analytics</strong> — legitimate interests.</li>
            <li><strong>Marketing communications</strong> — consent (you can withdraw at any time).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Who we share data with</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Paddle.com Market Ltd.</strong> — Merchant of Record for all orders. Paddle handles payment, billing, tax, invoicing, subscription management, and refund processing.</li>
            <li><strong>Hosting &amp; infrastructure providers</strong> that operate our application and database.</li>
            <li><strong>Analytics &amp; support tooling</strong> used to operate and improve the service.</li>
            <li><strong>Professional advisers</strong> (legal, accounting) where reasonably necessary.</li>
            <li><strong>Authorities</strong> where required by law or to protect our rights.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. International transfers</h2>
          <p>
            Some of our service providers are located outside your country of residence. Where data
            is transferred internationally, we rely on appropriate safeguards such as Standard
            Contractual Clauses or adequacy decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data retention</h2>
          <p>
            We retain personal data only for as long as is necessary to provide the service, comply
            with our legal obligations (including tax and accounting), resolve disputes, and enforce
            our agreements. When data is no longer needed it is deleted or anonymised.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your rights</h2>
          <p>
            Subject to applicable law, you may have the right to access, rectify, erase, restrict or
            object to the processing of your personal data, request portability, withdraw consent,
            and lodge a complaint with your local data protection authority. To exercise these
            rights, contact us at{" "}
            <a className="text-blue-600 underline" href="mailto:hello@clickadmedia.co">
              hello@clickadmedia.co
            </a>
            . We aim to respond within one month.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Security</h2>
          <p>
            We use appropriate technical and organisational measures including encryption in transit,
            access controls, and role-based permissions to protect personal data against
            unauthorised access, loss, or alteration.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Cookies</h2>
          <p>
            We use essential cookies required to authenticate you and operate the service, and
            limited analytics cookies to understand site usage. You can control cookies through your
            browser settings; disabling essential cookies may prevent the service from working.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to this notice</h2>
          <p>
            We may update this Privacy Notice from time to time. Material changes will be
            communicated through the service or by email where appropriate.
          </p>
        </section>

        <p className="pt-6 text-sm text-gray-500">
          See also our <Link to="/terms" className="text-blue-600 underline">Terms &amp; Conditions</Link>{" "}
          and <Link to="/refund-policy" className="text-blue-600 underline">Refund Policy</Link>.
        </p>
      </div>
    </div>
  );
}
