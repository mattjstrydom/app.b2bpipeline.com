import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <nav className="flex items-center justify-between mb-16">
        <span className="font-bold text-lg">b2bpipeline</span>
        <Link href="/login" className="btn-secondary text-sm">
          Sign in
        </Link>
      </nav>

      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          The B2B pipeline for your partners.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Track partner deals, referrals, and commissions in one place — without
          the $30k enterprise PRM. Built for B2B teams running real channel
          programs.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/signup" className="btn-primary text-lg px-6 py-3">
            Start free
          </Link>
          <a href="#pricing" className="btn-secondary text-lg px-6 py-3">
            See pricing
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          ["Pipeline board", "Register partner deals on a simple Kanban — from registered to won."],
          ["Auto commissions", "Commissions are calculated the moment a deal closes. No spreadsheets."],
          ["Payout export", "One click, a clean CSV per partner per period, ready for payment."],
        ].map(([t, d]) => (
          <div key={t} className="card">
            <h3 className="font-semibold mb-2">{t}</h3>
            <p className="text-sm text-gray-600">{d}</p>
          </div>
        ))}
      </section>

      <section id="pricing" className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Free", "$0", "3 partners · 10 deals · 1 user"],
            ["Starter", "$49/mo", "25 partners · unlimited deals · email alerts"],
            ["Growth", "$199/mo", "unlimited partners · Slack + CSV import · multi-user"],
          ].map(([name, price, desc]) => (
            <div key={name} className="card text-center">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-3xl font-bold my-2">{price}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} b2bpipeline.com
      </footer>
    </main>
  );
}
