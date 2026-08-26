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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          return (
            <div key={stage} className="bg-surface rounded-md border border-line p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-ink">{STAGE_LABELS[stage]}</h3>
                <span className="text-xs text-muted bg-white border border-line rounded-full px-2 py-0.5">
                  {stageDeals.length}
                </span>
              </div>
              <div className="space-y-2">
                {stageDeals.length === 0 && (
                  <p className="text-xs text-muted italic py-2">No deals in this stage yet.</p>
                )}
                {stageDeals.map((d) => {
                  const partner = partners.find((p) => p.id === d.partner_id);
                  return (
                    <div key={d.id} className="border border-line bg-white rounded-md p-2.5 text-sm shadow-soft hover:-translate-y-px hover:shadow-card transition">
                      <p className="font-medium text-ink">{d.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted">{partner?.name ?? "No partner"}</p>
                        <p className="mono font-semibold text-ink">${d.amount?.toLocaleString()}</p>
                      </div>
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
                            className="text-xs text-pos hover:underline font-semibold"
                            onClick={() => moveDeal(d, "won")}
                          >
                            ✓ Won
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
