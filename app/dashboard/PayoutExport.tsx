"use client";

import type { Commission, Partner, Deal } from "./DashboardClient";

export default function PayoutExport({
  commissions,
  partners,
  deals,
}: {
  commissions: Commission[];
  partners: Partner[];
  deals: Deal[];
}) {
  const pending = commissions.filter((c) => c.status !== "paid");

  function buildCsv() {
    const rows = [["partner", "partner_company", "deal", "rate", "amount", "status"]];
    for (const c of pending) {
      const partner = partners.find((p) => p.id === c.partner_id);
      const deal = deals.find((d) => d.id === c.deal_id);
      rows.push([
        partner?.name ?? "unknown",
        partner?.company ?? "",
        deal?.name ?? "unknown",
        `${(c.rate * 100).toFixed(0)}%`,
        c.amount.toFixed(2),
        c.status,
      ]);
    }
    const csv = rows.map((r) => r.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payouts-${new Date().toISOString().slice(0, 7)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const total = pending.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Payout export</h3>
      <p className="text-sm text-gray-600 mb-4">
        {pending.length} commission entries pending · total{" "}
        <span className="font-semibold">${total.toLocaleString()}</span>
      </p>
      <button className="btn-primary text-sm" onClick={buildCsv} disabled={pending.length === 0}>
        Download CSV
      </button>
      <p className="text-xs text-gray-400 mt-3">
        CSV aggregates all non-paid commissions by partner. Import into your
        payout tool or Stripe. (Automated payouts via Stripe Connect are a v1.1
        item.)
      </p>
    </div>
  );
}
