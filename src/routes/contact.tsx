import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { Mail, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | ClickAdMedia" },
      {
        name: "description",
        content:
          "Get in touch with ClickAdMedia. Email, call, or book a strategy session to grow your business.",
      },
      { property: "og:title", content: "Contact ClickAdMedia" },
      {
        property: "og:description",
        content: "Reach the team behind the websites that convert.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <section className="relative pt-36 pb-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Contact
          </span>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Let's <span className="text-gradient-brand">talk growth.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            The fastest way to reach us is to book a strategy call. Otherwise, drop us a line.
          </p>

          <div className="mx-auto mt-10 grid max-w-xl gap-3 text-left">
            <a
              href="mailto:hello@clickadmedia.co"
              className="glass-card flex items-center gap-4 rounded-xl p-5 transition-all hover:border-primary/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">hello@clickadmedia.co</p>
              </div>
            </a>
            <a
              href="tel:+10000000000"
              className="glass-card flex items-center gap-4 rounded-xl p-5 transition-all hover:border-primary/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">Mon–Fri, 9am–6pm ET</p>
              </div>
            </a>
          </div>

          <div className="mt-10">
            <Link
              to="/strategy-call"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px]"
            >
              Book A Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
