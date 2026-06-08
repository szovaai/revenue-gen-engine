import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" aria-label="ClickAdMedia home">
              <img src={logoAsset.url} alt="" className="h-9 w-9 rounded-md object-cover" />
              <span className="text-sm font-semibold tracking-tight">
                Click<span className="text-accent">Ad</span>Media
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Revenue Engines for contractors. Lead-gen websites plus automated follow-up
              systems — built for a one-time $500 setup.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/website-examples" className="text-foreground/80 hover:text-foreground">
                  Website Examples
                </Link>
              </li>
              <li>
                <Link to="/free-audit" className="text-foreground/80 hover:text-foreground">
                  Free Audit
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/80 hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Get Started
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/apply" className="text-foreground/80 hover:text-foreground">
                  Apply for the $500 Setup
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ClickAdMedia. All rights reserved.</p>
          <p>Websites That Convert.</p>
        </div>
      </div>
    </footer>
  );
}
