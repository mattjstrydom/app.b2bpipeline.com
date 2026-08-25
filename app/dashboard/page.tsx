import { redirect } from "next/navigation";
import { createServerClientForSSR } from "@/lib/supabaseServer";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServerClientForSSR();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // org_id for current user via the secure function
  const { data: orgRow } = await supabase
    .from("users")
    .select("org_id, role")
    .eq("id", user.id)
    .single();

  const orgId = orgRow?.org_id;

  const [{ data: partners }, { data: deals }, { data: referrals }, { data: commissions }] =
    await Promise.all([
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase.from("deals").select("*").order("created_at", { ascending: false }),
      supabase.from("referrals").select("*").order("created_at", { ascending: false }),
      supabase.from("commissions").select("*"),
    ]);

  return (
    <DashboardClient
      userEmail={user.email ?? ""}
      initialPartners={partners ?? []}
      initialDeals={deals ?? []}
      initialReferrals={referrals ?? []}
      initialCommissions={commissions ?? []}
    />
  );
}
