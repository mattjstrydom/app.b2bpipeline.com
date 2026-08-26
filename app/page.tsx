import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-white text-ink">
      {/* NAV */}
      <header className="max-w-content mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight">b2bpipeline</span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#features" className="hover:text-ink">Features</a>
          <a href="#how" className="hover:text-ink">How it works</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
          <a href="#pricing" className="hover:text-ink">Pricing</a>
        </nav>
        <Link href="/login" className="btn-primary text-sm px-4 py-2">
          Start free
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-content mx-auto px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">PRM-lite for real partner teams</p>
            <h1 className="display text-5xl md:text-6xl font-bold mb-6">
              Partner deals, tracked without the $30k PRM.
            </h1>
            <p className="text-lg text-muted mb-8">
              One pipeline your partners actually use. See every referral, stage,
              and commission in real time, no logins to chase and no spreadsheet
              reconciliation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="btn-gradient text-lg px-6 py-3">
                Create your free workspace
              </Link>
              <a href="#how" className="btn-secondary text-lg px-6 py-3">
                See how it works
              </a>
            </div>
          </div>

          {/* HERO VISUAL: app composite with partner cards + status pills */}
          <div className="relative">
            <div className="card p-4 shadow-elevated">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Partner pipeline</span>
                <span className="chip-accent">Live</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center mb-3">
                {[
                  ["Registered", "6", "bg-surface"],
                  ["Qualifying", "4", "bg-surface"],
                  ["Negotiation", "3", "bg-surface"],
                  ["Won", "9", "bg-brand-50"],
                ].map(([s, n, bg]) => (
                  <div key={s} className={`${bg} rounded-lg p-2`}>
                    <p className="text-lg font-bold">{n}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted">{s}</p>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-line">
                {[
                  ["AR", "Acme Reseller", "Enterprise deal", "$12,000", "Won", "pos"],
                  ["NW", "Northwind", "Pilot expansion", "$4,500", "Negotiation", "warn"],
                  ["GL", "Globex", "New intro", "$2,200", "Qualifying", "muted"],
                ].map(([ini, p, d, v, st, tone]) => (
                  <div key={p} className="flex items-center gap-3 py-2.5">
                    <div className="w-8 h-8 rounded-md bg-brand-50 text-brand-700 font-semibold text-xs flex items-center justify-center shrink-0">
                      {ini}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{d}</p>
                      <p className="text-xs text-muted truncate">{p}</p>
                    </div>
                    <p className="mono text-sm font-semibold shrink-0">{v}</p>
                    <span className={`pill pill-${tone} shrink-0`}>
                      <span className="pill-dot" />{st}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* floating toast (extruct-style overlay) */}
            <div className="glass-card absolute -top-4 -left-4 px-3 py-2 text-sm font-semibold hidden sm:block">
              💸 $1,250 commission paid
            </div>
            <div className="glass-card absolute -bottom-4 -right-4 px-3 py-2 text-sm font-semibold hidden sm:block">
              0 spreadsheets · 100% synced
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-content mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat value="0" label="spreadsheets to reconcile partner deals" />
          <Stat value="< 10 min" label="to set up your first partner pipeline" />
          <Stat value="3" label="simple plans: Free · Starter · Growth" />
          <Stat value="1" label="place to see every partner deal & referral" />
        </div>
      </section>

      {/* FEATURE 1 — split, text left / board right */}
      <section id="features" className="max-w-content mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">One pipeline for every partner motion</p>
            <h2 className="display text-4xl font-bold mb-4">
              Partners, resellers, and agencies in one view.
            </h2>
            <p className="text-lg text-muted mb-6">
              Stop stitching partner deals across inboxes and tabs. Every
              relationship lives on one board with a clear stage, owner, and
              forecast amount.
            </p>
            <ul className="space-y-3 text-sm text-muted">
              {[
                "Tag deals by partner, source, and tier",
                "Live stage counters on every column",
                "Owner avatars so nothing falls through",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold mt-0.5">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-4 shadow-card">
            <p className="text-xs uppercase tracking-wide text-muted mb-3">Board</p>
            <div className="space-y-2">
              {[
                ["Qualified", "Acme · Co-marketing", "2"],
                ["In play", "Northwind · Referral", "1"],
                ["Won", "Globex · Reseller", "4"],
              ].map(([col, tag, n]) => (
                <div key={col} className="bg-surface rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{col}</span>
                    <span className="text-xs text-muted">{n}</span>
                  </div>
                  <span className="pill pill-muted">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — split, board left / text right */}
      <section className="max-w-content mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="card p-4 shadow-card order-2 lg:order-1">
            <p className="text-xs uppercase tracking-wide text-muted mb-3">Deal list</p>
            <div className="divide-y divide-line">
              {[
                ["Acme Reseller", "Q4 Enterprise Seats", "$12,000", "Won"],
                ["Northwind", "Pilot expansion", "$4,500", "Negotiation"],
                ["Globex", "New intro", "$2,200", "Qualifying"],
              ].map(([p, d, v, st]) => (
                <div key={p} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm font-medium">{d}</p>
                    <p className="text-xs text-muted">{p}</p>
                  </div>
                  <div className="text-right">
                    <p className="mono text-sm font-semibold">{v}</p>
                    <p className="text-[10px] uppercase text-muted">{st}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4">Attribution that holds up</p>
            <h2 className="display text-4xl font-bold mb-4">
              Every deal tagged to who brought it.
            </h2>
            <p className="text-lg text-muted mb-6">
              Set a commission rate per partner once. When a deal lands in Won,
              the payout calculates itself and exports cleanly for finance. No
              manual math, no lost intro credit.
            </p>
            <ul className="space-y-3 text-sm text-muted">
              {[
                "Per-partner commission rules, auto-applied",
                "Referral log attached to the deal it became",
                "One-click CSV export for payouts",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold mt-0.5">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DARK INTEGRATION BAND */}
      <section className="bg-dark text-white">
        <div className="max-w-content mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4" style={{ color: "#a5b4fc" }}>
                Plug into your revenue stack
              </p>
              <h2 className="display text-4xl font-bold mb-4">
                Works with the tools you already run.
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                b2bpipeline sits on Supabase, Stripe, and n8n. Deals sync,
                commissions flow to payouts, and webhooks keep your CRM in step.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Supabase", "Stripe", "n8n", "CSV", "HubSpot (planned)"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full border border-dark-line text-sm text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="code-block">
              <span className="code-punc">{"{"}</span>
              <br />
              &nbsp;&nbsp;<span className="code-key">"event"</span><span className="code-punc">:</span> <span className="code-str">"deal.won"</span><span className="code-punc">,</span>
              <br />
              &nbsp;&nbsp;<span className="code-key">"trigger"</span><span className="code-punc">:</span> <span className="code-str">"n8n_workflow"</span><span className="code-punc">,</span>
              <br />
              &nbsp;&nbsp;<span className="code-key">"db_sync"</span><span className="code-punc">:</span> <span className="code-str">"supabase.partners"</span><span className="code-punc">,</span>
              <br />
              &nbsp;&nbsp;<span className="code-key">"payout"</span><span className="code-punc">:</span> <span className="code-str">"stripe.connect.transfer"</span><span className="code-punc">,</span>
              <br />
              &nbsp;&nbsp;<span className="code-key">"amount"</span><span className="code-punc">:</span> <span className="code-str">1250.00</span>
              <br />
              <span className="code-punc">{"}"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL (honest, no fake logos) */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="eyebrow mb-6">Why teams switch</p>
        <blockquote className="display text-2xl md:text-3xl font-bold leading-snug mb-6">
          &ldquo;We talked to 40 partner managers. Same answer: enterprise PRMs
          are overkill, and spreadsheets are chaos. b2bpipeline is the middle
          path.&rdquo;
        </blockquote>
        <p className="text-sm text-muted">
          Built by operators who have run partner programs.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-surface border-y border-line">
        <div className="max-w-content mx-auto px-6 py-20">
          <h2 className="display text-3xl font-bold mb-12 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Step n="01" title="Set up your pipeline"
              desc="Create your stages: Registered, Qualifying, Negotiation, Won/Lost, and invite your team." />
            <Step n="02" title="Add partners and deals"
              desc="Add partners to the directory, capture referrals, and move deals across the board." />
            <Step n="03" title="Win deals, pay fairly"
              desc="When deals close, commissions calculate and payouts are ready to export." />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-content mx-auto px-6 py-20">
        <h2 className="display text-3xl font-bold mb-10 text-center">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <PriceCard name="Free" price="$0" desc="3 partners · 10 deals · 1 user" />
          <PriceCard name="Starter" price="$49/mo" desc="25 partners · unlimited deals · email alerts" feat />
          <PriceCard name="Growth" price="$199/mo" desc="unlimited partners · Slack + CSV import · multi-user" />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-surface border-y border-line">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="display text-3xl font-bold mb-10 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            <Faq q="Can't I just track partner deals in my CRM like HubSpot?"
              a="You can bolt it on if you're already on HubSpot Enterprise with ops bandwidth, but commission math, payout exports, and partner portals are separate paid add-ons there. Most SMBs tracking partners in a spreadsheet do it because HubSpot's partner features are either absent or enterprise-priced. We're the purpose-built $49/mo alternative, live in a day, no admin." />
            <Faq q="How is b2bpipeline different from a full PRM?"
              a="PRM-lite: essentials only, no $30k contracts, focused on pipeline + commissions for small teams." />
            <Faq q="Who is b2bpipeline for?"
              a="Small B2B teams with a growing set of partners, agencies, or resellers, anyone still reconciling partner deals in a spreadsheet." />
            <Faq q="What happens when a deal is marked Won?"
              a="Commissions are calculated from your per-partner rules and made available in the payout CSV export. No manual math." />
            <Faq q="What integrations do you support?"
              a="Runs on Supabase, Stripe, and n8n. CSV exports today; HubSpot and other CRM sync are on the roadmap." />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA — gradient footer (extruct-style) */}
      <section className="bg-gradient-to-r from-brand-600 to-violet-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="display text-4xl font-bold mb-4">
            Ready to see your partner pipeline like a real forecast?
          </h2>
          <p className="text-lg text-blue-50 mb-8">
            Start free in minutes. Upgrade only when your partners demand it.
          </p>
          <Link href="/signup"
            className="inline-block bg-white text-brand-700 font-semibold px-6 py-3 rounded-pill hover:bg-blue-50 transition">
            Create your free workspace
          </Link>
        </div>
      </section>

      <footer className="text-center text-sm text-muted py-8">
        © {new Date().getFullYear()} b2bpipeline.com
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold text-ink">{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted mt-2">{label}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-brand-600 mb-3">{n}</p>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-line pb-4">
      <h3 className="font-semibold mb-1">{q}</h3>
      <p className="text-sm text-muted">{a}</p>
    </div>
  );
}

function PriceCard({ name, price, desc, feat }: {
  name: string; price: string; desc: string; feat?: boolean;
}) {
  return (
    <div className={`card text-center ${feat ? "ring-2 ring-brand-500" : ""}`}>
      {feat && <p className="text-xs font-semibold text-brand-600 mb-1">Most popular</p>}
      <h3 className="font-semibold">{name}</h3>
      <p className="text-3xl font-bold my-2">{price}</p>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  );
}
