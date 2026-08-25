import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* NAV */}
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight">b2bpipeline</span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#how" className="hover:text-gray-900">How it works</a>
          <a href="#faq" className="hover:text-gray-900">FAQ</a>
          <a href="#pricing" className="hover:text-gray-900">Pricing</a>
        </nav>
        <Link href="/login" className="btn-primary text-sm px-4 py-2">
          Start free
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-4">
            PRM-lite for real partner teams
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            The B2B pipeline<br />for your partners.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Track partner deals, referrals, and commissions in one shared pipeline —
            without a $30k/yr enterprise PRM.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary text-lg px-6 py-3">
              Create your free workspace
            </Link>
            <a href="#how" className="btn-secondary text-lg px-6 py-3">
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat value="0" label="spreadsheets to reconcile partner deals" />
          <Stat value="< 10 min" label="to set up your first partner pipeline" />
          <Stat value="3" label="simple plans: Free · Starter · Growth" />
          <Stat value="1" label="place to see every partner deal & referral" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Built on tools you already trust
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-500 grayscale opacity-80">
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
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Why b2bpipeline
        </p>
        <h2 className="text-4xl font-bold tracking-tight mb-6">
          A partner pipeline<br />without the enterprise bloat.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Enterprise PRMs were built for thousands of partners and $30k contracts.
          b2bpipeline gives small GTM teams the essentials — Kanban pipeline,
          partner directory, referral tracking, and automatic commissions — at a
          price you can start today.
        </p>
        <Link href="#pricing" className="text-brand-600 font-semibold">
          See pricing →
        </Link>
      </section>

      {/* FEATURE CARDS */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            title="Kanban partner pipeline"
            desc="One glance from Registered to Won/Lost — no more hidden deals in inboxes."
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
      <section id="how" className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Step n="01" title="Set up your pipeline"
              desc="Create your stages — Registered, Qualifying, Negotiation, Won/Lost — and invite your team." />
            <Step n="02" title="Add partners and deals"
              desc="Add partners to the directory, capture referrals, and move deals across the Kanban board." />
            <Step n="03" title="Win deals, pay fairly"
              desc="When deals close, b2bpipeline calculates commissions and prepares payouts you can trust." />
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Built for how partner revenue actually flows
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <UseCase title="Track partner-sourced pipeline for your SaaS"
            desc="See every reseller- and referral-sourced deal in one board, with stage and owner clear." />
          <UseCase title="Centralize referrals from agencies & resellers"
            desc="One referral log, attached to the deal it became — no more lost intro credit." />
          <UseCase title="Standardize commissions across GTM partners"
            desc="One rate per partner, auto-applied on Won. Fair, auditable, exportable." />
        </div>
      </section>

      {/* PROOF BAND */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Stat value="0" label="implementation fees or long contracts" />
          <Stat value="Multi-tenant" label="by design — built for modern SaaS teams" />
          <Stat value="100%" label="of partner deals visible in one board" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          b2bpipeline is designed so every partner deal has a home you can see.
        </p>
      </section>

      {/* ORIGIN STORY */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100 mb-4">
            Forged in the AI War Room
          </p>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            From a 5-agent brainstorm to a focused partner pipeline.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            b2bpipeline started in a five-agent AI &ldquo;war room&rdquo; exploring one
            question: why is partner revenue still trapped in spreadsheets and
            inboxes? We unleashed a specialized team of agents to architect, code,
            and refine the core engine at once — condensing months of enterprise
            bloat into weeks of pure utility. The answer became this product: a
            focused B2B partner pipeline that small teams can actually adopt.
          </p>
        </div>
      </section>

      {/* STACK GRID */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
          Plays well with your stack.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-10">
          Built on Next.js, Supabase, Stripe, and n8n — with CSV exports today and
          HubSpot integration on the roadmap.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {["Supabase", "Stripe", "n8n", "CSV", "HubSpot (planned)"].map((t) => (
            <span key={t}
              className="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-gray-600">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            <Faq q="Can't I just track partner deals in my CRM like HubSpot?"
              a="You can bolt it on if you're already on HubSpot Enterprise with ops bandwidth — but commission math, payout exports, and partner portals are separate paid add-ons there. Most SMBs tracking partners in a spreadsheet do it because HubSpot's partner features are either absent or enterprise-priced. We're the purpose-built $49/mo alternative, live in a day, no admin." />
            <Faq q="How is b2bpipeline different from a full PRM?"
              a="PRM-lite: essentials only, no $30k contracts, focused on pipeline + commissions for small teams." />
            <Faq q="Who is b2bpipeline for?"
              a="Small B2B teams with a growing set of partners, agencies, or resellers — anyone still reconciling partner deals in a spreadsheet." />
            <Faq q="What happens when a deal is marked Won?"
              a="Commissions are calculated from your per-partner rules and made available in the payout CSV export. No manual math." />
            <Faq q="What integrations do you support?"
              a="Runs on Supabase, Stripe, and n8n. CSV exports today; HubSpot and other CRM sync are on the roadmap." />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
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
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to see every partner deal in one pipeline?
          </h2>
          <p className="text-lg text-brand-100 mb-8">
            Start free in minutes, upgrade only when your partners demand it.
          </p>
          <Link href="/signup"
            className="inline-block bg-white text-brand-700 font-semibold px-6 py-3 rounded-md hover:bg-brand-50 transition">
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
