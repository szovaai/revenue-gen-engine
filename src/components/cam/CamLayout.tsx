import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { camLogo } from "@/lib/cam-assets";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/use-auth";

export function CamLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: "Portfolio", to: "/portfolio" },
    { label: "Pricing", to: "/pricing" },
    { label: "Process", to: "/process" },
    { label: "Book a Call", to: "/book-a-call" },
  ] as const;

  const serviceItems = [
    { label: "Website Design", desc: "$500 flat, 48 hours", to: "/services/website-design" },
    { label: "SEO", desc: "Rank in local search", to: "/services/seo" },
    { label: "Paid Ads", desc: "Google + Facebook", to: "/services/paid-ads" },
    { label: "All Services", desc: "See everything", to: "/services" },
  ] as const;

  return (
    <div className="cam-root relative min-h-screen flex flex-col">
      <PaymentTestModeBanner />
      <nav className="fixed top-0 left-0 right-0 z-50 h-[84px] md:h-[100px] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6">
          <Link to="/" className="relative z-10">
            <img src={camLogo} alt="ClickAdMedia" className="h-[72px] md:h-[88px] w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                  location.pathname.startsWith("/services")
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services{" "}
                <span className={`text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}>
                  &#9662;
                </span>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50">
                  <div
                    className="bg-white shadow-2xl border border-gray-200 p-2 space-y-1"
                    style={{ borderRadius: "var(--cam-radius-card)" }}
                  >
                    {serviceItems.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className={`flex flex-col px-3 py-2.5 rounded-lg transition-colors ${
                          isActive(s.to) ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-900">{s.label}</span>
                        <span className="text-[11px] text-gray-500">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(l.to) ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to={user ? "/dashboard" : "/auth"}
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") || isActive("/auth") ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {user ? "Account" : "Sign in"}
            </Link>
            <Link to="/book-a-call" className="cam-btn-primary text-xs !py-3 !px-5">
              Get Free Preview &#8594;
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span className={`w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden fixed top-[84px] left-0 right-0 bottom-0 z-40 bg-white">
            <div className="flex flex-col items-center gap-6 pt-10">
              <Link
                to="/services"
                className="text-lg text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
              {serviceItems.slice(0, 3).map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="text-sm text-gray-500"
                  onClick={() => setMenuOpen(false)}
                >
                  - {s.label}
                </Link>
              ))}
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-lg text-gray-900 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/book-a-call"
                className="cam-btn-primary mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Get Free Preview &#8594;
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 pt-[84px] md:pt-[100px]">
        <Outlet />
      </main>

      <footer className="relative py-14 px-6 bg-white border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center mb-8">
            <nav className="flex flex-wrap justify-center gap-6 mb-4">
              {(
                [
                  { label: "Services", to: "/services" },
                  { label: "Portfolio", to: "/portfolio" },
                  { label: "Pricing", to: "/pricing" },
                  { label: "Process", to: "/process" },
                  { label: "Book a Call", to: "/book-a-call" },
                ] as const
              ).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-wrap justify-center gap-6 mb-4">
              {(
                [
                  { label: "Privacy", to: "/privacy" },
                  { label: "Terms", to: "/terms" },
                  { label: "Refund Policy", to: "/refund-policy" },
                ] as const
              ).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="text-center text-xs text-gray-400 tracking-wider">
            &copy; 2026 ClickAdMedia &middot; Jason R Szova Consulting &middot; Website Design, SEO &amp; Paid Ads for Contractors
          </div>

        </div>
      </footer>
    </div>
  );
}
