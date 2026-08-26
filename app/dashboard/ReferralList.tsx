"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Referral, Partner } from "./DashboardClient";

const STATUSES = ["new", "contacted", "qualified", "closed", "lost"];

export default function ReferralList({
  referrals,
  partners,
  onReferralsChange,
}: {
  referrals: Referral[];
  partners: Partner[];
  onReferralsChange: (r: Referral[]) => void;
}) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const supabase = createClient();

  async function add() {
    if (!company) return;
    const { data, error } = await supabase
      .from("referrals")
      .insert({
        referred_company: company,
        referred_contact: contact || null,
        partner_id: partnerId || null,
        status: "new",
      })
      .select()
      .single();
    if (!error && data) {
      onReferralsChange([data as Referral, ...referrals]);
      setCompany("");
      setContact("");
    }
  }

  async function setStatus(r: Referral, status: string) {
    const { error } = await supabase.from("referrals").update({ status }).eq("id", r.id);
    if (!error) onReferralsChange(referrals.map((x) => (x.id === r.id ? { ...x, status } : x)));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-end mb-4">
        <input className="input w-48" placeholder="Referred company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input className="input w-48" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        <select className="input w-48" value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
          <option value="">No partner</option>
          {partners.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button className="btn-primary text-sm" onClick={add}>
          + Add referral
        </button>
      </div>

      <div className="overflow-x-auto card p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-line">
              <th className="py-2 px-4 font-semibold">Company</th>
              <th className="px-4 font-semibold">Contact</th>
              <th className="px-4 font-semibold">Partner</th>
              <th className="px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r) => (
              <tr key={r.id} className="border-b border-line hover:bg-surface transition">
                <td className="py-2 px-4 font-medium text-ink">{r.referred_company}</td>
                <td className="px-4 text-muted">{r.referred_contact ?? "—"}</td>
                <td className="px-4 text-muted">
                  {partners.find((p) => p.id === r.partner_id)?.name ?? "—"}
                </td>
                <td className="px-4">
                  <select
                    className="input w-auto py-1 text-xs"
                    value={r.status}
                    onChange={(e) => setStatus(r, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {referrals.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted">
                  No referrals logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
