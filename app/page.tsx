import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-900">
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
      <section className="max-w-content mx-auto px-6 pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">
              PRM-lite for real partner teams
            </p>
            <h1 className="display text-5xl md:text-6xl font-bold mb-6">
              The B2B pipeline<br />for your partners.
            </h1>
            <p className="text-xl text-muted mb-8">
              Track partner deals, referrals, and commissions in one shared pipeline, without a $30k/yr enterprise PRM.
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

          {/* HERO VISUAL: live product-UI render with floating value cards */}
          <div className="relative">
            <div className="card p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Partner pipeline</span>
                <span className="chip-accent">Live</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
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
              <div className="mt-3 space-y-2">
                {[
                  ["Acme Reseller", "Enterprise deal", "$12,000", "Won"],
                  ["Northwind", "Pilot expansion", "$4,500", "Negotiation"],
                  ["Globex", "New intro", "$2,200", "Qualifying"],
                ].map(([p, d, v, st]) => (
                  <div key={p} className="flex items-center justify-between bg-surface rounded-lg px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium">{d}</p>
                      <p className="text-xs text-muted">{p}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{v}</p>
                      <p className="text-[10px] uppercase text-muted">{st}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating glass cards (igloohome-style overlays) */}
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

      {/* TRUST STRIP */}
      <section className="border-b border-line">
        <div className="max-w-content mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Built on tools you already trust
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-muted grayscale opacity-80">
            <span>Supabase</span>
            <span>Stripe</span>
            <span>n8n</span>
            <span>Next.js</span>
            <span>CSV exports</span>
          </div>
        </div>
      </section>

      {/* CORE VALUE */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="eyebrow mb-4">
          Why b2bpipeline
        </p>
        <h2 className="display text-4xl font-bold mb-6">
          A partner pipeline<br />without the enterprise bloat.
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-6">
          Enterprise PRMs were built for thousands of partners and $30k contracts.
          b2bpipeline gives small GTM teams the essentials: Kanban pipeline,
          partner directory, referral tracking, and automatic commissions, at a
          price you can start today.
        </p>
        <Link href="#pricing" className="link-accent">
          See pricing →
        </Link>
      </section>

      {/* FEATURE CARDS */}
      <section id="features" className="max-w-content mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            title="Kanban partner pipeline"
            desc="One glance from Registered to Won/Lost. No more hidden deals in inboxes."
          />
          <Feature
            title="Referral tracking that sticks"
            desc="Log referrals once, keep every touchpoint and outcome on the same deal."
          />
          <Feature
            title="Auto-commissions on Won"
            desc="Set rules once. When a deal is marked Won, commissions are calculated and ready to export."
          />
          <Feature
            title="Payout-ready exports"
            desc="Download a clean CSV of owed commissions and push it into your finance tools."
          />
        </div>
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
              desc="Add partners to the directory, capture referrals, and move deals across the Kanban board." />
            <Step n="03" title="Win deals, pay fairly"
              desc="When deals close, b2bpipeline calculates commissions and prepares payouts you can trust." />
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-content mx-auto px-6 py-20">
        <h2 className="display text-3xl font-bold mb-12 text-center">
          Built for how partner revenue actually flows
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <UseCase title="Track partner-sourced pipeline for your SaaS"
            desc="See every reseller- and referral-sourced deal in one board, with stage and owner clear." />
          <UseCase title="Centralize referrals from agencies & resellers"
            desc="One referral log, attached to the deal it became. No more lost intro credit." />
          <UseCase title="Standardize commissions across GTM partners"
            desc="One rate per partner, auto-applied on Won. Fair, auditable, exportable." />
        </div>
      </section>

      {/* PROOF BAND */}
      <section className="max-w-content mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Stat value="0" label="implementation fees or long contracts" />
          <Stat value="Multi-tenant" label="by design, built for modern SaaS teams" />
          <Stat value="100%" label="of partner deals visible in one board" />
        </div>
        <p className="text-center text-sm text-muted mt-8">
          b2bpipeline is designed so every partner deal has a home you can see.
        </p>
      </section>

      {/* ORIGIN STORY */}
      <section className="bg-ink text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="eyebrow mb-4" style={{ color: "#93c5fd" }}>
            Forged in the AI War Room
          </p>
          <h2 className="display text-4xl font-bold mb-6">
            From a 5-agent brainstorm to a focused partner pipeline.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            b2bpipeline started in a five-agent AI &ldquo;war room&rdquo; exploring one
            question: why is partner revenue still trapped in spreadsheets and
            inboxes? We unleashed a specialized team of agents to architect, code,
            and refine the core engine at once, condensing months of enterprise
            bloat into weeks of pure utility. The answer became this product: a
            focused B2B partner pipeline that small teams can actually adopt.
          </p>
        </div>
      </section>

      {/* STACK GRID */}
      <section className="max-w-content mx-auto px-6 py-20">
        <h2 className="display text-3xl font-bold mb-4 text-center">
          Plays well with your stack.
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto text-center mb-10">
          Built on Next.js, Supabase, Stripe, and n8n, with CSV exports today and
          HubSpot integration on the roadmap.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {["Supabase", "Stripe", "n8n", "CSV", "HubSpot (planned)"].map((t) => (
            <span key={t}
              className="px-4 py-2 rounded-full border border-line text-sm font-medium text-muted">
              {t}
            </span>
          ))}
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

      {/* PRICING */}
      <section id="pricing" className="max-w-content mx-auto px-6 py-20">
        <h2 className="display text-3xl font-bold mb-10 text-center">
          Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <PriceCard name="Free" price="$0" desc="3 partners · 10 deals · 1 user" />
          <PriceCard name="Starter" price="$49/mo" desc="25 partners · unlimited deals · email alerts" feat />
          <PriceCard name="Growth" price="$199/mo" desc="unlimited partners · Slack + CSV import · multi-user" />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-brand-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="display text-4xl font-bold mb-4">
            Ready to see every partner deal in one pipeline?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start free in minutes, upgrade only when your partners demand it.
          </p>
          <Link href="/signup"
            className="btn-gradient px-6 py-3">
            Create your free workspace
          </Link>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-400 py-8">
        © {new Date().getFullYear()} b2bpipeline.com
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-xs uppercase tracking-wide text-gray-500 mt-2">{label}</p>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-brand-600 mb-3">{n}</p>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function UseCase({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-slate-200 pb-4">
      <h3 className="font-semibold mb-1">{q}</h3>
      <p className="text-sm text-gray-600">{a}</p>
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
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
