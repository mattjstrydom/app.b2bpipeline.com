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

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th>Company</th>
              <th>Type</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-b border-gray-100">
                <td className="py-2 font-medium">{p.name}</td>
                <td>{p.company ?? "—"}</td>
                <td className="capitalize">{p.type}</td>
                <td>{(p.commission_rate * 100).toFixed(0)}%</td>
                <td className="capitalize">{p.status}</td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
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
