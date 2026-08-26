"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-bold text-xl tracking-tight">b2bpipeline</span>
        </div>
        <div className="card shadow-card">
          <h1 className="text-xl font-bold mb-6 text-center text-ink">
            {mode === "login" ? "Sign in" : "Create your workspace"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="input"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-danger text-sm">{error}</p>}
            <button className="btn-gradient w-full" disabled={loading}>
              {loading ? "..." : mode === "login" ? "Sign in" : "Sign up"}
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-muted">
            {mode === "login" ? (
              <>
                No account?{" "}
                <button className="text-brand-600 font-semibold" onClick={() => setMode("signup")}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button className="text-brand-600 font-semibold" onClick={() => setMode("login")}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
