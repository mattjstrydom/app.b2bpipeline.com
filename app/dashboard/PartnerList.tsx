"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Partner } from "./DashboardClient";

export default function PartnerList({
  partners,
  onPartnersChange,
}: {
  partners: Partner[];
  onPartnersChange: (p: Partner[]) => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("referral");
  const [rate, setRate] = useState("0.10");
  const supabase = createClient();

  async function add() {
    if (!name) return;
    const { data, error } = await supabase
      .from("partners")
      .insert({
        name,
        company: company || null,
        type,
        commission_rate: parseFloat(rate),
      })
      .select()
      .single();
    if (!error && data) {
      onPartnersChange([data as Partner, ...partners]);
      setName("");
      setCompany("");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-end mb-4">
        <input className="input w-48" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input w-48" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <select className="input w-40" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="referral">Referral</option>
          <option value="reseller">Reseller</option>
          <option value="affiliate">Affiliate</option>
        </select>
        <input className="input w-32" placeholder="Rate (0.10)" value={rate} onChange={(e) => setRate(e.target.value)} />
        <button className="btn-primary text-sm" onClick={add}>
          + Add partner
        </button>
      </div>

      <div className="overflow-x-auto card p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-line">
              <th className="py-2 px-4 font-semibold">Name</th>
              <th className="px-4 font-semibold">Company</th>
              <th className="px-4 font-semibold">Type</th>
              <th className="px-4 font-semibold">Rate</th>
              <th className="px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-b border-line hover:bg-surface transition">
                <td className="py-2 px-4 font-medium text-ink">{p.name}</td>
                <td className="px-4 text-muted">{p.company ?? "—"}</td>
                <td className="px-4 capitalize text-muted">{p.type}</td>
                <td className="px-4 mono">{(p.commission_rate * 100).toFixed(0)}%</td>
                <td className="px-4 capitalize text-muted">{p.status}</td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted">
                  No partners yet. Add your first above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
