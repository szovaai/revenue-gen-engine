import { Quote } from "lucide-react";

export function Founder() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--glow-purple),transparent_60%)] blur-2xl"
          />
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <div className="flex-none">
              <div
                aria-hidden
                className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground shadow-[0_0_40px_var(--glow-blue)]"
              >
                JS
              </div>
            </div>
            <div className="flex-1">
              <Quote className="h-8 w-8 text-primary/60" aria-hidden />
              <blockquote
                id="founder-heading"
                className="mt-3 text-xl font-medium leading-relaxed text-foreground sm:text-2xl"
              >
                "Contractors don't need a $5k web design project. They need a clean,
                conversion-focused Revenue Engine that captures leads and follows up fast.
                That's why we productized the build into a simple, one-time $500 setup."
              </blockquote>
              <footer className="mt-6">
                <p className="text-base font-semibold text-foreground">Jason R. Szova</p>
                <p className="text-sm text-muted-foreground">Founder · ClickAdMedia</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
