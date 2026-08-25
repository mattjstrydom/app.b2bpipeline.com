"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import KanbanBoard from "./KanbanBoard";
import PartnerList from "./PartnerList";
import ReferralList from "./ReferralList";
import PayoutExport from "./PayoutExport";

export type Partner = {
  id: string;
  name: string;
  company: string | null;
  type: string;
  commission_rate: number;
  status: string;
};
export type Deal = {
  id: string;
  name: string;
  stage: string;
  amount: number;
  partner_id: string | null;
  referral_id: string | null;
  close_date: string | null;
};
export type Referral = {
  id: string;
  referred_company: string;
  referred_contact: string | null;
  status: string;
  partner_id: string | null;
};
export type Commission = {
  id: string;
  deal_id: string;
  partner_id: string | null;
  amount: number;
  rate: number;
  status: string;
};

export default function DashboardClient({
  userEmail,
  initialPartners,
  initialDeals,
  initialReferrals,
  initialCommissions,
}: {
  userEmail: string;
  initialPartners: Partner[];
  initialDeals: Deal[];
  initialReferrals: Referral[];
  initialCommissions: Commission[];
}) {
  const [tab, setTab] = useState<"pipeline" | "partners" | "referrals" | "payouts">("pipeline");
  const [partners, setPartners] = useState(initialPartners);
  const [deals, setDeals] = useState(initialDeals);
  const [referrals, setReferrals] = useState(initialReferrals);
  const [commissions, setCommissions] = useState(initialCommissions);
  const supabase = createClient();

  // pipeline value by stage
  const pipelineValue = deals
    .filter((d) => d.stage !== "lost")
    .reduce((sum, d) => sum + (d.amount ?? 0), 0);
  const wonValue = deals
    .filter((d) => d.stage === "won")
    .reduce((sum, d) => sum + (d.amount ?? 0), 0);
  const commissionsOwed = commissions
    .filter((c) => c.status !== "paid")
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);

  async function refresh() {
    const [{ data: p }, { data: d }, { data: r }, { data: c }] = await Promise.all([
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase.from("deals").select("*").order("created_at", { ascending: false }),
      supabase.from("referrals").select("*").order("created_at", { ascending: false }),
      supabase.from("commissions").select("*"),
    ]);
    if (p) setPartners(p as Partner[]);
    if (d) setDeals(d as Deal[]);
    if (r) setReferrals(r as Referral[]);
    if (c) setCommissions(c as Commission[]);
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-line px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <span className="font-bold text-lg tracking-tight">b2bpipeline</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted hidden sm:inline">{userEmail}</span>
          <button className="btn-primary text-sm px-4 py-2">Invite partner</button>
        </div>
      </header>

      <div className="max-w-content mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Stat label="Open pipeline" value={`$${pipelineValue.toLocaleString()}`} />
          <Stat label="Won" value={`$${wonValue.toLocaleString()}`} />
          <Stat label="Commissions owed" value={`$${commissionsOwed.toLocaleString()}`} />
        </div>

        <nav className="flex gap-2 mb-6 border-b border-line">
          {(["pipeline", "partners", "referrals", "payouts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                tab === t ? "border-b-2 border-brand-600 text-brand-700" : "text-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === "pipeline" && (
          <KanbanBoard deals={deals} partners={partners} onDealsChange={setDeals} onCommission={refresh} />
        )}
        {tab === "partners" && <PartnerList partners={partners} onPartnersChange={setPartners} />}
        {tab === "referrals" && (
          <ReferralList referrals={referrals} partners={partners} onReferralsChange={setReferrals} />
        )}
        {tab === "payouts" && (
          <PayoutExport commissions={commissions} partners={partners} deals={deals} />
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
