"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { PIPELINE_STAGES, STAGE_LABELS, computeCommission } from "@/lib/commission";
import type { Deal, Partner } from "./DashboardClient";

export default function KanbanBoard({
  deals,
  partners,
  onDealsChange,
  onCommission,
}: {
  deals: Deal[];
  partners: Partner[];
  onDealsChange: (d: Deal[]) => void;
  onCommission: () => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [partnerId, setPartnerId] = useState<string>("");
  const [adding, setAdding] = useState(false);
  const supabase = createClient();

  async function addDeal() {
    if (!name) return;
    const { data, error } = await supabase
      .from("deals")
      .insert({
        name,
        amount: parseFloat(amount || "0"),
        partner_id: partnerId || null,
        stage: "registered",
      })
      .select()
      .single();
    if (!error && data) {
      onDealsChange([data as Deal, ...deals]);
      setName("");
      setAmount("");
      setPartnerId("");
      setAdding(false);
    }
  }

  async function moveDeal(deal: Deal, stage: string) {
    const { error } = await supabase.from("deals").update({ stage }).eq("id", deal.id);
    if (error) return;
    const updated = { ...deal, stage };
    onDealsChange(deals.map((d) => (d.id === deal.id ? updated : d)));

    // auto-commission when moved to 'won'
    if (stage === "won" && deal.partner_id) {
      const partner = partners.find((p) => p.id === deal.partner_id);
      if (partner) {
        const amount = computeCommission(deal.amount, partner.commission_rate);
        const { error: cErr } = await supabase
          .from("commissions")
          .insert({
            deal_id: deal.id,
            partner_id: partner.id,
            rate: partner.commission_rate,
            amount,
            status: "pending",
          });
        if (!cErr) onCommission();
      }
    }
  }

  return (
    <div>
      <div className="mb-4">
        {!adding ? (
          <button className="btn-primary text-sm" onClick={() => setAdding(true)}>
            + New deal
          </button>
        ) : (
          <div className="flex flex-wrap gap-2 items-end">
            <input className="input w-48" placeholder="Deal name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="input w-32" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <select className="input w-48" value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
              <option value="">No partner</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <button className="btn-primary text-sm" onClick={addDeal}>
              Add
            </button>
            <button className="btn-secondary text-sm" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {PIPELINE_STAGES.map((stage) => (
          <div key={stage} className="bg-white rounded-lg border border-gray-200 p-3">
            <h3 className="font-semibold text-sm mb-3 text-gray-700">
              {STAGE_LABELS[stage]} ({deals.filter((d) => d.stage === stage).length})
            </h3>
            <div className="space-y-2">
              {deals
                .filter((d) => d.stage === stage)
                .map((d) => (
                  <div key={d.id} className="border border-gray-200 rounded p-2 text-sm">
                    <p className="font-medium">{d.name}</p>
                    <p className="text-gray-500">${d.amount?.toLocaleString()}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {PIPELINE_STAGES.filter((s) => s !== stage).map((s) => (
                        <button
                          key={s}
                          className="text-xs text-brand-600 hover:underline"
                          onClick={() => moveDeal(d, s)}
                        >
                          → {STAGE_LABELS[s]}
                        </button>
                      ))}
                      {stage !== "won" && (
                        <button
                          className="text-xs text-green-600 hover:underline"
                          onClick={() => moveDeal(d, "won")}
                        >
                          ✓ Won
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
