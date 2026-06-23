import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ClickAdMedia" },
      { name: "description", content: "Sign in or create your ClickAdMedia account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const onGoogle = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (result.error) {
      setError(result.error.message || "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/dashboard" },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 min-h-dvh">
      <div className="max-w-[420px] mx-auto">
        <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-center mb-2">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-center text-[rgba(255,255,255,0.55)] mb-8 text-sm">
          {mode === "signin" ? "Sign in to manage your plan." : "Sign up to get started with ClickAdMedia."}
        </p>

        <button
          type="button"
          onClick={onGoogle}
          className="w-full btn-secondary mb-4 flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-1 2.3-2.1 3v2.5h3.4c2-1.8 3.1-4.5 3.1-7.3z"/><path fill="#fff" opacity=".8" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.5c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.6C4.4 19.6 7.9 22 12 22z"/><path fill="#fff" opacity=".6" d="M6.2 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.2.3-1.7V7.7H2.7C2.2 8.9 2 10.4 2 12s.3 3.1.8 4.3l3.4-2.6z"/><path fill="#fff" opacity=".4" d="M12 5.9c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17.2 2.9 14.8 2 12 2 7.9 2 4.4 4.4 2.7 7.7l3.4 2.6C7 7.7 9.3 5.9 12 5.9z"/></svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs text-[rgba(255,255,255,0.4)]">or</span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#007bff]"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#007bff]"
          />
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button type="submit" disabled={busy} className="w-full btn-primary">
            {busy ? "..." : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[rgba(255,255,255,0.55)]">
          {mode === "signin" ? (
            <>New here? <button onClick={() => setMode("signup")} className="text-[#00c6ff] underline">Create an account</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("signin")} className="text-[#00c6ff] underline">Sign in</button></>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-[rgba(255,255,255,0.4)] hover:text-white">← Back to home</Link>
        </div>
      </div>
    </section>
  );
}
