/**
 * Commission engine rules.
 * When a deal is marked 'won', create/update a commission row:
 *   amount = deal.amount * partner.commission_rate
 * Status starts 'pending'. Approved -> paid via payout export.
 */

export const DEAL_STAGES = [
  "registered",
  "qualifying",
  "negotiation",
  "won",
  "lost",
] as const;

export const PIPELINE_STAGES = [
  "registered",
  "qualifying",
  "negotiation",
  "won",
] as const; // lost excluded from board

export type DealStage = (typeof DEAL_STAGES)[number];

export const STAGE_LABELS: Record<string, string> = {
  registered: "Registered",
  qualifying: "Qualifying",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export function computeCommission(dealAmount: number, rate: number): number {
  return Math.round(dealAmount * rate * 100) / 100;
}
