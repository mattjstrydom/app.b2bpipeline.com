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

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Company</th>
              <th>Contact</th>
              <th>Partner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r) => (
              <tr key={r.id} className="border-b border-gray-100">
                <td className="py-2 font-medium">{r.referred_company}</td>
                <td>{r.referred_contact ?? "—"}</td>
                <td>
                  {partners.find((p) => p.id === r.partner_id)?.name ?? "—"}
                </td>
                <td>
                  <select
                    className="border rounded px-2 py-1 text-xs"
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
                <td colSpan={4} className="py-6 text-center text-gray-400">
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
